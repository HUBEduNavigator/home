"use client";
import { Check } from "lucide-react";
import { plans } from "@/content/plans";
import { NEED_CONSULT, site } from "@/content/site";
import { useApp } from "./AppContext";
import { Reveal, SectionHead, Stagger, StaggerItem } from "./motion";

export function Plans() {
  const { openBooking } = useApp();
  return (
    <section id="goi" className="section">
      <div className="container-x">
        <SectionHead eyebrow="Dành cho ai và gói dịch vụ" title="Ba nhóm cấp học, mỗi nhóm một trọng tâm" lead="Mỗi giai đoạn cần một cách tiếp cận khác nhau, nên lộ trình được điều chỉnh theo lứa tuổi và mục tiêu học tập của từng cấp." />
        <Stagger className="mt-8 grid gap-5 md:grid-cols-3" gap={0.1}>
          {plans.map((p) => (
            <StaggerItem key={p.id} className="card card-hover flex flex-col p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-accenttext">{p.tag}</p>
              <h3 className="mt-1 text-2xl font-semibold">{p.name}</h3>
              <ul className="mt-4 space-y-2">
                {p.focus.map((f) => (
                  <li key={f} className="flex gap-2"><Check size={18} className="mt-1.5 shrink-0 text-ok" aria-hidden /><span>{f}</span></li>
                ))}
              </ul>
              <p className="mt-auto border-t border-line pt-4 font-semibold">{p.price ?? site.pricing ?? NEED_CONSULT}</p>
              <button className="btn btn-ghost mt-3" onClick={() => openBooking({ grade: p.id === "g5" ? "5" : p.id })}>Đặt lịch chẩn đoán</button>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal><p className="mt-5 text-sm text-muted">Buổi chẩn đoán đầu tiên miễn phí. Lộ trình chi tiết, hình thức học và học phí sẽ được trao đổi rõ ràng với gia đình trước khi bắt đầu.</p></Reveal>
      </div>
    </section>
  );
}
