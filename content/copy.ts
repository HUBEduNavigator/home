import type { Dual } from "./types";

export const hero = {
  eyebrow: { parent: "Dành cho ba mẹ", student: "Dành cho bạn" } as Dual,
  title: {
    parent: "Con học nhiều mà kết quả vẫn đứng yên? Hãy bắt đầu bằng việc tìm đúng gốc của vấn đề.",
    student: "Học nhiều mà vẫn mông lung? Cùng tìm đúng chỗ đang nghẽn.",
  } as Dual,
  sub: {
    parent:
      "EduNavigator không giảng lại bài trên lớp và không luyện đề máy móc. HUB lắng nghe con, chẩn đoán chỗ hổng kiến thức và cách học chưa phù hợp, dựng chiến lược tự học riêng cho con, rồi đồng hành cho tới khi con tự học được, kể cả khi dùng AI.",
    student:
      "Ở đây không ai nhồi thêm kiến thức hay giải bài hộ bạn. HUB lắng nghe khó khăn thật của bạn, cùng bạn khoanh vùng phần nền đang hổng, dựng cách tự học hợp với bạn và hướng dẫn dùng AI đúng cách để hiểu bài thay vì chép bài.",
  } as Dual,
  ctaBook: "Đặt lịch chẩn đoán miễn phí",
  ctaTest: "Tự kiểm tra trong 3 phút",
};

export const toggle = {
  label: "Bạn đang xem trang này với tư cách",
  parent: "Tôi là phụ huynh",
  student: "Tôi là học sinh",
};

export const diagnosticIntro = {
  title: "Tự kiểm tra trong 3 phút",
  sub: {
    parent:
      "Chín hoặc mười câu hỏi về những biểu hiện ba mẹ có thể quan sát được ở con. Cuối bài, ba mẹ nhận được 3 việc có thể làm tại nhà ngay trong tuần này, miễn phí, dù có đăng ký hay không.",
    student:
      "Chín hoặc mười câu hỏi về những biểu hiện bạn tự quan sát được ở mình. Cuối bài, bạn nhận được 3 việc có thể làm ngay trong tuần này, miễn phí, dù có đăng ký hay không.",
  } as Dual,
  privacy: "Câu trả lời chỉ được xử lý ngay trên máy bạn. Web không lưu và không gửi đi đâu.",
};
