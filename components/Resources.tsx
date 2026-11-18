import { ExternalLink } from "lucide-react";
import { resources } from "@/content/resources";
import { site } from "@/content/site";

export function Resources() {
  return (
    <section id="tai-lieu" className="section bg-surface2">
      <div className="container-x grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="eyebrow">Kho tài liệu tự học</p>
          <h2 className="h2 mt-2">Tài liệu xếp theo môn, lớp, dạng bài và mức độ</h2>
          <p className="lead mt-3">{resources.intro}</p>
          <p className="mt-3 text-sm font-semibold text-accenttext">{resources.status}</p>
          <a className="btn btn-primary mt-6" href={site.docsUrl} target="_blank" rel="noopener noreferrer">
            Mở web tài liệu <ExternalLink size={16} aria-hidden />
          </a>
        </div>
        {/* Mô phỏng giao diện bộ lọc, không phải ảnh chụp thật */}
        <div className="card p-5" role="img" aria-label="Mô phỏng giao diện bộ lọc của web tài liệu: môn, lớp, dạng bài, mức độ">
          <div className="mb-4 flex gap-1.5" aria-hidden>
            <span className="size-3 rounded-full bg-line" /><span className="size-3 rounded-full bg-line" /><span className="size-3 rounded-full bg-line" />
          </div>
          <div className="space-y-4" aria-hidden>
            {resources.filters.map((f) => (
              <div key={f.label}>
                <p className="text-sm font-semibold text-muted">{f.label}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {f.values.map((v, i) => (
                    <span key={v} className={`rounded-full border px-3 py-1 text-sm ${i === 0 ? "border-accent bg-accent text-accentink" : "border-line bg-surface"}`}>{v}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
