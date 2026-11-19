"use client";
import { Check } from "lucide-react";
import { plans, plansIntro } from "@/content/plans";
import { NEED_CONSULT, site } from "@/content/site";
import { useApp } from "./AppContext";
import { Reveal, SectionHead, Stagger, StaggerItem } from "./motion";

export function Plans() {
  const { openBooking } = useApp();
  return (
    <section id="goi" className="section">
      <div className="container-x">
        <SectionHead eyebrow={plansIntro.eyebrow} title={plansIntro.title} lead={plansIntro.lead} />
        <Stagger className="mt-8 grid gap-5 md:grid-cols-3" gap={0.1}>
          {plans.map((p) => (
            <StaggerItem key={p.id} className="card card-hover flex flex-col p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-accenttext">{p.tag}</p>
              <h3 className="mt-1 text-2xl font-semibold">{p.name}</h3>
              <ul className="mt-4 space-y-2">
                {p.focus.map((f) => (
                  <li key={f} className="flex gap-2"><Check size={18} className="mt-1.5 shrink-0 text-ok" aria-hidden /><span>{f}</span></li>
                ))}
              </ul>
              <p className="mt-auto border-t border-line pt-4 font-semibold">{p.price ?? site.pricing ?? NEED_CONSULT}</p>
              <button className="btn btn-ghost mt-3" onClick={() => openBooking({ grade: p.id === "g5" ? "5" : p.id })}>{p.cta}</button>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal><p className="mt-5 text-sm text-muted">{plansIntro.note}</p></Reveal>
      </div>
    </section>
  );
}
