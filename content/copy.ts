import type { Dual } from "./types";

export const hero = {
  eyebrow: { parent: "Dành cho ba mẹ", student: "Dành cho bạn" } as Dual,
  title: {
    parent: "Con học nhiều mà chưa khá lên? Bắt đầu bằng việc tìm ra con đang kẹt ở đâu.",
    student: "Học mãi mà vẫn thấy đuối? Mình cùng tìm xem bạn đang kẹt ở đâu.",
  } as Dual,
  sub: {
    parent:
      "EduNavigator là mentor định hướng tự học. HUB không dạy lại từng môn và không luyện đề cho con. HUB lắng nghe, chẩn đoán chỗ con đang hổng, dựng cách tự học riêng cho con, rồi đồng hành cho tới khi con tự học được.",
    student:
      "Ở đây không có bài giảng thêm hay đề chồng đề. Bạn sẽ nói chuyện với một người biết lắng nghe, cùng tìm ra chỗ bạn đang hổng, dựng cách tự học hợp với bạn, và biết dùng AI để hiểu bài thay vì chép bài.",
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
      "Chín hoặc mười câu hỏi về những điều ba mẹ có thể quan sát được ở con. Cuối bài ba mẹ nhận được 3 việc làm tại nhà trong tuần này, miễn phí, dù có đăng ký hay không.",
    student:
      "Chín hoặc mười câu hỏi về những điều bạn tự quan sát được ở mình. Cuối bài bạn nhận được 3 việc làm tại nhà trong tuần này, miễn phí, dù có đăng ký hay không.",
  } as Dual,
  privacy: "Câu trả lời chỉ nằm trên máy bạn. Web không lưu và không gửi đi đâu.",
};
