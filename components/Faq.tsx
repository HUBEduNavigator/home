import { ChevronDown } from "lucide-react";
import { faq } from "@/content/faq";

export function Faq() {
  return (
    <section id="hoi-dap" className="section bg-surface2">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Câu hỏi thường gặp</p>
        <h2 className="h2 mt-2">Những điều ba mẹ và các bạn hay hỏi</h2>
        <div className="mt-8 space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="card group p-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}
                <ChevronDown className="shrink-0 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
