"use client";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, ClipboardCopy, MessageCircle, Phone, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cases, caseById } from "@/content/cases";
import { site } from "@/content/site";
import type { Audience, CaseId } from "@/content/types";
import { useApp, type Prefill } from "./AppContext";
import { EASE } from "./motion";

const GRADES: Record<string, string> = { "5": "Lớp 5", thcs: "THCS (lớp 6–9)", thpt: "THPT (lớp 10–12)" };
const LABELS = ["Người đặt", "Lớp", "Vấn đề chính", "Khung giờ", "Liên hệ", "Đồng ý", "Tóm tắt"];
const LAST = LABELS.length - 1;
const phoneOk = (v: string) => /^(0|\+84)\d{9}$/.test(v.replace(/[\s.\-]/g, ""));

type State = { role: Audience | ""; grade: string; cases: CaseId[]; slots: string[]; name: string; phone: string; consent: boolean };

export function BookingModal() {
  const { bookingOpen, closeBooking, prefill } = useApp();
  return (
    <AnimatePresence>
      {bookingOpen && <Dialog key="booking" prefill={prefill} onClose={closeBooking} />}
    </AnimatePresence>
  );
}

async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const t = document.createElement("textarea"); t.value = text; t.style.position = "fixed"; t.style.opacity = "0";
    document.body.appendChild(t); t.select();
    const ok = document.execCommand("copy"); t.remove(); return ok;
  }
}

