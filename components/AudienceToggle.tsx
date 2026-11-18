"use client";
import { useApp } from "./AppContext";
import { toggle } from "@/content/copy";

export function AudienceToggle({ className = "" }: { className?: string }) {
  const { audience, setAudience } = useApp();
  const opts = [
    { v: "parent" as const, label: toggle.parent },
    { v: "student" as const, label: toggle.student },
  ];
  return (
    <div role="radiogroup" aria-label={toggle.label} className={`inline-flex rounded-full border border-line bg-surface p-1 ${className}`}>
      {opts.map((o) => (
        <button
          key={o.v}
          role="radio"
          aria-checked={audience === o.v}
          onClick={() => setAudience(o.v)}
          className={`min-h-11 rounded-full px-4 text-[0.95rem] font-semibold transition-colors ${
            audience === o.v ? "bg-navy text-white" : "text-ink hover:bg-surface2"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
