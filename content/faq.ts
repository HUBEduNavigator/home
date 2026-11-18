import { site } from "./site";

export const faq: { q: string; a: string }[] = [
  {
    q: "Có cam kết tăng điểm không?",
    a: "Không. Điểm số phụ thuộc vào nhiều yếu tố, trong đó có công sức của chính con, nên không ai cam kết trước được. Điều HUB cam kết là: nói thật với ba mẹ chỗ con đang nghẽn, xây kế hoạch sát với năng lực thực tế của con, cập nhật đều những gì con làm được, và nói thẳng, kể cả dừng lại, nếu thấy cách này chưa phù hợp với con.",
  },
  {
    q: "Con mất gốc nhiều môn thì bắt đầu từ đâu?",
    a: "HUB không bắt con học lại toàn bộ sách giáo khoa của các năm trước. Qua buổi chẩn đoán, HUB tìm xem phần kiến thức nào của lớp dưới đang trực tiếp cản bài học hiện tại, và xử lý phần đó trước. Sau đó con ôn dần theo nhịp của mình, từ phần cơ bản lên phần khó hơn.",
  },
  {
    q: "Con học online hay trực tiếp?",
    a: site.deliveryMode ?? "Hình thức học (online hay trực tiếp) và khu vực hoạt động sẽ được trao đổi khi tư vấn. Ba mẹ nhắn Zalo để HUB báo lại cụ thể.", // TODO: HUB điền
  },
  {
    q: "Bao lâu thì thấy thay đổi?",
    a: "Thay đổi nhỏ thường thấy trước điểm số: con tự lập được lịch cho một tuần, tự giải thích lại được bài vừa học. Điểm số cải thiện chậm hơn và khác nhau ở từng em, nên HUB không hứa một mốc thời gian cụ thể. Sau tuần đầu của kế hoạch 4 tuần, HUB và con sẽ cùng xem lại những gì đã đổi.",
  },
  {
    q: "Cho con dùng AI sớm có khiến con lười suy nghĩ không?",
    a: "Chỉ khi con dùng AI để lấy đáp án rồi chép. Ở EduNavigator, con học dùng AI theo cách ngược lại: bảo AI hỏi gợi ý, chỉ ra chỗ sai mà không giải hộ, rồi tự viết lại lời giải bằng lời của mình. Con phải tự suy nghĩ thì mới đối thoại được với AI, và luôn phải kiểm chứng vì AI có thể sai.",
  },
  {
    q: "Phụ huynh tham gia thế nào?",
    a: "Ba mẹ kể bối cảnh ở buổi chẩn đoán, nhận bản chẩn đoán và kế hoạch, rồi nhận cập nhật ngắn sau mỗi tuần. Ba mẹ không phải ngồi kèm con. Việc ba mẹ giúp được nhiều nhất là hỏi con những câu hỏi mở và không so sánh con với bạn khác.",
  },
  {
    q: "Con không thích học thì sao?",
    a: "Chuyện này rất thường gặp, và thường có lý do: sợ sai, mệt vì học không hiệu quả, hoặc thấy mình thua bạn. HUB bắt đầu bằng việc nghe con nói, không bằng việc ép học. Nếu con chưa muốn tham gia, HUB sẽ nói thẳng với ba mẹ là nên chờ thêm.",
  },
  {
    q: "Cấp tiểu học có nhận học sinh các lớp nhỏ hơn không?",
    a: "Chưa. Ở cấp tiểu học, EduNavigator chỉ nhận học sinh lớp 5, vì trọng tâm là chuẩn bị tư duy và cách học cho bước chuyển lên THCS.",
  },
  {
    q: "Dữ liệu của con có bị lưu không?",
    a: "Không. Web này không có máy chủ và không lưu câu trả lời hay thông tin liên hệ. Thông tin chỉ được gửi đi khi ba mẹ hoặc bạn tự bấm gửi qua Zalo.",
  },
];