function Dialog({ prefill, onClose }: { prefill: Prefill; onClose: () => void }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [s, setS] = useState<State>({ role: prefill.role ?? "", grade: prefill.grade ?? "", cases: prefill.cases ?? [], slots: [], name: "", phone: "", consent: false });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const focusStep = () => bodyRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });

  // Khoá cuộn nền, trả lại focus khi đóng
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${sw}px`;
    requestAnimationFrame(() => focusStep());
    return () => { document.body.style.overflow = ""; document.body.style.paddingRight = ""; prev?.focus?.(); };
  }, []);


  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.stopPropagation(); onClose(); return; }
    if (e.key !== "Tab") return;
    const els = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])');
    if (!els?.length) return;
    const first = els[0], last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }, [onClose]);

  const summary = [
    "Xin chào HUB, mình muốn đặt lịch chẩn đoán miễn phí.",
    `- Người đặt: ${s.role === "parent" ? "Phụ huynh" : "Học sinh"}`,
    `- Lớp: ${GRADES[s.grade] ?? ""}`,
    `- Vấn đề chính: ${s.cases.map((c) => caseById[c].title).join("; ") || "Chưa rõ, mong được tư vấn"}`,
    `- Khung giờ tiện liên hệ: ${s.slots.join(", ") || "Bất kỳ"}`,
    `- Tên: ${s.name.trim()}`,
    `- Số điện thoại: ${s.phone.trim()}`,
    "(Gửi từ web EduNavigator)",
  ].join("\n");

  const sendZalo = async () => {
    const ok = await copyText(summary);
    setMsg(ok ? "Đã sao chép tin nhắn. Khi Zalo mở ra, hãy dán tin nhắn vào khung chat (nhấn giữ rồi chọn Dán)." : "Không sao chép được tự động. Hãy chọn và sao chép nội dung ở trên, rồi dán vào Zalo.");
    window.open(site.zaloUrl, "_blank", "noopener,noreferrer");
  };
  const copyOnly = async () => setMsg((await copyText(summary)) ? "Đã sao chép thông tin." : "Không sao chép được, hãy chọn nội dung và sao chép thủ công.");
  const submitForm = async () => {
    try {
      const r = await fetch(site.FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...s, summary }) });
      setMsg(r.ok ? "Đã gửi. HUB sẽ liên hệ lại." : "Gửi không thành công, hãy thử gửi qua Zalo.");
    } catch { setMsg("Gửi không thành công, hãy thử gửi qua Zalo."); }
  };

  const fail = (text: string) => { setErr(text); setShake((n) => n + 1); };
  const goTo = (n: number) => { setErr(""); setMsg(""); setDir(n > step ? 1 : -1); setStep(n); bodyRef.current?.scrollTo({ top: 0 }); };
  const next = (st: State = s) => {
    if (step === 0 && !st.role) return fail("Hãy chọn một đáp án.");
    if (step === 1 && !st.grade) return fail("Hãy chọn lớp.");
    if (step === 4) {
      if (st.name.trim().length < 2) return fail("Hãy nhập tên để HUB biết cách xưng hô.");
      if (!phoneOk(st.phone)) return fail("Số điện thoại chưa đúng, ví dụ 0912345678.");
    }
    if (step === 5 && !st.consent) return fail("Hãy đồng ý để HUB liên hệ thì mới tiếp tục được.");
    goTo(step + 1);
  };
  /** Bước chọn một đáp án: chọn xong tự sang bước sau. */
  const pickOne = (patch: Partial<State>) => {
    const st = { ...s, ...patch };
    setS(st);
    window.setTimeout(() => next(st), reduce ? 0 : 220);
  };

  const choice = (active: boolean) =>
    `flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border-2 px-5 py-3 text-left font-medium transition-[border-color,background-color,transform] duration-200 active:scale-[.99] ${active ? "border-accent bg-accent/15" : "border-line hover:border-ink/60 hover:bg-surface2"}`;
  const tick = (on: boolean, square = false) => (
    <span aria-hidden className={`grid size-6 shrink-0 place-items-center border-2 transition-colors ${square ? "rounded-md" : "rounded-full"} ${on ? "border-accent bg-accent text-accentink" : "border-line"}`}>
      {on && <Check size={14} strokeWidth={3} />}
    </span>
  );
  const toggleIn = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const who = s.role === "parent" ? "ba mẹ" : "bạn";

  return (
    <m.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 backdrop-blur-[2px] sm:items-center sm:p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <m.div
        ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="bk-title" onKeyDown={onKey}
        initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        className="flex max-h-[92dvh] w-full max-w-xl flex-col rounded-t-3xl bg-bg p-5 shadow-2xl sm:rounded-3xl sm:p-7"
      >
        <div aria-hidden className="mx-auto -mt-2 mb-3 h-1.5 w-10 rounded-full bg-line sm:hidden" />
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 id="bk-title" className="text-balance text-2xl font-semibold">Đặt lịch chẩn đoán miễn phí</h2>
            <p className="text-sm text-muted" aria-live="polite">Bước {step + 1}/{LABELS.length}: {LABELS[step]}</p>
          </div>
          <button aria-label="Đóng" onClick={onClose} className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-colors hover:bg-surface2"><X aria-hidden /></button>
        </div>
        <div className="mt-3 flex gap-1" aria-hidden>
          {LABELS.map((l, i) => (
            <span key={l} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
              <span className="block h-full origin-left rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{ transform: `scaleX(${i <= step ? 1 : 0})` }} />
            </span>
          ))}
        </div>

        <div ref={bodyRef} className="relative mt-5 min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-0.5 pb-1">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <m.div
              key={step}
              custom={dir}
              variants={{ enter: (d: number) => ({ opacity: 0, x: 28 * d }), center: { opacity: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, x: -28 * d }) }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.24, ease: EASE }}
              onAnimationComplete={(def) => def === "center" && focusStep()}
            >
              {step === 0 && (
                <fieldset><legend className="mb-3 text-lg font-semibold">Ai là người đặt lịch?</legend>
                  <div className="grid gap-3">
                    {([["parent", "Tôi là phụ huynh"], ["student", "Tôi là học sinh"]] as const).map(([v, l], i) => (
                      <button key={v} data-autofocus={i === 0 ? "" : undefined} aria-pressed={s.role === v} className={choice(s.role === v)} onClick={() => pickOne({ role: v })}>{l}{tick(s.role === v)}</button>
                    ))}
                  </div>
                </fieldset>)}
              {step === 1 && (
                <fieldset><legend className="mb-3 text-lg font-semibold">{s.role === "parent" ? "Con đang học lớp mấy?" : "Bạn đang học lớp mấy?"}</legend>
                  <div className="grid gap-3">
                    {Object.entries(GRADES).map(([v, l], i) => (
                      <button key={v} data-autofocus={i === 0 ? "" : undefined} aria-pressed={s.grade === v} className={choice(s.grade === v)} onClick={() => pickOne({ grade: v })}>{l}{tick(s.grade === v)}</button>
                    ))}
                  </div>
                </fieldset>)}
              {step === 2 && (
                <fieldset><legend className="text-lg font-semibold">Vấn đề chính (chọn một hoặc nhiều)</legend>
                  {prefill.fromDiagnostic && <p className="mt-1 text-sm text-ok">Đã điền theo kết quả tự kiểm tra của {who}. Có thể sửa lại.</p>}
                  <div className="mt-3 grid gap-3">
                    {cases.map((c, i) => {
                      const on = s.cases.includes(c.id);
                      return <button key={c.id} data-autofocus={i === 0 ? "" : undefined} aria-pressed={on} className={choice(on)} onClick={() => setS({ ...s, cases: toggleIn(s.cases, c.id) })}>{c.title}{tick(on, true)}</button>;
                    })}
                  </div>
                  <p className="mt-2 text-sm text-muted">Chưa chắc? Cứ bỏ trống, HUB sẽ tư vấn.</p>
                </fieldset>)}
              {step === 3 && (
                <fieldset><legend className="mb-3 text-lg font-semibold">Khung giờ nào tiện để HUB liên hệ?</legend>
                  <div className="grid gap-3">
                    {site.contactSlots.map((v, i) => {
                      const on = s.slots.includes(v);
                      return <button key={v} data-autofocus={i === 0 ? "" : undefined} aria-pressed={on} className={choice(on)} onClick={() => setS({ ...s, slots: toggleIn(s.slots, v) })}>{v}{tick(on, true)}</button>;
                    })}
                  </div>
                </fieldset>)}
              {step === 4 && (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
                  <label className="block font-semibold">Tên của {who}
                    <input data-autofocus value={s.name} onChange={(e) => setS({ ...s, name: e.target.value })} autoComplete="name" enterKeyHint="next"
                      className="mt-1 min-h-12 w-full rounded-xl border-2 border-line bg-surface px-4 font-normal transition-colors focus:border-accent focus:outline-none" />
                  </label>
                  <label className="block font-semibold">Số điện thoại
                    <input value={s.phone} onChange={(e) => setS({ ...s, phone: e.target.value })} inputMode="tel" type="tel" autoComplete="tel" placeholder="0912 345 678" enterKeyHint="done"
                      aria-invalid={s.phone.length > 0 && !phoneOk(s.phone)}
                      className="mt-1 min-h-12 w-full rounded-xl border-2 border-line bg-surface px-4 font-normal transition-colors focus:border-accent focus:outline-none" />
                  </label>
                  <button type="submit" hidden />
                </form>)}
              {step === 5 && (
                <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-colors ${s.consent ? "border-accent bg-accent/10" : "border-line"}`}>
                  <input data-autofocus type="checkbox" checked={s.consent} onChange={(e) => setS({ ...s, consent: e.target.checked })} className="mt-1 size-6 shrink-0 accent-[var(--accent)]" />
                  <span>Tôi đồng ý để HUB liên hệ lại qua số điện thoại/Zalo ở trên để trao đổi về buổi chẩn đoán. Web này không lưu thông tin, thông tin chỉ được gửi khi tôi tự bấm gửi.</span>
                </label>)}
              {step === LAST && (
                <div>
                  <p className="font-semibold">Kiểm tra lại thông tin rồi chọn cách gửi:</p>
                  <pre className="mt-2 max-h-52 overflow-auto whitespace-pre-wrap rounded-xl border border-line bg-surface2 p-4 font-sans text-[0.95rem]">{summary}</pre>
                  <div className="mt-4 grid gap-3">
                    <button data-autofocus className="btn btn-primary" onClick={sendZalo}><MessageCircle size={18} aria-hidden /> Gửi qua Zalo</button>
                    <a className="btn btn-ghost" href={site.telUrl}><Phone size={18} aria-hidden /> Gọi ngay {site.zaloNumber}</a>
                    <button className="btn btn-ghost" onClick={copyOnly}><ClipboardCopy size={18} aria-hidden /> Sao chép thông tin</button>
                    {site.FORM_ENDPOINT && <button className="btn btn-ghost" onClick={submitForm}><Send size={18} aria-hidden /> Gửi qua biểu mẫu</button>}
                  </div>
                  <AnimatePresence>
                    {msg && (
                      <m.p key={msg} role="status" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="mt-3 flex items-start gap-2 rounded-xl bg-ok/10 p-3 font-medium text-ok">
                        <Check size={18} className="mt-0.5 shrink-0" aria-hidden /> {msg}
                      </m.p>
                    )}
                  </AnimatePresence>
                </div>)}
            </m.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {err && (
            <m.p key={shake} role="alert" className="mt-3 font-medium text-red-700 dark:text-red-300"
              initial={{ opacity: 0, x: 0 }} animate={{ opacity: 1, x: reduce ? 0 : [0, -6, 6, -4, 4, 0] }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              {err}
            </m.p>
          )}
        </AnimatePresence>
        {step < LAST ? (
          <div className="mt-5 flex items-center justify-between gap-3">
            <button className="inline-flex min-h-12 items-center gap-2 px-2 text-muted underline-offset-4 hover:underline disabled:invisible" disabled={step === 0} onClick={() => goTo(step - 1)}>
              <ArrowLeft size={16} aria-hidden /> Quay lại
            </button>
            <button className="btn btn-primary group" onClick={() => next()}>
              {step === LAST - 1 ? "Xem tóm tắt" : "Tiếp tục"} <ArrowRight size={18} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        ) : (
          <button className="mt-4 inline-flex min-h-12 items-center gap-2 self-start px-2 text-muted underline-offset-4 hover:underline" onClick={() => goTo(0)}>
            <ArrowLeft size={16} aria-hidden /> Sửa thông tin
          </button>
        )}
      </m.div>
    </m.div>
  );
}
