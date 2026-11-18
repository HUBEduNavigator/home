"use client";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight, Gauge, Layers, Repeat2, SearchX, Sprout } from "lucide-react";
import { cases } from "@/content/cases";
import { useApp } from "./AppContext";
import { SectionHead, Stagger, StaggerItem } from "./motion";

const icons = { pressure: Gauge, gaps: Layers, inefficient: Repeat2, nomentor: SearchX, grade5: Sprout };

export function Situations() {
  const { audience, openBooking } = useApp();
  return (
    <section id="khi-nao" className="section bg-surface2">
      <div className="container-x">
        <SectionHead
          eyebrow="Khi nào bạn cần chúng tôi"
          title="Năm tình huống thường gặp nhất"
          lead={`Nếu một trong các đoạn dưới đây giống ${audience === "parent" ? "con của ba mẹ" : "bạn"}, rất có thể EduNavigator giúp được.`}
        />
        <Stagger className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => {
            const Icon = icons[c.id];
            return (
              <StaggerItem key={c.id} className="card card-hover group flex flex-col p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-navy text-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
                <AnimatePresence mode="wait" initial={false}>
                  <m.p key={audience} className="mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    {c.situation[audience]}
                  </m.p>
                </AnimatePresence>
                <p className="mt-4 border-t border-line pt-4 text-muted">
                  <strong className="text-ink">EduNavigator làm gì: </strong>
                  {c.handling}
                </p>
                <button
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-4 font-semibold text-accenttext underline-offset-4 hover:underline"
                  onClick={() => openBooking({ role: audience, cases: [c.id] })}
                >
                  Đặt lịch cho tình huống này <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
                </button>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
