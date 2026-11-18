"use client";
import { ExternalLink, UserRound } from "lucide-react";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

export function Founder() {
  return (
    <section id="nguoi-dong-hanh" className="section">
      <div className="container-x">
        <p className="eyebrow">Người đồng hành</p>
        <div className="mt-3 grid gap-8 md:grid-cols-[18rem_1fr]">
          <div>
            {site.founderPhoto ? (
              <img src={`${site.basePath}${site.founderPhoto}`} alt={`Ảnh ${profile.name}`} className="aspect-[4/5] w-full rounded-2xl object-cover" />
            ) : (
              // TODO: HUB thêm ảnh (đặt đường dẫn vào site.founderPhoto)
              <div className="grid aspect-[4/5] w-full place-items-center rounded-2xl border-2 border-dashed border-line bg-surface2 text-center text-muted">
                <div><UserRound size={48} className="mx-auto" aria-hidden /><p className="mt-2 font-semibold">TODO: ảnh của HUB</p></div>
              </div>
            )}
          </div>
          <div>
            <h2 className="h2">{profile.name}</h2>
            <p className="mt-1 text-muted">{profile.role}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {profile.credentials.map((c) => (
                <li key={c} className="rounded-full bg-navy px-4 py-1.5 text-sm font-semibold text-white">{c}</li>
              ))}
            </ul>

            <h3 className="mt-8 text-xl font-semibold">Bằng chứng tự học</h3>
            <p className="mt-1 text-muted">Các ngoại ngữ HUB tự học và trình độ hiện tại.</p>
            <ul className="mt-4 space-y-3">
              {profile.languages.map((l) => (
                <li key={l.name}>
                  <div className="flex justify-between gap-3 font-medium"><span>{l.name}</span><span className="text-accenttext">{l.level}</span></div>
                  <div className="mt-1 h-2 rounded-full bg-surface2" aria-hidden><div className="h-full rounded-full bg-accent" style={{ width: `${l.pct}%` }} /></div>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-xl font-semibold">Kinh nghiệm làm việc tự do</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.experience.map((e) => <li key={e} className="rounded-full border border-line bg-surface px-3 py-1 text-sm">{e}</li>)}
            </ul>
            <p className="mt-5">{profile.direction}</p>

            <div className="mt-8 rounded-2xl border-2 border-dashed border-line bg-surface2 p-5">
              <p className="font-display text-lg font-semibold">Lời của người sáng lập</p>
              {site.founderNote ? <p className="mt-2 whitespace-pre-line">{site.founderNote}</p> : <p className="mt-2 text-muted">TODO: HUB tự viết.</p>}
            </div>

            <a className="btn btn-ghost mt-6" href={site.bioUrl} target="_blank" rel="noopener noreferrer">
              Xem trang giới thiệu của HUB <ExternalLink size={16} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
