"use client";
import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { steps } from "@/content/process";
import { EASE, SectionHead } from "./motion";

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 100, damping: 26, restDelta: 0.001 });
  return (
    <section id="quy-trinh" className="section">
      <div className="container-x">
        <SectionHead eyebrow="Cách làm việc" title="Gọn trong 1–2 buổi gặp mặt, rồi bạn tự đi tiếp với tài liệu đúng" lead="HUB không kéo dài theo tháng hay theo học kỳ. Dịch vụ đi thẳng vào gốc của cách tự học, rồi trao cho học sinh đúng công cụ để tự học tiếp." />
        <ol ref={ref} className="relative mt-10 space-y-8 pl-12 md:pl-16">
          <span aria-hidden className="absolute bottom-2 left-4 top-2 w-1 rounded bg-line md:left-6" />
          <m.span aria-hidden className="absolute bottom-2 left-4 top-2 w-1 origin-top rounded bg-accent md:left-6" style={{ scaleY: grow }} />
          {steps.map((s, i) => (
            <m.li
              key={s.id}
              className="card relative p-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <m.span
                variants={{ hidden: { scale: 0.4, backgroundColor: "#8a96a8" }, show: { scale: 1, backgroundColor: "#0f2a4a" } }}
                transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.15 }}
                className="absolute -left-12 top-5 grid size-9 place-items-center rounded-full font-semibold text-white ring-4 ring-bg md:-left-[3.35rem]"
              >
                {i + 1}
              </m.span>
              <h3 className="text-xl font-semibold">{s.name}</h3>
              <dl className="mt-3 grid gap-x-6 gap-y-2 md:grid-cols-[9rem_1fr] md:gap-y-3">
                <dt className="font-semibold text-muted">Nội dung chính</dt><dd className="mb-2 md:mb-0">{s.what}</dd>
                <dt className="font-semibold text-muted">Học sinh nhận được</dt>
                <dd><span className="rounded-md bg-accent/20 px-1.5 py-0.5 font-medium">{s.product}</span></dd>
              </dl>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
