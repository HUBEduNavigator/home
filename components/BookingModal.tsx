"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, ClipboardCopy, MessageCircle, Phone, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cases, caseById } from "@/content/cases";
import { site } from "@/content/site";
import type { Audience, CaseId } from "@/content/types";
import { useApp } from "./AppContext";

const GRADES: Record<string, string> = { "5": "Lớp 5", thcs: "THCS (lớp 6–9)", thpt: "THPT (lớp 10–12)" };
const phoneOk = (v: string) => /^(0|\+84)\d{9}$/.test(v.replace(/[\s.\-]/g, ""));

type State = { role: Audience | ""; grade: string; cases: CaseId[]; slots: string[]; name: string; phone: string; consent: boolean };

export function BookingModal() {
  const { bookingOpen, closeBooking, prefill } = useApp();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [s, setS] = useState<State>({ role: "", grade: "", cases: [], slots: [], name: "", phone: "", consent: false });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!bookingOpen) return;
    lastFocus.current = document.activeElement as HTMLElement;
    setStep(0); setMsg(""); setErr("");
    setS({ role: prefill.role ?? "", grade: prefill.grade ?? "", cases: prefill.cases ?? [], slots: [], name: "", phone: "", consent: false });
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus());
    return () => { document.body.style.overflow = ""; lastFocus.current?.focus(); };
  }, [bookingOpen, prefill]);

  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") { closeBooking(); return; }
    if (e.key !== "Tab") return;
    const els = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])');
    if (!els?.length) return;
    const first = els[0], last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }, [closeBooking]);

  const summary = [
    "Xin chào HUB, mình muốn đặt lịch chẩn đoán miễn phí.",
    `- Người đặt: ${s.role === "parent" ? "Phụ huynh" : "Học sinh"}`,
    `- Lớp: ${GRADES[s.grade] ?? ""}`,
    `- Vấn đề chính: ${s.cases.map((c) => caseById[c].title).join("; ") || "Chưa rõ, mong được tư vấn"}`,
    `- Khung giờ tiện liên hệ: ${s.slots.join(", ") || "Bất kỳ"}`,
    `- Tên: ${s.name}`,
    `- Số điện thoại: ${s.phone}`,
    "(Gửi từ web EduNavigator)",
  ].join("\n");

  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); return true; } catch {
      const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select();
      const ok = document.execCommand("copy"); t.remove(); return ok;
    }
  };
  const sendZalo = async () => {
    const ok = await copy(summary);
    setMsg(ok ? "Đã sao chép tin nhắn. Khi Zalo mở ra, hãy dán tin nhắn vào khung chat (nhấn giữ rồi chọn Dán)." : "Không sao chép được tự động. Hãy chọn và sao chép nội dung ở trên, rồi dán vào Zalo.");
    window.open(site.zaloUrl, "_blank", "noopener,noreferrer");
  };
  const copyOnly = async () => setMsg((await copy(summary)) ? "Đã sao chép thông tin." : "Không sao chép được, hãy chọn nội dung và sao chép thủ công.");
  const submitForm = async () => {
    try {
      const r = await fetch(site.FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...s, summary }) });
      setMsg(r.ok ? "Đã gửi. HUB sẽ liên hệ lại." : "Gửi không thành công, hãy thử gửi qua Zalo.");
    } catch { setMsg("Gửi không thành công, hãy thử gửi qua Zalo."); }
  };

  const next = () => {
    setErr("");
    if (step === 4) {
      if (s.name.trim().length < 2) return setErr("Hãy nhập tên để HUB biết cách xưng hô.");
      if (!phoneOk(s.phone)) return setErr("Số điện thoại chưa đúng, ví dụ 0912345678.");
    }
    if (step === 5 && !s.consent) return setErr("Hãy đồng ý để HUB liên hệ thì mới tiếp tục được.");
    if (step === 0 && !s.role) return setErr("Hãy chọn một đáp án.");
    if (step === 1 && !s.grade) return setErr("Hãy chọn lớp.");
    setStep(step + 1);
  };

  if (!bookingOpen) return null;
  const labels = ["Người đặt", "Lớp", "Vấn đề chính", "Khung giờ", "Liên hệ", "Đồng ý", "Tóm tắt"];
  const choice = (active: boolean) => `min-h-14 w-full rounded-2xl border-2 px-5 py-3 text-left font-medium transition-colors ${active ? "border-accent bg-surface2" : "border-line hover:border-ink"}`;
  const toggleIn = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && closeBooking()}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="bk-title" onKeyDown={onKey}
        className="flex max-h-[92dvh] w-full max-w-xl flex-col rounded-t-3xl bg-bg p-5 shadow-2xl sm:rounded-3xl sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="bk-title" className="text-2xl font-semibold">Đặt lịch chẩn đoán miễn phí</h2>
            <p className="text-sm text-muted">Bước {Math.min(step + 1, 7)}/7: {labels[step]}</p>
          </div>
          <button aria-label="Đóng" onClick={closeBooking} className="grid size-11 shrink-0 place-items-center rounded-full border border-line"><X aria-hidden /></button>
        </div>

        <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step} initial={{ opacity: 0, x: reduce ? 0 : 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }}>
              {step === 0 && (
                <fieldset><legend className="mb-3 text-lg font-semibold">Ai là người đặt lịch?</legend>
                  <div className="grid gap-3">
                    {([["parent", "Tôi là phụ huynh"], ["student", "Tôi là học sinh"]] as const).map(([v, l], i) => (
                      <button key={v} data-autofocus={i === 0 ? "" : undefined} aria-pressed={s.role === v} className={choice(s.role === v)} onClick={() => setS({ ...s, role: v })}>{l}</button>
                    ))}
                  </div>
                </fieldset>)}
              {step === 1 && (
                <fieldset><legend className="mb-3 text-lg font-semibold">{s.role === "parent" ? "Con đang học lớp mấy?" : "Bạn đang học lớp mấy?"}</legend>
                  <div className="grid gap-3">
                    {Object.entries(GRADES).map(([v, l], i) => (
                      <button key={v} data-autofocus={i === 0 ? "" : undefined} aria-pressed={s.grade === v} className={choice(s.grade === v)} onClick={() => setS({ ...s, grade: v })}>{l}</button>
                    ))}
                  </div>
                </fieldset>)}
              {step === 2 && (
                <fieldset><legend className="text-lg font-semibold">Vấn đề chính (chọn một hoặc nhiều)</legend>
                  {prefill.fromDiagnostic && <p className="mb-3 text-sm text-ok">Đã điền theo kết quả tự kiểm tra của {s.role === "parent" ? "ba mẹ" : "bạn"}. Có thể sửa lại.</p>}
                  <div className="mt-3 grid gap-3">
                    {cases.map((c, i) => (
                      <button key={c.id} data-autofocus={i === 0 ? "" : undefined} aria-pressed={s.cases.includes(c.id)} className={choice(s.cases.includes(c.id))} onClick={() => setS({ ...s, cases: toggleIn(s.cases, c.id) })}>
                        {s.cases.includes(c.id) && <Check size={16} className="mr-1 inline" aria-hidden />}{c.title}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted">Chưa chắc? Cứ bỏ trống, HUB sẽ tư vấn.</p>
                </fieldset>)}
              {step === 3 && (
                <fieldset><legend className="mb-3 text-lg font-semibold">Khung giờ nào tiện để HUB liên hệ?</legend>
                  <div className="grid gap-3">
                    {site.contactSlots.map((v, i) => (
                      <button key={v} data-autofocus={i === 0 ? "" : undefined} aria-pressed={s.slots.includes(v)} className={choice(s.slots.includes(v))} onClick={() => setS({ ...s, slots: toggleIn(s.slots, v) })}>{v}</button>
                    ))}
                  </div>
                </fieldset>)}
              {step === 4 && (
                <div className="space-y-4">
                  <label className="block font-semibold">Tên của {s.role === "parent" ? "ba mẹ" : "bạn"}
                    <input data-autofocus value={s.name} onChange={(e) => setS({ ...s, name: e.target.value })} autoComplete="name" className="mt-1 min-h-12 w-full rounded-xl border-2 border-line bg-surface px-4 font-normal" />
                  </label>
                  <label className="block font-semibold">Số điện thoại
                    <input value={s.phone} onChange={(e) => setS({ ...s, phone: e.target.value })} inputMode="tel" autoComplete="tel" placeholder="0912 345 678" className="mt-1 min-h-12 w-full rounded-xl border-2 border-line bg-surface px-4 font-normal" />
                  </label>
                </div>)}
              {step === 5 && (
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-line p-4">
                  <input data-autofocus type="checkbox" checked={s.consent} onChange={(e) => setS({ ...s, consent: e.target.checked })} className="mt-1 size-6 shrink-0 accent-[var(--navy)]" />
                  <span>Tôi đồng ý để HUB liên hệ lại qua số điện thoại/Zalo ở trên để trao đổi về buổi chẩn đoán. Web này không lưu thông tin, thông tin chỉ được gửi khi tôi tự bấm gửi.</span>
                </label>)}
              {step === 6 && (
                <div>
                  <p className="font-semibold">Kiểm tra lại thông tin rồi chọn cách gửi:</p>
                  <pre className="mt-2 max-h-52 overflow-auto whitespace-pre-wrap rounded-xl bg-surface2 p-4 font-sans text-[0.95rem]">{summary}</pre>
                  <div className="mt-4 grid gap-3">
                    <button data-autofocus className="btn btn-primary" onClick={sendZalo}><MessageCircle size={18} aria-hidden /> Gửi qua Zalo</button>
                    <a className="btn btn-ghost" href={site.telUrl}><Phone size={18} aria-hidden /> Gọi ngay {site.zaloNumber}</a>
                    <button className="btn btn-ghost" onClick={copyOnly}><ClipboardCopy size={18} aria-hidden /> Sao chép thông tin</button>
                    {site.FORM_ENDPOINT && <button className="btn btn-ghost" onClick={submitForm}><Send size={18} aria-hidden /> Gửi qua biểu mẫu</button>}
                  </div>
                  <p role="status" className="mt-3 min-h-6 font-medium text-ok">{msg}</p>
                </div>)}
            </motion.div>
          </AnimatePresence>
        </div>

        {err && <p role="alert" className="mt-3 font-medium text-red-600 dark:text-red-400">{err}</p>}
        {step < 6 && (
          <div className="mt-5 flex items-center justify-between gap-3">
            <button className="inline-flex min-h-12 items-center gap-2 px-2 text-muted underline underline-offset-4 disabled:invisible" disabled={step === 0} onClick={() => { setErr(""); setStep(step - 1); }}>
              <ArrowLeft size={16} aria-hidden /> Quay lại
            </button>
            <button className="btn btn-primary" onClick={next}>Tiếp tục <ArrowRight size={18} aria-hidden /></button>
          </div>
        )}
        {step === 6 && (
          <button className="mt-4 inline-flex min-h-12 items-center gap-2 self-start px-2 text-muted underline underline-offset-4" onClick={() => setStep(0)}>
            <ArrowLeft size={16} aria-hidden /> Sửa thông tin
          </button>
        )}
      </div>
    </div>
  );
}
