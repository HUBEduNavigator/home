"use client";
import { m } from "motion/react";
import { ExternalLink, UserRound } from "lucide-react";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { EASE, Reveal, Stagger, StaggerItem } from "./motion";

export function Founder() {
  return (
    <section id="nguoi-dong-hanh" className="section">
      <div className="container-x">
        <Reveal><p className="eyebrow">Người đồng hành</p></Reveal>
        <div className="mt-3 grid gap-8 md:grid-cols-[18rem_1fr] md:gap-12">
          <Reveal className="md:sticky md:top-24 md:self-start">
            {site.founderPhoto ? (
              <img src={`${site.basePath}${site.founderPhoto}`} alt={`Ảnh ${profile.name}`} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
            ) : (
              // TODO: HUB thêm ảnh (đặt đường dẫn vào site.founderPhoto)
              <div className="grid aspect-[4/5] w-full place-items-center rounded-2xl border-2 border-dashed border-line bg-surface2 text-center text-muted">
                <div><UserRound size={48} className="mx-auto" aria-hidden /><p className="mt-2 font-semibold">TODO: ảnh của HUB</p></div>
              </div>
            )}
          </Reveal>
          <div>
            <Reveal>
              <h2 className="h2">{profile.name}</h2>
              <p className="mt-1 text-muted">{profile.role}</p>
            </Reveal>
            <Stagger className="mt-5 flex flex-wrap gap-2" gap={0.06}>
              {profile.credentials.map((c) => (
                <StaggerItem key={c} className="rounded-full bg-navy px-4 py-1.5 text-sm font-semibold text-white">{c}</StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-8">
              <h3 className="text-xl font-semibold">Bằng chứng tự học</h3>
              <p className="mt-1 text-muted">Các ngoại ngữ HUB tự học và trình độ hiện tại.</p>
            </Reveal>
            <ul className="mt-4 space-y-3">
              {profile.languages.map((l, i) => (
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

            <Reveal className="mt-8">
              <h3 className="text-xl font-semibold">Kinh nghiệm làm việc tự do</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {profile.experience.map((e) => <li key={e} className="rounded-full border border-line bg-surface px-3 py-1 text-sm">{e}</li>)}
              </ul>
              <p className="mt-5">{profile.direction}</p>
            </Reveal>

            <Reveal className="mt-8 rounded-2xl border-2 border-dashed border-line bg-surface2 p-5">
              <p className="font-display text-lg font-semibold">Lời của người sáng lập</p>
              {site.founderNote ? <p className="mt-2 whitespace-pre-line">{site.founderNote}</p> : <p className="mt-2 text-muted">TODO: HUB tự viết.</p>}
            </Reveal>

            <a className="btn btn-ghost group mt-6" href={site.bioUrl} target="_blank" rel="noopener noreferrer">
              Xem trang giới thiệu của HUB <ExternalLink size={16} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
