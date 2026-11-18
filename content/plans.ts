/** `price: null` = TODO, UI hiện "Liên hệ để được tư vấn". */
export const plans = [
  {
    id: "g5",
    name: "Lớp 5",
    tag: "Chuẩn bị lên THCS",
    focus: [
      "Hình thành thói quen tự học: ghi chép, quản lý thời gian, tự soạn lịch bài",
      "Tập hỏi khi chưa hiểu và nói được điều mình chưa hiểu",
      "Làm quen với cách dùng AI an toàn",
    ],
    price: null as string | null,
  },
  {
    id: "thcs",
    name: "THCS",
    tag: "Lớp 6–9",
    focus: [
      "Lấp hổng kiến thức gốc và xây cách tự học riêng",
      "Giảm áp lực so sánh, lấy lại sự tự tin với việc học",
      "Lớp 9: chiến lược ôn thi vào lớp 10",
    ],
    price: null as string | null,
  },
  {
    id: "thpt",
    name: "THPT",
    tag: "Lớp 10–12",
    focus: [
      "Tự lập kế hoạch học theo tổ hợp môn đã chọn",
      "Lớp 12: chiến lược ôn thi tốt nghiệp THPT",
      "Dùng AI để tự nghiên cứu và tự kiểm tra, không để chép bài",
    ],
    price: null as string | null,
  },
];
