"use client";
import { m } from "motion/react";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { resources } from "@/content/resources";
import { site } from "@/content/site";
import { Reveal } from "./motion";

export function Resources() {
  // Mô phỏng: lựa chọn trong bộ lọc tự đổi chậm, như có người đang lọc
  const [pick, setPick] = useState<number[]>(resources.filters.map(() => 0));
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!live || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let row = 0;
    const t = setInterval(() => {
      setPick((p) => p.map((v, i) => (i === row ? (v + 1) % Math.min(3, resources.filters[i].values.length) : v)));
      row = (row + 1) % resources.filters.length;
    }, 1400);
    return () => clearInterval(t);
  }, [live]);

  return (
    <section id="tai-lieu" className="section bg-surface2">
      <div className="container-x grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Kho tài liệu tự học</p>
          <h2 className="h2 mt-2 text-balance">Tài liệu xếp theo môn, lớp, dạng bài và mức độ</h2>
          <p className="lead mt-3">{resources.intro}</p>
          <p className="mt-3 text-sm font-semibold text-accenttext">{resources.status}</p>
          <a className="btn btn-primary mt-6" href={site.docsUrl} target="_blank" rel="noopener noreferrer">
            Mở web tài liệu <ExternalLink size={16} aria-hidden />
          </a>
        </Reveal>
        <m.div
          className="card p-5 shadow-[0_30px_60px_-40px_rgb(15_42_74/.5)]"
          initial={{ opacity: 0, y: 24, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          onViewportEnter={() => setLive(true)}
          onViewportLeave={() => setLive(false)}
          role="img"
          aria-label="Mô phỏng giao diện bộ lọc của web tài liệu: môn, lớp, dạng bài, mức độ"
        >
          <div className="mb-4 flex items-center gap-1.5" aria-hidden>
            <span className="size-3 rounded-full bg-[#ff5f57]/70" /><span className="size-3 rounded-full bg-[#febc2e]/70" /><span className="size-3 rounded-full bg-[#28c840]/70" />
            <span className="ml-3 h-5 flex-1 rounded-full bg-surface2" />
          </div>
          <div className="space-y-4" aria-hidden>
            {resources.filters.map((f, r) => (
              <div key={f.label}>
                <p className="text-sm font-semibold text-muted">{f.label}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {f.values.map((v, i) => (
                    <span key={v} className={`rounded-full border px-3 py-1 text-sm transition-colors duration-300 ${i === pick[r] ? "border-accent bg-accent text-accentink" : "border-line bg-surface"}`}>{v}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
