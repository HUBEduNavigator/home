"use client";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeft, ArrowRight, BookOpen, CalendarCheck, Check, Lock, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import { diagnosticIntro } from "@/content/copy";
import { gradeQuestion, type Grade } from "@/content/diagnostic";
import { caseById } from "@/content/cases";
import { neutralResult, results } from "@/content/results";
import { site } from "@/content/site";
import type { Audience, CaseId } from "@/content/types";
import { optionsOf, score, visibleQuestions, type Answers } from "@/lib/scoring";
import { useApp } from "./AppContext";
import { EASE, SectionHead } from "./motion";

type Phase = "intro" | "ask" | "result";
const PICK_DELAY = 260; // để người dùng kịp thấy lựa chọn được đánh dấu

export function Diagnostic() {
  const { audience, openBooking, setDiagnostic } = useApp();
  const [phase, setPhase] = useState<Phase>("intro");
  const [grade, setGrade] = useState<Grade | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [idx, setIdx] = useState(0); // 0 = câu chọn lớp
  const [dir, setDir] = useState(1);
  const busy = useRef(false); // chặn bấm hai lần liên tiếp
  const headRef = useRef<HTMLHeadingElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const qs = visibleQuestions(grade);
  const total = qs.length + 1;

  const go = (n: number) => { setDir(n > idx ? 1 : -1); setIdx(n); };

  const later = (fn: () => void) => {
    if (busy.current) return;
    busy.current = true;
    window.setTimeout(() => { fn(); busy.current = false; }, PICK_DELAY);
  };

  const finish = (g: Grade, a: Answers) => {
    const r = score(g, a);
    setDiagnostic({ role: audience, grade: g, cases: r.top, fromDiagnostic: true });
    setPhase("result");
    boxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const restart = () => {
    setPhase("intro"); setGrade(null); setAnswers({}); setIdx(0); setDir(-1); setDiagnostic(null);
  };

  const pickGrade = (g: Grade) => {
    if (busy.current) return;
    setGrade(g);
    later(() => go(1));
  };

  const pick = (qid: string, level: number) => {
    if (busy.current) return;
    const next = { ...answers, [qid]: level };
    setAnswers(next);
    later(() => (idx >= qs.length ? finish(grade!, next) : go(idx + 1)));
  };

  const choice = (on: boolean) =>
    `group flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border-2 px-5 py-3 text-left font-medium transition-[border-color,background-color,transform] duration-200 active:scale-[.99] ${
      on ? "border-accent bg-accent/15" : "border-line hover:border-ink/60 hover:bg-surface2"
    }`;
  const tick = (on: boolean) => (
    <span aria-hidden className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${on ? "border-accent bg-accent text-accentink" : "border-line"}`}>
      {on && <Check size={14} strokeWidth={3} />}
    </span>
  );

  const q = idx > 0 ? qs[idx - 1] : null;

  return (
    <section id="tu-kiem-tra" className="section">
      <div className="container-x">
        <SectionHead eyebrow="Công cụ tự kiểm tra" title={diagnosticIntro.title} />
        <div ref={boxRef} className="card mx-auto mt-8 max-w-3xl scroll-mt-24 overflow-hidden p-5 md:p-9">
          <AnimatePresence mode="wait" initial={false}>
            {phase === "intro" && (
              <m.div key="intro" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: EASE }}>
                <p className="text-lg">{diagnosticIntro.sub[audience]}</p>
                <p className="mt-3 flex items-center gap-2 text-sm text-muted"><Lock size={14} aria-hidden /> {diagnosticIntro.privacy}</p>
                <button className="btn btn-primary group mt-6 w-full sm:w-auto" onClick={() => { setPhase("ask"); setIdx(0); setDir(1); }}>
                  Bắt đầu <ArrowRight size={18} aria-hidden className="transition-transform group-hover:translate-x-1" />
                </button>
              </m.div>
            )}

            {phase === "ask" && (
              <m.div key="ask" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface2" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={idx + 1} aria-label="Tiến độ">
                    <m.div className="h-full origin-left rounded-full bg-accent" initial={false} animate={{ scaleX: (idx + 1) / total }} transition={{ type: "spring", stiffness: 120, damping: 22 }} />
                  </div>
                  <span className="w-20 text-right text-sm tabular-nums text-muted" aria-live="polite">Câu {idx + 1}/{total}</span>
                </div>
                <div className="relative">
                  <AnimatePresence mode="wait" initial={false} custom={dir}>
                    <m.fieldset
                      key={idx}
                      custom={dir}
                      variants={{
                        enter: (d: number) => ({ opacity: 0, x: 36 * d }),
                        center: { opacity: 1, x: 0 },
                        exit: (d: number) => ({ opacity: 0, x: -36 * d }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: EASE }}
                      onAnimationComplete={(def) => def === "center" && headRef.current?.focus({ preventScroll: true })}
                    >
                      <legend className="sr-only">Câu {idx + 1}</legend>
                      <h3 ref={headRef} tabIndex={-1} className="text-balance text-xl font-semibold leading-snug outline-none sm:text-2xl">
                        {q ? q.text[audience] : gradeQuestion.text[audience]}
                      </h3>
                      <div className="mt-5 grid gap-3">
                        {q
                          ? optionsOf(q).map((label, lvl) => {
                              const on = answers[q.id] === lvl;
                              return <button key={label} onClick={() => pick(q.id, lvl)} aria-pressed={on} className={choice(on)}>{label}{tick(on)}</button>;
                            })
                          : gradeQuestion.options.map((o) => {
                              const on = grade === o.value;
                              return <button key={o.value} onClick={() => pickGrade(o.value)} aria-pressed={on} className={choice(on)}>{o.label}{tick(on)}</button>;
                            })}
                      </div>
                    </m.fieldset>
                  </AnimatePresence>
                </div>
                <div className="mt-6 flex min-h-11 items-center justify-between">
                  {idx > 0 ? (
                    <button className="inline-flex min-h-11 items-center gap-2 text-muted underline-offset-4 hover:underline" onClick={() => !busy.current && go(idx - 1)}>
                      <ArrowLeft size={16} aria-hidden /> Quay lại
                    </button>
                  ) : <span />}
                  {q && answers[q.id] !== undefined && (
                    <button className="inline-flex min-h-11 items-center gap-2 font-semibold text-accenttext" onClick={() => pick(q.id, answers[q.id])}>
                      Giữ câu trả lời <ArrowRight size={16} aria-hidden />
                    </button>
                  )}
                </div>
              </m.div>
            )}

            {phase === "result" && grade && (
              <m.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <Result grade={grade} answers={answers} audience={audience} onBook={() => openBooking()} onRestart={restart} />
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const rise = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

function Result({ grade, answers, audience, onBook, onRestart }: {
  grade: Grade; answers: Answers; audience: Audience; onBook: () => void; onRestart: () => void;
}) {
  const { top } = score(grade, answers);
  const neutral = top.length === 0;
  const shown: CaseId[] = neutral ? neutralResult.cases : top;
  const r = results[shown[0]];
  const headRef = useRef<HTMLHeadingElement>(null);
  return (
    <m.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      onAnimationStart={() => headRef.current?.focus({ preventScroll: true })}>
      <m.p variants={rise} className="eyebrow">Kết quả</m.p>
      <m.h3 variants={rise} ref={headRef} tabIndex={-1} className="mt-1 text-balance text-2xl font-semibold outline-none sm:text-3xl">
        {neutral ? neutralResult.title : top.map((c) => caseById[c].title).join(" + ")}
      </m.h3>
      {neutral
        ? <m.p variants={rise} className="mt-3">{neutralResult.why[audience]}</m.p>
        : top.map((c) => <m.p variants={rise} key={c} className="mt-3">{results[c].why[audience]}</m.p>)}
      <m.p variants={rise} className="mt-4 text-sm text-muted">
        Đây là gợi ý từ vài câu hỏi, không phải chẩn đoán. Buổi chẩn đoán trực tiếp mới cho bức tranh đầy đủ.
      </m.p>

      <m.h4 variants={rise} className="mt-8 font-display text-xl font-semibold">3 việc làm được ngay trong tuần này, tại nhà, miễn phí</m.h4>
      <ol className="mt-4 space-y-4">
        {r.actions.map((a, i) => (
          <m.li variants={rise} key={a.title} className="rounded-2xl border border-line bg-surface2 p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy font-semibold text-white">{i + 1}</span>
              <div>
                <p className="font-semibold">{a.title}</p>
                <p className="text-sm text-muted">{a.time}</p>
              </div>
            </div>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 marker:text-accenttext">
              {a.steps[audience].map((s) => <li key={s}>{s}</li>)}
            </ul>
          </m.li>
        ))}
      </ol>

      <m.div variants={rise} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button className="btn btn-primary" onClick={onBook}><CalendarCheck size={18} aria-hidden /> Đặt lịch chẩn đoán miễn phí</button>
        <a className="btn btn-ghost" href={site.docsUrl} target="_blank" rel="noopener noreferrer"><BookOpen size={18} aria-hidden /> {r.docsLabel}</a>
      </m.div>
      <m.div variants={rise}>
        <button className="mt-5 inline-flex min-h-11 items-center gap-2 text-muted underline-offset-4 hover:underline" onClick={onRestart}>
          <RotateCcw size={16} aria-hidden /> Làm lại
        </button>
      </m.div>
    </m.div>
  );
}
