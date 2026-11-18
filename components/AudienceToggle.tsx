"use client";
import { useApp } from "./AppContext";
import { toggle } from "@/content/copy";

/** Công tắc hai lựa chọn, nền trượt bằng CSS transform (không tốn layout). */
export function AudienceToggle({ className = "" }: { className?: string }) {
  const { audience, setAudience } = useApp();
  const opts = [
    { v: "parent" as const, label: toggle.parent },
    { v: "student" as const, label: toggle.student },
  ];
  const onKey = (e: React.KeyboardEvent) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      const next = audience === "parent" ? "student" : "parent";
      setAudience(next);
      (e.currentTarget.querySelector(`[data-v="${next}"]`) as HTMLElement | null)?.focus();
    }
  };
  return (
    <div role="radiogroup" aria-label={toggle.label} onKeyDown={onKey}
      className={`relative inline-grid grid-cols-2 rounded-full border border-line bg-surface p-1 ${className}`}>
      <span aria-hidden
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-navy shadow-sm transition-transform duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ transform: audience === "student" ? "translateX(100%)" : "translateX(0)" }} />
      {opts.map((o) => (
        <button
          key={o.v}
          data-v={o.v}
          role="radio"
          aria-checked={audience === o.v}
          tabIndex={audience === o.v ? 0 : -1}
          onClick={() => setAudience(o.v)}
          className={`relative min-h-11 whitespace-nowrap rounded-full px-4 text-[0.95rem] font-semibold transition-colors duration-300 ${audience === o.v ? "text-white" : "text-ink hover:text-accenttext"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
