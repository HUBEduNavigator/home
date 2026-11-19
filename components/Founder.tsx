"use client";
import { m } from "motion/react";
import { ExternalLink } from "lucide-react";
import { founders, members, type Member } from "@/content/profile";
import { EASE, SectionHead, Stagger, StaggerItem } from "./motion";

function Card({ p }: { p: Member }) {
  return (
    <article className="card card-hover flex h-full flex-col p-6 md:p-7">
      <div className="flex items-center gap-4">
        <span aria-hidden className="grid size-16 shrink-0 place-items-center rounded-full bg-navy font-display text-2xl font-semibold text-accent ring-4 ring-accent/30">
          {p.initials}
        </span>
        <div className="min-w-0">
          <h3 className="text-2xl font-semibold">{p.name}</h3>
          <p className="text-muted">{p.role}</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        <li className="rounded-full bg-navy px-4 py-1.5 text-sm font-semibold text-white">{p.degree}</li>
        {p.badge && <li className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accentink">{p.badge}</li>}
      </ul>

      <p className="mt-4">{p.summary}</p>

      <h4 className="mt-6 font-display text-lg font-semibold">{p.highlightsTitle}</h4>
      <ul className="mt-3 flex flex-wrap gap-2">
        {p.highlights.map((h) => (
          <li key={h} className="rounded-full border border-line bg-surface2 px-3 py-1 text-sm">{h}</li>
        ))}
      </ul>

      {p.languagesTitle && (
        <>
          <h4 className="mt-6 font-display text-lg font-semibold">{p.languagesTitle}</h4>
          <ul className="mt-3 space-y-3">
            {p.languages.map((l, i) => (
              <li key={l.name}>
                <div className="flex justify-between gap-3 font-medium"><span>{l.name}</span><span className="text-accenttext">{l.level}</span></div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface2" aria-hidden>
                  <m.div className="h-full origin-left rounded-full bg-accent" style={{ width: `${l.pct}%` }}
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.1 * i }} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {p.link && (
        <a className="btn btn-ghost group mt-auto self-start" href={p.link.href} target="_blank" rel="noopener noreferrer" style={{ marginTop: "1.5rem" }}>
          {p.link.label} <ExternalLink size={16} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      )}
    </article>
  );
}

export function Founder() {
  return (
    <section id="nguoi-dong-hanh" className="section">
      <div className="container-x">
        <SectionHead eyebrow={founders.eyebrow} title={founders.title} lead={founders.intro} />
        <Stagger className="mt-9 grid gap-6 md:grid-cols-2" gap={0.12}>
          {members.map((p) => (
            <StaggerItem key={p.id}><Card p={p} /></StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
