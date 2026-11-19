import type { Dual } from "./types";

export const hero = {
  eyebrow: { parent: "Dành cho ba mẹ", student: "Dành cho bạn" } as Dual,
  title: {
    parent: "Con học nhiều nhưng chưa tiến bộ? Hãy bắt đầu từ 1–2 buổi định hướng lại cách tự học.",
    student: "Học nhiều mà vẫn mất phương hướng? Chỉ cần 1–2 buổi để xác định lại cách tự học.",
  } as Dual,
  sub: {
    parent:
      "EduNavigator không phải gia sư dạy kèm dài hạn và không giảng lại kiến thức từng môn. Trong 1–2 buổi gặp mặt, HUB lắng nghe, chỉ rõ điểm nghẽn của con, trao tư duy và cách tự học hiệu quả, rồi hướng dẫn con chọn đúng bộ tài liệu phù hợp trên web tài liệu do HUB phân tích và tổng hợp.",
    student:
      "EduNavigator không dạy kèm dài kỳ và không giải bài hộ bạn. Trong 1–2 buổi gặp mặt, HUB lắng nghe khó khăn thật của bạn, định hướng lại tư duy và cách tự học, rồi chỉ bạn cách chọn đúng bộ tài liệu dạng bài trên web tài liệu để tự bứt phá.",
  } as Dual,
  ctaBook: "Đặt lịch gặp mặt định hướng",
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
      "Chín câu hỏi về những biểu hiện ba mẹ có thể quan sát được ở con. Cuối bài, ba mẹ nhận được 3 việc có thể làm tại nhà ngay trong tuần này, miễn phí, dù có đăng ký hay không.",
    student:
      "Chín câu hỏi về những biểu hiện bạn tự quan sát được ở mình. Cuối bài, bạn nhận được 3 việc có thể làm ngay trong tuần này, miễn phí, dù có đăng ký hay không.",
  } as Dual,
  privacy: "Câu trả lời chỉ được xử lý ngay trên máy bạn. Web không lưu và không gửi đi đâu.",
};
