"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";
import { useApp } from "./AppContext";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["#khi-nao", "Khi nào cần"],
  ["#tu-kiem-tra", "Tự kiểm tra"],
  ["#so-sanh", "Mentor và gia sư"],
  ["#quy-trinh", "Quy trình"],
  ["#hoc-cung-ai", "Học cùng AI"],
  ["#nguoi-dong-hanh", "Người đồng hành"],
  ["#goi", "Gói dịch vụ"],
  ["#hoi-dap", "Hỏi đáp"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { openBooking } = useApp();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-3 px-4 md:px-8">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold">
          <img src={`${site.basePath}/icon.svg`} alt="" width={32} height={32} />
          <span>{site.short}</span>
        </a>
        <nav aria-label="Menu chính" className="hidden items-center gap-5 text-[0.95rem] 2xl:flex">
          {links.map(([h, l]) => (
            <a key={h} href={h} className="whitespace-nowrap py-2 hover:text-accenttext">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
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
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Menu di động" className="border-t border-line bg-bg px-4 pb-4 2xl:hidden">
          <ul>
            {links.map(([h, l]) => (
              <li key={h}>
                <a href={h} onClick={() => setOpen(false)} className="block min-h-12 py-3 text-lg">{l}</a>
              </li>
            ))}
          </ul>
          <button className="btn btn-primary mt-2 w-full" onClick={() => { setOpen(false); openBooking(); }}>
            Đặt lịch chẩn đoán miễn phí
          </button>
        </nav>
      )}
    </header>
  );
}
