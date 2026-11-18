"use client";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Audience, CaseId } from "@/content/types";

export type Prefill = { role?: Audience; grade?: string; cases?: CaseId[]; fromDiagnostic?: boolean };

type Ctx = {
  audience: Audience;
  setAudience: (a: Audience) => void;
  bookingOpen: boolean;
  prefill: Prefill;
  openBooking: (p?: Prefill) => void;
  closeBooking: () => void;
  /** Kết quả công cụ tự kiểm tra, chỉ giữ trong bộ nhớ của tab, không lưu. */
  diagnostic: Prefill | null;
  setDiagnostic: (p: Prefill | null) => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>("parent");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [prefill, setPrefill] = useState<Prefill>({});
  const [diagnostic, setDiagnostic] = useState<Prefill | null>(null);

  const openBooking = useCallback(
    (p?: Prefill) => {
      setPrefill(p ?? diagnostic ?? {});
      setBookingOpen(true);
    },
    [diagnostic],
  );
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  const value = useMemo(
    () => ({ audience, setAudience, bookingOpen, prefill, openBooking, closeBooking, diagnostic, setDiagnostic }),
    [audience, bookingOpen, prefill, openBooking, closeBooking, diagnostic],
  );
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp must be used within AppProvider");
  return c;
}
