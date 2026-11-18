"use client";
import { AnimatePresence, m, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { useApp } from "./AppContext";
import { Logo } from "./Logo";
import { EASE } from "./motion";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["khi-nao", "Khi nào cần"],
  ["tu-kiem-tra", "Tự kiểm tra"],
  ["so-sanh", "Mentor và gia sư"],
  ["quy-trinh", "Quy trình"],
  ["hoc-cung-ai", "Học cùng AI"],
  ["nguoi-dong-hanh", "Người đồng hành"],
  ["goi", "Gói dịch vụ"],
  ["hoi-dap", "Hỏi đáp"],
] as const;

/** Mục nào đang nằm giữa màn hình. */
function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openBooking } = useApp();
  const active = useActiveSection();
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => scrollY.on("change", (y) => setScrolled(y > 8)), [scrollY]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`sticky top-0 z-40 border-b bg-bg/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${scrolled ? "border-line shadow-[0_8px_24px_-18px_rgb(15_42_74/.35)]" : "border-transparent"}`}>
      <div className="container-x flex h-16 items-center justify-between gap-3 px-4 md:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2 font-display text-lg font-semibold">
          <Logo />
          <span className="truncate">{site.short}</span>
        </a>
        <nav aria-label="Menu chính" className="hidden items-center gap-1 text-[0.92rem] 2xl:flex">
          {links.map(([id, l]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}
              className={`relative whitespace-nowrap rounded-full px-3 py-2 transition-colors ${active === id ? "text-ink" : "text-muted hover:text-ink"}`}>
              {l}
              <span aria-hidden className={`absolute inset-x-3 -bottom-px h-0.5 origin-left rounded bg-accent transition-transform duration-300 ${active === id ? "scale-x-100" : "scale-x-0"}`} />
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <button className="btn btn-primary hidden whitespace-nowrap md:inline-flex" onClick={() => openBooking()}>
            Đặt lịch miễn phí
          </button>
          <button
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            className="grid size-11 place-items-center rounded-full border border-line bg-surface 2xl:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span key={open ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
              </m.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
      <m.div aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent" style={{ scaleX: progress }} />

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Menu di động"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden border-t border-line bg-bg 2xl:hidden"
          >
            <m.ul className="px-4 pt-2" initial="h" animate="s" variants={{ h: {}, s: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } } }}>
              {links.map(([id, l]) => (
                <m.li key={id} variants={{ h: { opacity: 0, x: -10 }, s: { opacity: 1, x: 0 } }}>
                  <a href={`#${id}`} onClick={() => setOpen(false)}
                    className={`flex min-h-12 items-center border-b border-line/60 text-lg ${active === id ? "font-semibold text-accenttext" : ""}`}>{l}</a>
                </m.li>
              ))}
            </m.ul>
            <div className="p-4">
              <button className="btn btn-primary w-full" onClick={() => { setOpen(false); openBooking(); }}>
                Đặt lịch chẩn đoán miễn phí
              </button>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
