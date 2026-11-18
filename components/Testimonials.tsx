import { testimonials } from "@/content/testimonials";

/** Ẩn hoàn toàn khi chưa có cảm nhận thật. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="cam-nhan" className="section">
      <div className="container-x">
        <p className="eyebrow">Cảm nhận</p>
        <h2 className="h2 mt-2">Ba mẹ và các bạn nói gì</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.quote} className="card p-6">
              <blockquote>“{t.quote}”</blockquote>
              <p className="mt-3 text-sm font-semibold text-muted">{t.who}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
