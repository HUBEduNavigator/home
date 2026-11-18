"use client";
import { AnimatePresence, m } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { faq } from "@/content/faq";
import { EASE, SectionHead, Stagger, StaggerItem } from "./motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <section id="hoi-dap" className="section bg-surface2">
      <div className="container-x max-w-3xl">
        <SectionHead eyebrow="Câu hỏi thường gặp" title="Những điều ba mẹ và các bạn hay hỏi" />
        <Stagger as="div" className="mt-8 space-y-3" gap={0.05}>
          {faq.map((f, i) => {
            const on = open === i;
            return (
              <StaggerItem as="div" key={f.q} className={`card overflow-hidden ${on ? "border-accent/60" : ""}`}>
                <h3 className="font-sans text-base">
                  <button id={`${base}-q${i}`} aria-expanded={on} aria-controls={`${base}-a${i}`} onClick={() => setOpen(on ? null : i)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-[1.05rem] font-semibold">
                    {f.q}
                    <Plus aria-hidden className={`shrink-0 text-accenttext transition-transform duration-300 ${on ? "rotate-45" : ""}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <m.div id={`${base}-a${i}`} role="region" aria-labelledby={`${base}-q${i}`}
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}>
                      <p className="px-5 pb-5 text-muted">{f.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
