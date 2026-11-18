"use client";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { steps } from "@/content/process";

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return (
    <section id="quy-trinh" className="section">
      <div className="container-x">
        <p className="eyebrow">Quy trình làm việc</p>
        <h2 className="h2 mt-2">Bốn chặng, mỗi chặng có sản phẩm cụ thể</h2>
        <ol ref={ref} className="relative mt-10 space-y-8 pl-12 md:pl-16">
          <span aria-hidden className="absolute left-4 top-2 bottom-2 w-1 rounded bg-line md:left-6" />
          <motion.span aria-hidden className="absolute left-4 top-2 bottom-2 w-1 origin-top rounded bg-accent md:left-6" style={{ scaleY: reduce ? 1 : grow }} />
          {steps.map((s, i) => (
            <motion.li
              key={s.id}
              className="card relative p-6"
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45 }}
            >
              <span className="absolute -left-12 top-5 grid size-9 place-items-center rounded-full bg-navy font-bold text-white ring-4 ring-bg md:-left-[3.35rem]">{i + 1}</span>
              <h3 className="text-xl font-semibold">{s.name}</h3>
              <dl className="mt-3 grid gap-3 md:grid-cols-[9rem_1fr] md:gap-x-6">
                <dt className="font-semibold text-muted">Làm gì</dt><dd>{s.what}</dd>
                <dt className="font-semibold text-muted">Ai làm</dt><dd>{s.who}</dd>
                <dt className="font-semibold text-muted">Nhận được</dt><dd className="font-medium">{s.product}</dd>
                <dt className="font-semibold text-muted">Thời lượng</dt>
                <dd>{s.duration ?? "Thống nhất khi tư vấn"}</dd>
              </dl>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
