"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useApp } from "./AppContext";

const BookingModal = dynamic(() => import("./BookingModal").then((mod) => mod.BookingModal), { ssr: false });

/** Chỉ tải mã của modal khi người dùng mở lần đầu, để trang đầu nhẹ hơn. */
export function BookingModalLazy() {
  const { bookingOpen } = useApp();
  const [needed, setNeeded] = useState(false);
  useEffect(() => { if (bookingOpen) setNeeded(true); }, [bookingOpen]);
  return needed ? <BookingModal /> : null;
}
