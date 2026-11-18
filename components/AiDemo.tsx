"use client";
import { AnimatePresence, m, useInView, useReducedMotion } from "motion/react";
import { Bot, GraduationCap, RotateCcw, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { aiDemo } from "@/content/ai-demo";
import { EASE, SectionHead, Stagger, StaggerItem } from "./motion";

type Mode = "solve" | "guide";
type Msg = { from: string; text: string; note?: boolean };

export function AiDemo() {
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const inView = useInView(panel, { once: true, amount: 0.3 });
  const [mode, setMode] = useState<Mode>("guide");
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const msgs = aiDemo.modes[mode].messages as Msg[];

  // Phát lần lượt: AI có "đang gõ…" trước mỗi câu, học sinh trả lời nhanh hơn.
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setShown(msgs.length); setTyping(null); return; }
    setShown(0);
    const timers: number[] = [];
    let t = 250;
    msgs.forEach((msg, i) => {
      const wait = msg.from === "ai" ? 950 : 650;
      timers.push(window.setTimeout(() => setTyping(msg.from), t));
      t += wait;
      timers.push(window.setTimeout(() => { setTyping(null); setShown(i + 1); }, t));
      t += 350 + Math.min(900, msg.text.length * 8); // thời gian đọc
    });
    return () => timers.forEach(clearTimeout);
  }, [mode, run, inView, reduce, msgs]);

  // Khung chat cao cố định: tự cuộn xuống tin mới, trang bên ngoài không bị đẩy
  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [shown, typing, reduce]);

  const finished = shown >= msgs.length;

  return (
    <section id="hoc-cung-ai" className="section relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 size-[28rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="container-x relative">
        <SectionHead light eyebrow="Học cùng AI, đúng cách"
          title="Ba mẹ lo con dùng AI để chép bài? Hãy xem cùng một bài toán, hai cách dùng AI."
          lead="Bản thân AI không làm học sinh lười suy nghĩ. Khác biệt nằm ở việc ai là người suy nghĩ. EduNavigator dạy học sinh dùng AI để được hỏi lại và gợi ý, không để được giải hộ." />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <div className="rounded-2xl border border-white/10 bg-white/[.07] p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">Bài toán</p>
              <p className="mt-1 text-lg">{aiDemo.problem}</p>
            </div>
            <div role="tablist" aria-label="Cách dùng AI" className="relative mt-6 grid grid-cols-2 rounded-full bg-white/10 p-1">
              <span aria-hidden className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-accent transition-transform duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ transform: mode === "guide" ? "translateX(100%)" : "translateX(0)" }} />
              {(Object.keys(aiDemo.modes) as Mode[]).map((k) => (
                <button key={k} role="tab" id={`tab-${k}`} aria-controls="ai-panel" aria-selected={mode === k} onClick={() => setMode(k)}
                  className={`relative min-h-11 rounded-full px-4 font-semibold transition-colors duration-300 ${mode === k ? "text-accentink" : "text-white hover:text-accent"}`}>
                  {aiDemo.modes[k].label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <m.p key={mode} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}
                className={`mt-5 rounded-2xl border-l-4 p-4 font-medium ${mode === "guide" ? "border-[#5ccf94] bg-[#5ccf94]/10" : "border-white/40 bg-white/5 text-white/85"}`}>
                {aiDemo.modes[mode].caption}
              </m.p>
            </AnimatePresence>
          </div>

          <div ref={panel} id="ai-panel" role="tabpanel" aria-labelledby={`tab-${mode}`} className="rounded-2xl bg-bg p-4 text-ink shadow-2xl md:p-6">
            <div className="mb-3 flex items-center gap-2 border-b border-line pb-3 text-sm text-muted">
              <span className="size-2 rounded-full bg-ok" aria-hidden /> Trò chuyện mô phỏng
            </div>
            <ul ref={list} className="-mr-2 flex h-[26rem] flex-col gap-3 overflow-y-auto overscroll-contain pr-2 md:h-[28rem]" aria-live="polite">
              <AnimatePresence initial={false}>
                {msgs.slice(0, shown).map((msg, i) => (
                  <m.li
                    key={`${mode}-${run}-${i}`}
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`flex max-w-[92%] items-start gap-2 sm:max-w-[82%] ${msg.from === "student" ? "flex-row-reverse self-end" : "self-start"}`}
                  >
                    <Avatar from={msg.from} />
                    <p className={`whitespace-pre-line rounded-2xl border border-line px-4 py-3 ${msg.note ? "italic text-muted" : msg.from === "ai" ? "rounded-tl-md bg-surface" : "rounded-tr-md bg-surface2"}`}>
                      <span className="sr-only">{msg.from === "ai" ? "AI: " : "Học sinh: "}</span>{msg.text}
                    </p>
                  </m.li>
                ))}
                {typing && (
                  <m.li key="typing" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                    className={`flex items-center gap-2 ${typing === "student" ? "flex-row-reverse self-end" : "self-start"}`}>
                    <Avatar from={typing} />
                    <span className="flex gap-1 rounded-2xl border border-line bg-surface px-4 py-4 text-muted" aria-label="Đang gõ">
                      <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                    </span>
                  </m.li>
                )}
              </AnimatePresence>
            </ul>
            <div className="mt-4 flex justify-end border-t border-line pt-3">
              <button onClick={() => setRun((r) => r + 1)} disabled={!finished}
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-medium transition-opacity hover:bg-surface2 disabled:opacity-40">
                <RotateCcw size={16} aria-hidden /> Xem lại
              </button>
            </div>
          </div>
        </div>

        <h3 className="mt-14 flex items-center gap-2 text-xl font-semibold"><ShieldCheck aria-hidden className="text-accent" /> Ba nguyên tắc dùng AI an toàn</h3>
        <Stagger as="ol" className="mt-4 grid gap-4 md:grid-cols-3">
          {aiDemo.principles.map((p, i) => (
            <StaggerItem key={p.title} className="rounded-2xl border border-white/10 bg-white/[.07] p-5 transition-colors hover:bg-white/[.11]">
              <span className="font-display text-3xl text-accent">{i + 1}</span>
              <p className="mt-1 font-semibold">{p.title}</p>
              <p className="mt-2 text-white/80">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Avatar({ from }: { from: string }) {
  return (
    <span className={`mt-1 grid size-8 shrink-0 place-items-center rounded-full ${from === "ai" ? "bg-navy text-accent" : "bg-accent text-accentink"}`}>
      {from === "ai" ? <Bot size={16} aria-hidden /> : <GraduationCap size={16} aria-hidden />}
    </span>
  );
}
