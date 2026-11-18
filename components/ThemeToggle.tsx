"use client";
import { AnimatePresence, m } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type VTDoc = Document & { startViewTransition?: (cb: () => void) => unknown };

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.dataset.theme === "dark"), []);
  const flip = () => {
    const next = !dark;
    const apply = () => { document.documentElement.dataset.theme = next ? "dark" : "light"; setDark(next); };
    const doc = document as VTDoc;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (doc.startViewTransition && !calm) doc.startViewTransition(apply); else apply();
  };
  return (
    <button
      aria-label={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      onClick={flip}
      className="grid size-11 place-items-center overflow-hidden rounded-full border border-line bg-surface transition-colors hover:bg-surface2"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span key={dark ? "sun" : "moon"} initial={{ y: 14, opacity: 0, rotate: -40 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: -14, opacity: 0, rotate: 40 }} transition={{ duration: 0.22 }}>
          {dark ? <Sun size={20} aria-hidden /> : <Moon size={20} aria-hidden />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
