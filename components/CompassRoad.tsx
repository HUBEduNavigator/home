"use client";
import { motion, useReducedMotion } from "motion/react";

const nodes = [
  { x: 70, y: 500, label: "Mất phương hướng", side: "r" },
  { x: 320, y: 420, label: "Chẩn đoán", side: "l" },
  { x: 80, y: 340, label: "Lộ trình", side: "r" },
  { x: 320, y: 260, label: "Đồng hành", side: "l" },
  { x: 120, y: 180, label: "Tự chủ", side: "r" },
] as const;

const PATH =
  "M70 500 C70 460 320 460 320 420 C320 380 80 380 80 340 C80 300 320 300 320 260 C320 220 120 220 120 180";

export function CompassRoad() {
  const reduce = useReducedMotion();
  const t = (d: number) => (reduce ? 0 : d);
  return (
    <svg viewBox="0 0 400 560" role="img" aria-label="Con đường từ Mất phương hướng, qua Chẩn đoán, Lộ trình, Đồng hành tới Tự chủ, dẫn tới chiếc la bàn chỉ hướng" className="mx-auto h-auto w-full max-w-[26rem]">
      <defs>
        <linearGradient id="road" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--muted)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      {/* Đường: nền + nét đứt vẽ dần */}
      <path d={PATH} fill="none" stroke="var(--line)" strokeWidth="26" strokeLinecap="round" />
      <motion.path
        d={PATH}
        fill="none"
        stroke="url(#road)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="2 10"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: t(3.2), ease: "easeInOut" }}
      />
      {/* Các chặng */}
      {nodes.map((n, i) => (
        <motion.g
          key={n.label}
          initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: t(0.4 + i * 0.6), duration: t(0.4) }}
          style={{ transformOrigin: `${n.x}px ${n.y}px`, transformBox: "view-box" }}
        >
          <circle cx={n.x} cy={n.y} r="11" fill={i === 0 ? "var(--muted)" : "var(--navy)"} stroke="var(--accent)" strokeWidth="3" />
          <text
            x={n.side === "r" ? n.x + 22 : n.x - 22}
            y={n.y + 5}
            textAnchor={n.side === "r" ? "start" : "end"}
            fontSize="16"
            fontWeight="600"
            fill="var(--ink)"
          >
            {n.label}
          </text>
        </motion.g>
      ))}
      {/* La bàn */}
      <g transform="translate(220 78)">
        <circle r="62" fill="var(--navy)" />
        <circle r="54" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        {[0, 90, 180, 270].map((a) => (
          <line key={a} x1="0" y1="-54" x2="0" y2="-44" stroke="var(--accent)" strokeWidth="3" transform={`rotate(${a})`} />
        ))}
        <text y="-30" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">B</text>
        <motion.g
          initial={{ rotate: reduce ? 38 : 0 }}
          animate={{ rotate: reduce ? 38 : [0, 250, 130, 330, 10, 55, 30, 40, 38] }}
          transition={{ duration: t(3.6), ease: "easeInOut", times: [0, 0.15, 0.3, 0.45, 0.6, 0.72, 0.84, 0.93, 1] }}
        >
          <path d="M0 -42 8 0 -8 0Z" fill="var(--accent)" />
          <path d="M0 42 8 0 -8 0Z" fill="#fff" opacity="0.85" />
        </motion.g>
        <circle r="5" fill="var(--navy)" stroke="var(--accent)" strokeWidth="2" />
      </g>
    </svg>
  );
}
