import type { CaseId, Dual } from "./types";

export type Case = {
  id: CaseId;
  title: string;
  situation: Dual;
  handling: Dual;
};

export const cases: Case[] = [
  {
    id: "pressure",
    title: "Áp lực đồng lứa",
    situation: {
      parent:
        "Con hay nhắc tới thành tích của bạn bè hoặc lịch học thêm dày đặc của các bạn, rồi thu mình lại, nói con kém hơn người ta và dần né tránh việc học.",
      student:
        "Bạn thấy choáng ngợp khi nhìn bạn bè ai cũng đang tiến lên, còn mình thì chưa biết bứt lên từ đâu, và dần mất tự tin.",
    },
    handling: {
      parent:
        "Giúp con tách áp lực so sánh khỏi con đường của riêng mình: xác định mục tiêu vừa sức và cách tự học rõ ràng để con lấy lại tự tin từ chính tiến bộ của mình.",
      student:
        "Cùng bạn nhìn rõ điểm mạnh, điểm yếu của riêng mình và chọn đúng phần tài liệu vừa sức để thấy kết quả thật sớm.",
    },
  },
  {
    id: "gaps",
    title: "Muốn học nhưng hổng kiến thức gốc",
    situation: {
      parent:
        "Con có tinh thần muốn cố gắng, nhưng hổng kiến thức lớp dưới nên nghe giảng bài mới rất khó vào. Gia đình chưa biết nên cho con ôn lại từ đâu.",
      student:
        "Bạn muốn cố gắng, nhưng nghe giảng trên lớp rất khó hiểu vì kiến thức nền bị đứt từ trước. Càng làm bài mới càng rối và nản.",
    },
    handling: {
      parent:
        "Khoanh đúng phần kiến thức nền đang hổng, vạch thứ tự ôn lại ngắn gọn, rồi chỉ con dùng đúng bộ tài liệu nền tảng trên web tài liệu.",
      student:
        "Tìm nhanh những mắt xích nền bạn cần vá trước, rồi chỉ bạn đúng bộ tài liệu nền tảng phù hợp để tự học lại mà không bị lan man.",
    },
  },
  {
    id: "inefficient",
    title: "Học nhiều nhưng hiệu quả thấp",
    situation: {
      parent:
        "Lịch học ở trường và học thêm kín cả tuần, nhưng điểm vẫn đứng yên vì con học thụ động, chưa nắm bản chất dạng bài, hoặc quen dùng AI để tham khảo, chép đáp án đối phó.",
      student:
        "Lịch học ở trường và học thêm kín cả tuần, bạn mệt, nhưng gặp đề đổi cách hỏi một chút là lúng túng vì quen học theo mẫu hoặc chép lời giải có sẵn.",
    },
    handling: {
      parent:
        "Xem lại cách học thực tế của con, chuyển từ học vẹt sang nắm bản chất dạng bài, và hướng dẫn con khai thác kho tài liệu đã phân loại theo dạng bài.",
      student:
        "Định hướng lại cách tiếp cận bài theo bản chất dạng bài, rồi chỉ bạn dùng bộ tài liệu đã khoanh vùng để thời gian học thực sự biến thành hiểu bài.",
    },
  },
  {
    id: "nomentor",
    title: "Cấp 2, cấp 3 khó tìm người kèm lại từ đầu",
    situation: {
      parent:
        "Ở bậc THCS và THPT, rất ít giáo viên hay lớp học thêm nhận dạy lại nền tảng từ đầu, vì đa số chỉ đi tiếp chương trình hiện hành.",
      student:
        "Lên cấp 2, cấp 3 khối lượng bài tăng nhanh, lớp học thêm nào cũng dạy tiếp bài mới nên bạn rất khó tìm chỗ giúp mình dựng lại phần gốc.",
    },
    handling: {
      parent:
        "Không ép con chạy theo bài mới khi gốc chưa vững. HUB định hướng cách tự vá lỗ hổng và chỉ con bộ tài liệu nền tảng, dạng bài phù hợp đúng điểm xuất phát của con.",
      student:
        "Bắt đầu từ đúng trình độ thật của bạn, rồi chỉ cách tự hệ thống lại kiến thức giữa các lớp bằng bộ tài liệu chia theo từng mức độ.",
    },
  },
  {
    id: "grade5",
    title: "Lớp 5 chuẩn bị lên THCS",
    situation: {
      parent:
        "Con đang học lớp 5, sắp lên THCS với nhiều môn mới và cách học mới. Ba mẹ muốn con được chuẩn bị tốt trước khi vào lớp 6, thay vì chỉ học trước chương trình.",
      student:
        "Bạn đang ở năm cuối tiểu học, sắp lên cấp 2 với nhiều môn hơn và phải tự giác hơn, không còn được nhắc từng việc như trước.",
    },
    handling: {
      parent:
        "Gợi mở nhận thức sớm và định hướng con cách ghi chép, tự quản lý bài vở, biết đặt câu hỏi đúng chỗ, và làm quen với tài liệu tự học trước THCS. Trọng tâm không phải học trước bài lớp 6.",
      student:
        "Hướng dẫn bạn tư duy tự học sớm, cách chia thời gian và chọn đúng bộ tài liệu nền tảng chuyển tiếp từ lớp 5 lên lớp 6, để vào cấp 2 đỡ bỡ ngỡ.",
    },
  },
];

export const caseById = Object.fromEntries(cases.map((c) => [c.id, c])) as Record<CaseId, Case>;
