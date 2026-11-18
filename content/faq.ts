import { site } from "./site";

export const faq: { q: string; a: string }[] = [
  {
    q: "Có cam kết tăng điểm không?",
    a: "Không. Điểm số phụ thuộc vào nhiều thứ, trong đó có công sức của chính con, và không ai cam kết trước được. Điều HUB cam kết là: nói thật với ba mẹ chỗ con đang kẹt, làm đúng theo kế hoạch đã thống nhất, báo cáo đều những gì con làm được, và dừng lại, nói rõ, nếu thấy cách này chưa phù hợp với con.",
  },
  {
    q: "Con học online hay trực tiếp?",
    a: site.deliveryMode ?? "Hình thức học (online hay trực tiếp) và khu vực hoạt động sẽ được trao đổi khi tư vấn. Ba mẹ nhắn Zalo để HUB báo lại cụ thể.", // TODO: HUB điền
  },
  {
    q: "Bao lâu thì thấy thay đổi?",
    a: "Thay đổi nhỏ thường thấy sớm hơn điểm số: con tự lập được lịch cho một tuần, tự giải thích lại được bài vừa học. Điểm số cải thiện chậm hơn và khác nhau ở từng em, nên HUB không hứa một mốc thời gian cụ thể. Sau tuần đầu của kế hoạch 4 tuần, HUB và con sẽ xem lại những gì đã đổi.",
  },
  {
    q: "Phụ huynh tham gia thế nào?",
    a: "Ba mẹ kể bối cảnh ở buổi chẩn đoán, nhận bản chẩn đoán và kế hoạch, và nhận cập nhật ngắn sau mỗi tuần. Ba mẹ không phải ngồi kèm con. Việc ba mẹ làm được nhiều nhất là hỏi con những câu hỏi mở và không so sánh con với bạn khác.",
  },
  {
    q: "Con không thích học thì sao?",
    a: "Đây là chuyện rất thường gặp, và thường có lý do: sợ sai, mệt vì học không hiệu quả, hoặc thấy mình thua bạn. HUB bắt đầu bằng việc nghe con nói, không bằng việc ép học. Nếu con chưa muốn tham gia, HUB sẽ nói thẳng với ba mẹ là nên chờ thêm.",
  },
  {
    q: "Dữ liệu của con có bị lưu không?",
    a: "Không. Web này không có máy chủ và không lưu câu trả lời hay thông tin liên hệ. Thông tin chỉ được gửi đi khi ba mẹ hoặc bạn tự bấm gửi qua Zalo.",
  },
];
