"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, BookOpen, CalendarCheck, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import { diagnosticIntro } from "@/content/copy";
import { gradeQuestion, type Grade } from "@/content/diagnostic";
import { caseById } from "@/content/cases";
import { neutralResult, results } from "@/content/results";
import { site } from "@/content/site";
import type { CaseId } from "@/content/types";
import { optionsOf, score, visibleQuestions, type Answers } from "@/lib/scoring";
import { useApp } from "./AppContext";

type Phase = "intro" | "ask" | "result";

export function Diagnostic() {
  const { audience, openBooking, setDiagnostic } = useApp();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [grade, setGrade] = useState<Grade | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [idx, setIdx] = useState(0); // 0 = câu chọn lớp
  const [dir, setDir] = useState(1);
  const headRef = useRef<HTMLHeadingElement>(null);

  const qs = visibleQuestions(grade);
  const total = qs.length + 1;

  const go = (n: number) => {
    setDir(n > idx ? 1 : -1);
    setIdx(n);
    requestAnimationFrame(() => headRef.current?.focus());
  };

  const finish = (g: Grade, a: Answers) => {
    const r = score(g, a);
    setDiagnostic({ role: audience, grade: g, cases: r.top, fromDiagnostic: true });
    setPhase("result");
    requestAnimationFrame(() => headRef.current?.focus());
  };

  const restart = () => {
    setPhase("intro"); setGrade(null); setAnswers({}); setIdx(0); setDiagnostic(null);
  };

  const pickGrade = (g: Grade) => {
    setGrade(g);
    // chọn xong lớp thì sang câu kế (số câu có thể đổi theo lớp)
    setTimeout(() => go(1), reduce ? 0 : 180);
  };

  const pick = (qid: string, level: number) => {
    const next = { ...answers, [qid]: level };
    setAnswers(next);
    setTimeout(() => {
      if (idx >= qs.length) finish(grade!, next);
      else go(idx + 1);
    }, reduce ? 0 : 220);
  };

  const slide = {
    initial: { opacity: 0, x: reduce ? 0 : 40 * dir },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: reduce ? 0 : -40 * dir },
  };

  return (
    <section id="tu-kiem-tra" className="section">
      <div className="container-x">
        <p className="eyebrow">Công cụ tự kiểm tra</p>
        <h2 className="h2 mt-2">{diagnosticIntro.title}</h2>
        <div className="card mx-auto mt-8 max-w-3xl p-5 md:p-9" aria-live="polite">
          {phase === "intro" && (
            <div>
              <p className="lead">{diagnosticIntro.sub[audience]}</p>
              <p className="mt-3 text-sm text-muted">{diagnosticIntro.privacy}</p>
              <button className="btn btn-primary mt-6 w-full sm:w-auto" onClick={() => { setPhase("ask"); setIdx(0); }}>
                Bắt đầu <ArrowRight size={18} aria-hidden />
              </button>
            </div>
          )}

          {phase === "ask" && (
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface2" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={idx + 1} aria-label="Tiến độ">
                  <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${((idx + 1) / total) * 100}%` }} />
                </div>
                <span className="text-sm text-muted">Câu {idx + 1}/{total}</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={idx} {...slide} transition={{ duration: reduce ? 0 : 0.25 }}>
                  {idx === 0 ? (
                    <>
                      <h3 ref={headRef} tabIndex={-1} className="text-2xl font-semibold outline-none">{gradeQuestion.text[audience]}</h3>
                      <div className="mt-5 grid gap-3">
                        {gradeQuestion.options.map((o) => (
                          <button key={o.value} onClick={() => pickGrade(o.value)} aria-pressed={grade === o.value}
                            className={`min-h-14 rounded-2xl border-2 px-5 py-3 text-left font-medium transition-colors ${grade === o.value ? "border-accent bg-surface2" : "border-line hover:border-ink"}`}>
                            {o.label}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    (() => {
                      const q = qs[idx - 1];
                      return (
                        <>
                          <h3 ref={headRef} tabIndex={-1} className="text-xl font-semibold leading-snug outline-none sm:text-2xl">{q.text[audience]}</h3>
                          <div className="mt-5 grid gap-3">
                            {optionsOf(q).map((label, lvl) => (
                              <button key={label} onClick={() => pick(q.id, lvl)} aria-pressed={answers[q.id] === lvl}
                                className={`min-h-14 rounded-2xl border-2 px-5 py-3 text-left font-medium transition-colors ${answers[q.id] === lvl ? "border-accent bg-surface2" : "border-line hover:border-ink"}`}>
                                {label}
                              </button>
                            ))}
                          </div>
                        </>
                      );
                    })()
                  )}
                </motion.div>
              </AnimatePresence>
              {idx > 0 && (
                <button className="mt-6 inline-flex min-h-11 items-center gap-2 text-muted underline underline-offset-4" onClick={() => go(idx - 1)}>
                  <ArrowLeft size={16} aria-hidden /> Quay lại
                </button>
              )}
            </div>
          )}

          {phase === "result" && grade && (
            <Result
              grade={grade}
              answers={answers}
              audience={audience}
              headRef={headRef}
              onBook={() => openBooking()}
              onRestart={restart}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function Result({ grade, answers, audience, headRef, onBook, onRestart }: {
  grade: Grade; answers: Answers; audience: "parent" | "student";
  headRef: React.RefObject<HTMLHeadingElement | null>; onBook: () => void; onRestart: () => void;
}) {
  const { top } = score(grade, answers);
  const neutral = top.length === 0;
  const shown: CaseId[] = neutral ? neutralResult.cases : top;
  const main = shown[0];
  const r = results[main];
  return (
    <div>
      <p className="eyebrow">Kết quả</p>
      <h3 ref={headRef} tabIndex={-1} className="mt-1 text-2xl font-semibold outline-none sm:text-3xl">
        {neutral ? neutralResult.title : top.map((c) => caseById[c].title).join(" + ")}
      </h3>
      {neutral ? (
        <p className="mt-3">{neutralResult.why[audience]}</p>
      ) : (
        top.map((c) => <p key={c} className="mt-3">{results[c].why[audience]}</p>)
      )}
      <p className="mt-4 text-sm text-muted">
        Đây là gợi ý từ vài câu hỏi, không phải chẩn đoán. Buổi chẩn đoán trực tiếp mới cho bức tranh đầy đủ.
      </p>

      <h4 className="mt-8 font-display text-xl font-semibold">3 việc làm được ngay trong tuần này, tại nhà, miễn phí</h4>
      <ol className="mt-4 space-y-4">
        {r.actions.map((a, i) => (
          <li key={a.title} className="rounded-2xl border border-line bg-surface2 p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy font-bold text-white">{i + 1}</span>
              <div>
                <p className="font-semibold">{a.title}</p>
                <p className="text-sm text-muted">{a.time}</p>
              </div>
            </div>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              {a.steps[audience].map((s) => <li key={s}>{s}</li>)}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button className="btn btn-primary" onClick={onBook}><CalendarCheck size={18} aria-hidden /> Đặt lịch chẩn đoán miễn phí</button>
        <a className="btn btn-ghost" href={site.docsUrl} target="_blank" rel="noopener noreferrer"><BookOpen size={18} aria-hidden /> {r.docsLabel}</a>
      </div>
      <button className="mt-5 inline-flex min-h-11 items-center gap-2 text-muted underline underline-offset-4" onClick={onRestart}>
        <RotateCcw size={16} aria-hidden /> Làm lại
      </button>
    </div>
  );
}
