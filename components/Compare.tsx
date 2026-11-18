"use client";
import { compareNote, compareRows } from "@/content/compare";
import { Reveal, SectionHead, Stagger, StaggerItem } from "./motion";

export function Compare() {
  return (
    <section id="so-sanh" className="section bg-surface2">
      <div className="container-x">
        <SectionHead eyebrow="Mentor khác gia sư thế nào" title="Hai vai trò khác nhau, mỗi vai trò hợp với một tình huống" />

        {/* Bảng trên màn rộng */}
        <Reveal className="card mt-8 hidden overflow-hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">So sánh gia sư truyền thống và mentor định hướng tự học</caption>
            <thead>
              <tr className="bg-navy text-white">
                <th scope="col" className="w-48 p-4"><span className="sr-only">Tiêu chí</span></th>
                <th scope="col" className="p-4 font-semibold">Gia sư truyền thống</th>
                <th scope="col" className="p-4 font-semibold"><span className="text-accent">Mentor</span> EduNavigator</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((r) => (
                <tr key={r.label} className="border-t border-line align-top transition-colors hover:bg-surface2/60">
                  <th scope="row" className="p-4 font-semibold">{r.label}</th>
                  <td className="p-4 text-muted">{r.tutor}</td>
                  <td className="border-l-2 border-accent/40 p-4">{r.mentor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Thẻ trên điện thoại */}
        <Stagger className="mt-8 space-y-4 md:hidden" gap={0.05}>
          {compareRows.map((r) => (
            <StaggerItem key={r.label} className="card p-5">
              <p className="font-display text-lg font-semibold">{r.label}</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-muted">Gia sư truyền thống</p>
              <p className="text-muted">{r.tutor}</p>
              <div className="mt-3 border-l-2 border-accent pl-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-accenttext">Mentor EduNavigator</p>
                <p>{r.mentor}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal><p className="mt-6 max-w-3xl text-muted">{compareNote}</p></Reveal>
      </div>
    </section>
  );
}
