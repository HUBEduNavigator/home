"use client";
import { AnimatePresence, m, useScroll } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { useApp } from "./AppContext";

/** Nút Zalo nổi trên điện thoại: hiện sau khi cuộn qua hero, ẩn khi modal mở. */
export function FloatingZalo() {
  const { scrollY } = useScroll();
  const { bookingOpen } = useApp();
  const [show, setShow] = useState(false);
  useEffect(() => scrollY.on("change", (y) => setShow(y > 420)), [scrollY]);
  return (
    <AnimatePresence>
      {show && !bookingOpen && (
        <m.a
          href={site.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Nhắn Zalo ${site.zaloNumber}`}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex min-h-14 items-center gap-2 rounded-full bg-[#0068ff] px-5 font-semibold text-white shadow-[0_10px_30px_-8px_rgb(0_104_255/.6)] md:hidden"
        >
          <MessageCircle size={22} aria-hidden /> Zalo
        </m.a>
      )}
    </AnimatePresence>
  );
}
