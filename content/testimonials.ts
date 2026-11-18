/**
 * Phần "Cảm nhận" ẩn cho tới khi có cảm nhận thật kèm sự đồng ý của người viết.
 * Thêm phần tử vào mảng là phần này tự hiện.
 * { quote: "…", who: "Phụ huynh của em lớp 8", consent: true }
 */
export type Testimonial = { quote: string; who: string; consent: true };
export const testimonials: Testimonial[] = [];
