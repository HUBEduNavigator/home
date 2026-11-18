"use client";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight, CalendarCheck, Compass } from "lucide-react";
import { hero } from "@/content/copy";
import { site } from "@/content/site";
import { useApp } from "./AppContext";
import { AudienceToggle } from "./AudienceToggle";
import { CompassRoad } from "./CompassRoad";
import { EASE } from "./motion";

const enter = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay: 0.08 * i },
});

export function Hero() {
  const { audience, openBooking } = useApp();
  return (
    <section id="top" className="section relative overflow-hidden pt-8 md:pt-14">
      {/* Nền ánh sáng nhẹ */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-accent/15 blur-3xl" />
      <div className="container-x relative grid items-center gap-10 md:grid-cols-[1.15fr_1fr]">
        <div>
          <m.div {...enter(0)}><AudienceToggle className="mb-6" /></m.div>
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={audience}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.32, ease: EASE }}>
              <p className="eyebrow flex items-center gap-2"><Compass size={16} aria-hidden /> {hero.eyebrow[audience]} · {site.short}</p>
              {/* h1 không bắt đầu từ opacity 0 để không làm chậm LCP */}
              <h1 className="mt-3 text-balance text-[2rem] font-semibold leading-tight sm:text-5xl">{hero.title[audience]}</h1>
              <p className="lead mt-5 text-lg">{hero.sub[audience]}</p>
            </m.div>
          </AnimatePresence>
          <m.p {...enter(2)} className="mt-4 font-display text-lg text-accenttext">{site.slogan}</m.p>
          <m.div {...enter(3)} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button className="btn btn-primary" onClick={() => openBooking()}><CalendarCheck size={18} aria-hidden /> {hero.ctaBook}</button>
            <a className="btn btn-ghost group" href="#tu-kiem-tra">{hero.ctaTest} <ArrowRight size={18} aria-hidden className="transition-transform group-hover:translate-x-1" /></a>
          </m.div>
        </div>
        <m.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
          <CompassRoad />
        </m.div>
      </div>
    </section>
  );
}
