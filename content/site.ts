/**
 * CONFIG DUY NHẤT cho thông tin liên hệ và các giá trị chưa chốt.
 * Giá trị `null` = TODO, giao diện sẽ hiện "Liên hệ để được tư vấn".
 */
export const site = {
  name: "HUB EduNavigator",
  short: "EduNavigator",
  slogan: "Định hướng tự học, bứt phá tương lai.",
  description:
    "Cố vấn định hướng phương pháp tự học trong 1–2 buổi gặp mặt, kèm hệ thống tài liệu phân tích dạng bài dành cho học sinh lớp 5, THCS và THPT.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hubedunavigator.github.io/home",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",

  // ---- Liên hệ ----
  zaloNumber: "0346043094",
  zaloUrl: "https://zalo.me/0346043094",
  telUrl: "tel:0346043094",
  bioUrl: "https://huybao2206.github.io/hubcuteee/",
  docsUrl: "https://huybao2206.github.io/edunavigator-tailieu/",

  /** Để trống. Sau này gắn Google Form / Formspree (nhận POST JSON). */
  FORM_ENDPOINT: "",

  // ---- TODO: HUB điền ----
  pricing: null as string | null, // TODO: học phí chung (nếu có)
  serviceArea: null as string | null, // TODO: khu vực hoạt động
  deliveryMode: null as string | null, // TODO: online / trực tiếp

  contactSlots: ["Sáng (8h–11h)", "Chiều (13h–17h)", "Tối (19h–21h)", "Cuối tuần"],
};

export const NEED_CONSULT = "Liên hệ để được tư vấn";
