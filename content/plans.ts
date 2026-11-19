/** `price: null` → giao diện hiện "Liên hệ để được tư vấn". */
export const plansIntro = {
  eyebrow: "Dành cho ai",
  title: "Định hướng theo 2 cấp học trọng tâm",
  lead: "Cả hai cấp đều làm theo cùng một cách gọn: 1–2 buổi gặp mặt định hướng, rồi hướng dẫn khai thác đúng bộ tài liệu trên web tài liệu của HUB EduNavigator.",
  note: "Dịch vụ gói gọn trong 1–2 buổi gặp mặt định hướng và chỉ dẫn khai thác kho tài liệu phù hợp. Lịch gặp và chi phí sẽ được trao đổi rõ qua Zalo trước khi bắt đầu.",
};

export const plans = [
  {
    id: "thcs",
    name: "THCS",
    tag: "Lớp 6–9",
    focus: [
      "Tìm chỗ hổng kiến thức gốc, gỡ áp lực so sánh với bạn bè, sửa cách học kém hiệu quả",
      "Định hướng cách tự học nắm bản chất, tránh thói quen dùng AI để chép bài",
      "Chỉ cách khai thác tài liệu nền tảng, nâng cao và dạng đề chung để ôn thi vào lớp 10",
    ],
    cta: "Đặt lịch định hướng cho THCS",
    price: null as string | null,
  },
  {
    id: "thpt",
    name: "THPT",
    tag: "Lớp 10–12",
    focus: [
      "Tối ưu cách tự học độc lập và cách chia thời gian theo mục tiêu riêng",
      "Hướng dẫn tự nghiên cứu và dùng AI đúng chỗ cho phần kiến thức chuyên sâu",
      "Chỉ cách khai thác bộ dạng bài chung (Dễ, Trung bình, Khó, Nâng cao) cho kỳ thi tốt nghiệp THPT",
    ],
    cta: "Đặt lịch định hướng cho THPT",
    price: null as string | null,
  },
];
