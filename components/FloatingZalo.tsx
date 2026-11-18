import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function FloatingZalo() {
  return (
    <a
      href={site.zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Nhắn Zalo ${site.zaloNumber}`}
      className="fixed bottom-4 right-4 z-30 flex min-h-14 items-center gap-2 rounded-full bg-[#0068ff] px-5 font-semibold text-white shadow-lg md:hidden"
    >
      <MessageCircle size={22} aria-hidden /> Zalo
    </a>
  );
}
