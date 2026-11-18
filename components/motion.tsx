"use client";
import { LazyMotion, MotionConfig, domAnimation, m, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

/** Đường cong dùng chung: nhanh lúc đầu, dừng êm. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Gốc hoạt ảnh: chỉ nạp tính năng `domAnimation` (nhẹ hơn bản đầy đủ),
 * và tự tắt chuyển động vị trí/kích thước khi người dùng bật "giảm chuyển động".
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: EASE }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

/** Hiện dần khi cuộn tới, chỉ một lần. */
export function Reveal({ delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...props}
    />
  );
}

/** Danh sách hiện lần lượt từng phần tử. Con dùng <StaggerItem>. */
export function Stagger({ as = "ul", gap = 0.08, className, children }: { as?: "ul" | "ol" | "div"; gap?: number; className?: string; children: ReactNode }) {
  const C = as === "ol" ? m.ol : as === "div" ? m.div : m.ul;
  return (
    <C
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </C>
  );
}

export function StaggerItem({ as = "li", ...props }: HTMLMotionProps<"li"> & { as?: "li" | "div" }) {
  const C = (as === "div" ? m.div : m.li) as typeof m.li;
  return <C variants={fadeUp} transition={{ duration: 0.55, ease: EASE }} {...props} />;
}

/** Tiêu đề section dùng chung. */
export function SectionHead({ eyebrow, title, lead, light = false }: { eyebrow: string; title: ReactNode; lead?: ReactNode; light?: boolean }) {
  return (
    <Reveal>
      <p className={`eyebrow ${light ? "!text-accent" : ""}`}>{eyebrow}</p>
      <h2 className="h2 mt-2 max-w-3xl text-balance">{title}</h2>
      {lead && <p className={`mt-3 max-w-2xl ${light ? "text-white/80" : "text-muted"}`}>{lead}</p>}
    </Reveal>
  );
}
