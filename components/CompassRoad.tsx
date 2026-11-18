"use client";
import { m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const nodes = [
  { x: 70, y: 500, label: "Mất phương hướng", side: "r" },
  { x: 320, y: 420, label: "Chẩn đoán", side: "l" },
  { x: 80, y: 340, label: "Lộ trình", side: "r" },
  { x: 320, y: 260, label: "Đồng hành", side: "l" },
  { x: 120, y: 180, label: "Tự chủ", side: "r" },
] as const;

const SEGMENTS = [
  "C70 460 320 460 320 420",
  "C320 380 80 380 80 340",
  "C80 300 320 300 320 260",
  "C320 220 120 220 120 180",
];
const START = "M70 500 ";
const PATH = START + SEGMENTS.join(" ");
const DURATION = 3400;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Tỉ lệ chiều dài đường tới từng chặng, để chặng sáng lên đúng lúc chấm đi qua. */
function nodeFractions(): number[] {
  const svgNS = "http://www.w3.org/2000/svg";
  const p = document.createElementNS(svgNS, "path");
  p.setAttribute("d", PATH);
  const total = p.getTotalLength();
  return [0, ...SEGMENTS.map((_, i) => {
    p.setAttribute("d", START + SEGMENTS.slice(0, i + 1).join(" "));
    return p.getTotalLength() / total;
  })];
}

export function CompassRoad() {
  const reduce = useReducedMotion();
  const wrap = useRef<SVGSVGElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const dot = useRef<SVGGElement>(null);
  const inView = useInView(wrap, { once: true, amount: 0.35 });
  const [reached, setReached] = useState(-1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const path = trail.current!;
    const total = path.getTotalLength();
    const fr = nodeFractions();
    const place = (p: number) => {
      path.style.strokeDashoffset = String(1 - p);
      const pt = path.getPointAtLength(total * p);
      dot.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
    };
    if (reduce) { place(1); setReached(nodes.length - 1); setDone(true); return; }
    let raf = 0;
    const t0 = performance.now();
    let last = -1;
    const tick = (now: number) => {
      const p = easeInOut(Math.min(1, (now - t0) / DURATION));
      place(p);
      const idx = fr.filter((f) => p >= f - 0.002).length - 1;
      if (idx !== last) { last = idx; setReached(idx); }
      if (p < 1) raf = requestAnimationFrame(tick); else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return (
    <svg ref={wrap} viewBox="0 0 400 560" role="img"
      aria-label="Con đường từ Mất phương hướng, qua Chẩn đoán, Lộ trình, Đồng hành tới Tự chủ, dẫn tới chiếc la bàn chỉ hướng"
      className="mx-auto h-auto w-full max-w-[26rem]">
      <defs>
        <linearGradient id="trail" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--muted)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor="var(--accent)" stopOpacity=".55" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Lòng đường + vạch giữa */}
      <path d={PATH} fill="none" stroke="var(--line)" strokeWidth="28" strokeLinecap="round" />
      <path d={PATH} fill="none" stroke="var(--bg)" strokeWidth="2" strokeDasharray="6 9" strokeLinecap="round" opacity=".9" />
      {/* Vệt đã đi qua */}
      <path ref={trail} d={PATH} pathLength={1} fill="none" stroke="url(#trail)" strokeWidth="5" strokeLinecap="round"
        strokeDasharray="1 1" style={{ strokeDashoffset: 1 }} />
      {/* Nối tới la bàn */}
      <m.path d="M120 180 C120 150 180 150 200 140" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="3 7" strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: done ? 1 : 0 }} transition={{ duration: 0.6 }} />

      {nodes.map((n, i) => {
        const on = i <= reached;
        return (
          <g key={n.label}>
            <m.circle cx={n.x} cy={n.y} r="11" stroke="var(--accent)" strokeWidth="3"
              initial={false}
              fill={on ? (i === 0 ? "var(--muted)" : "var(--navy)") : "var(--surface)"}
              animate={{ scale: on ? 1 : 0.75 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
              style={{ transformBox: "fill-box", transformOrigin: "center", transition: "fill .3s ease" }} />
            <m.text
              x={n.side === "r" ? n.x + 22 : n.x - 22} y={n.y + 5}
              textAnchor={n.side === "r" ? "start" : "end"} fontSize="16" fontWeight="600" fill="var(--ink)"
              initial={false}
              animate={{ opacity: on ? 1 : 0.35, x: on ? 0 : n.side === "r" ? -6 : 6 }}
              transition={{ duration: 0.45 }}
            >
              {n.label}
            </m.text>
          </g>
        );
      })}

      {/* Chấm di chuyển */}
      <g ref={dot} transform="translate(70 500)" style={{ opacity: done ? 0 : 1, transition: "opacity .5s ease .2s" }}>
        <circle r="18" fill="url(#glow)" />
        <circle r="6" fill="var(--accent)" stroke="var(--bg)" strokeWidth="2" />
      </g>

      {/* La bàn */}
      <g transform="translate(220 78)">
        <m.circle r="70" fill="url(#glow)" initial={{ opacity: 0 }} animate={{ opacity: done ? 1 : 0 }} transition={{ duration: 0.8 }} />
        <circle r="62" fill="var(--navy)" />
        <circle r="54" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        {Array.from({ length: 12 }, (_, i) => i * 30).map((a) => (
          <line key={a} x1="0" y1="-54" x2="0" y2={a % 90 === 0 ? -43 : -48} stroke="var(--accent)" strokeWidth={a % 90 === 0 ? 3 : 1.5} transform={`rotate(${a})`} opacity={a % 90 === 0 ? 1 : 0.6} />
        ))}
        <text y="-29" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">B</text>
        <m.g
          initial={{ rotate: reduce ? 400 : 0 }}
          animate={
            !inView ? { rotate: 0 } :
            done ? { rotate: 400 } :
            { rotate: [0, 220, 110, 300, 170, 372] }
          }
          transition={done ? { type: "spring", stiffness: 60, damping: 7 } : { duration: DURATION / 1000, ease: "easeInOut" }}
        >
          <path d="M0 -42 8 0 -8 0Z" fill="var(--accent)" />
          <path d="M0 42 8 0 -8 0Z" fill="#fff" opacity="0.85" />
        </m.g>
        <circle r="5" fill="var(--navy)" stroke="var(--accent)" strokeWidth="2" />
      </g>
    </svg>
  );
}
