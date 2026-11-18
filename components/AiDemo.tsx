"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Bot, GraduationCap, RotateCcw, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { aiDemo } from "@/content/ai-demo";

type Mode = "solve" | "guide";

export function AiDemo() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("guide");
  const [shown, setShown] = useState(1);
  const [run, setRun] = useState(0);
  const msgs = aiDemo.modes[mode].messages;

  useEffect(() => {
    if (reduce) { setShown(msgs.length); return; }
    setShown(1);
    const t = setInterval(() => {
      setShown((n) => { if (n >= msgs.length) { clearInterval(t); return n; } return n + 1; });
    }, 1300);
    return () => clearInterval(t);
  }, [mode, run, reduce, msgs.length]);

  return (
    <section id="hoc-cung-ai" className="section bg-navy text-white">
      <div className="container-x">
        <p className="eyebrow !text-accent">Học cùng AI, đúng cách</p>
        <h2 className="h2 mt-2">Ba mẹ lo con dùng AI để chép bài? Hãy xem cùng một bài toán, hai cách dùng.</h2>
        <p className="mt-3 max-w-2xl text-white/80">
          AI không xấu cũng không tốt. Khác biệt nằm ở việc ai là người suy nghĩ. EduNavigator dạy học sinh dùng AI để được hỏi, không để được giải hộ.
        </p>

        <div className="mt-8 rounded-2xl bg-white/10 p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Bài toán</p>
          <p className="mt-1 text-lg">{aiDemo.problem}</p>
        </div>

        <div role="tablist" aria-label="Cách dùng AI" className="mt-6 inline-flex rounded-full bg-white/10 p-1">
          {(Object.keys(aiDemo.modes) as Mode[]).map((m) => (
            <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)}
              className={`min-h-11 rounded-full px-5 font-semibold transition-colors ${mode === m ? "bg-accent text-accentink" : "text-white hover:bg-white/10"}`}>
              {aiDemo.modes[m].label}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="mt-4 rounded-2xl bg-bg p-4 text-ink md:p-6" aria-live="polite">
          <ul className="flex min-h-[22rem] flex-col gap-3">
            <AnimatePresence initial={false}>
              {msgs.slice(0, shown).map((m, i) => (
                <motion.li
                  key={`${mode}-${i}`}
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex max-w-[92%] items-start gap-2 sm:max-w-[80%] ${m.from === "student" ? "self-end flex-row-reverse" : "self-start"}`}
                >
                  <span className={`mt-1 grid size-8 shrink-0 place-items-center rounded-full ${m.from === "ai" ? "bg-navy text-accent" : "bg-accent text-accentink"}`}>
                    {m.from === "ai" ? <Bot size={16} aria-hidden /> : <GraduationCap size={16} aria-hidden />}
                  </span>
                  <p className={`whitespace-pre-line rounded-2xl px-4 py-3 ${"note" in m && m.note ? "italic text-muted" : m.from === "ai" ? "bg-surface" : "bg-surface2"} border border-line`}>
                    <span className="sr-only">{m.from === "ai" ? "AI: " : "Học sinh: "}</span>{m.text}
                  </p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <p className={`font-medium ${mode === "guide" ? "text-ok" : "text-muted"}`}>{aiDemo.modes[mode].caption}</p>
            <button onClick={() => setRun((r) => r + 1)} className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4">
              <RotateCcw size={16} aria-hidden /> Xem lại
            </button>
          </div>
        </div>

        <h3 className="mt-12 flex items-center gap-2 text-xl font-semibold"><ShieldCheck aria-hidden /> Ba nguyên tắc dùng AI an toàn</h3>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {aiDemo.principles.map((p, i) => (
            <li key={p.title} className="rounded-2xl bg-white/10 p-5">
              <span className="font-display text-3xl text-accent">{i + 1}</span>
              <p className="mt-1 font-semibold">{p.title}</p>
              <p className="mt-2 text-white/80">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
