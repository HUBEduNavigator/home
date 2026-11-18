"use client";
import { Gauge, Layers, Repeat2, SearchX, Sprout } from "lucide-react";
import { cases } from "@/content/cases";
import { useApp } from "./AppContext";

const icons = { pressure: Gauge, gaps: Layers, inefficient: Repeat2, nomentor: SearchX, grade5: Sprout };

export function Situations() {
  const { audience, openBooking } = useApp();
  return (
    <section id="khi-nao" className="section bg-surface2">
      <div className="container-x">
        <p className="eyebrow">Khi nào bạn cần chúng tôi</p>
        <h2 className="h2 mt-2">Năm tình huống thường gặp nhất</h2>
        <p className="lead mt-3">
          Nếu một trong các đoạn dưới đây giống {audience === "parent" ? "con của ba mẹ" : "bạn"}, rất có thể EduNavigator giúp được.
        </p>
        <ul className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => {
            const Icon = icons[c.id];
            return (
              <li key={c.id} className="card flex flex-col p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-navy text-accent"><Icon size={22} aria-hidden /></span>
                <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
                <p className="mt-3">{c.situation[audience]}</p>
                <p className="mt-4 border-t border-line pt-4 text-muted">
                  <strong className="text-ink">EduNavigator làm gì: </strong>
                  {c.handling}
                </p>
                <button
                  className="mt-auto pt-4 text-left font-semibold text-accenttext underline underline-offset-4"
                  onClick={() => openBooking({ role: audience, cases: [c.id] })}
                >
                  Đặt lịch cho tình huống này
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
