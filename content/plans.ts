/** `price: null` = TODO, UI hiện "Liên hệ để được tư vấn". */
export const plans = [
  {
    id: "g5",
    name: "Lớp 5",
    tag: "Chuẩn bị lên THCS · Cấp tiểu học chỉ nhận lớp 5",
    focus: [
      "Hình thành thói quen tự học: ghi chép, quản lý thời gian, tự lập kế hoạch bài vở trước khi lên THCS",
      "Tập nhận ra mình chưa hiểu chỗ nào và chủ động đặt câu hỏi",
      "Bước đầu làm quen với cách dùng AI an toàn, có hướng dẫn",
    ],
    price: null as string | null,
  },
  {
    id: "thcs",
    name: "THCS",
    tag: "Lớp 6–9",
    focus: [
      "Khoanh vùng và lấp chỗ hổng kiến thức gốc, dựng cách tự học riêng cho từng môn",
      "Giảm áp lực so sánh với bạn bè, lấy lại sự tự tin với việc học",
      "Lớp 9: lập chiến lược ôn thi vào lớp 10",
    ],
    price: null as string | null,
  },
  {
    id: "thpt",
    name: "THPT",
    tag: "Lớp 10–12",
    focus: [
      "Tự lập và quản lý kế hoạch học theo tổ hợp môn đã chọn",
      "Dùng AI để tự nghiên cứu, phân tích dạng bài khó và tự kiểm tra, không để chép bài",
      "Lớp 12: lập chiến lược ôn thi tốt nghiệp THPT",
    ],
    price: null as string | null,
  },
];
