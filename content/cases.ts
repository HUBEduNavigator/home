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
        "HUB cùng con gỡ thói quen so sánh với bạn bè, đưa sự chú ý về lộ trình của riêng con bằng những mục tiêu nhỏ, vừa sức, để mỗi tuần con thấy được mình đã tiến lên thế nào.",
      student:
        "HUB cùng bạn gỡ áp lực so sánh: xem rõ mình mạnh và yếu ở đâu, rồi chia nhỏ mục tiêu thành những việc làm được trong tuần để lấy lại cảm giác mình đang làm chủ việc học.",
    },
  },
  {
    id: "gaps",
    title: "Muốn học nhưng hổng kiến thức gốc",
    situation: {
      parent:
        "Con học nghiêm túc, chịu ngồi vào bàn, nhưng bài mới nào cũng vấp vì thiếu kiến thức nền của các lớp dưới. Gia đình chưa biết nên cho con ôn lại từ đâu.",
      student:
        "Bạn muốn cố gắng, nhưng nghe giảng trên lớp rất khó hiểu vì kiến thức nền bị đứt từ trước. Càng làm bài mới càng rối và nản.",
    },
    handling: {
      parent:
        "Làm bài chẩn đoán để khoanh đúng phần kiến thức nền bị hổng, rồi xếp thứ tự lấp lại: xử lý trước những mắt xích đang chặn bài học hiện tại.",
      student:
        "Tìm ra đúng những khái niệm nền bạn đang thiếu, rồi lấp lại từng bước theo thứ tự gọn gàng để bắt nhịp lại với bài trên lớp.",
    },
  },
  {
    id: "inefficient",
    title: "Học nhiều nhưng hiệu quả thấp",
    situation: {
      parent:
        "Con học thêm nhiều nơi, ngồi học mỗi ngày rất lâu, nhưng điểm số và khả năng tự làm bài vẫn không khá lên.",
      student:
        "Lịch học ở trường và học thêm kín cả tuần, bạn mệt, nhưng gặp đề đổi cách hỏi một chút là lúng túng vì quen học thuộc theo mẫu.",
    },
    handling: {
      parent:
        "Xem lại cách học thực tế của con: ghi chép thế nào, ôn lúc nào, tự kiểm tra ra sao. Sau đó đổi dần từng thói quen, bắt đầu từ thói quen tốn thời gian mà ít hiệu quả nhất.",
      student:
        "Cùng bạn xem lại cách ghi chép, ôn tập và giải bài, rồi đổi từng thói quen một để thời gian học thực sự biến thành hiểu bài.",
    },
  },
  {
    id: "nomentor",
    title: "Khó tìm người kèm lại từ nền tảng",
    situation: {
      parent:
        "Gia đình đã hỏi nhiều trung tâm và gia sư, nhưng đa số chỉ nhận đi tiếp chương trình đang học. Rất ít nơi nhận dạy lại từ đầu cho học sinh mất gốc ở giai đoạn chuyển cấp.",
      student:
        "Sang cấp mới, kiến thức tăng nhanh trong khi phần gốc ở cấp dưới chưa vững, mà lớp học thêm nào cũng chạy theo chương trình mới nên bạn không theo kịp.",
    },
    handling: {
      parent:
        "Bắt đầu từ điểm xuất phát thật của con, kể cả khi chỗ hổng nằm ở chương trình vài năm trước, và đi theo nhịp con theo kịp.",
      student:
        "Bắt đầu từ đúng mức hiện tại của bạn, nối lại kiến thức giữa các lớp với tốc độ vừa sức.",
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
        "Chuẩn bị ba thứ: thói quen tự học (ghi chép, quản lý thời gian), cách hỏi khi chưa hiểu, và cách dùng AI an toàn. Trọng tâm không phải học trước bài lớp 6.",
      student:
        "Tập ba thứ: ghi chép, tự lập kế hoạch học trong tuần, và hỏi khi chưa hiểu, kể cả hỏi AI cho đúng cách. Nhờ vậy vào lớp 6 bạn đỡ bỡ ngỡ.",
    },
  },
];

export const caseById = Object.fromEntries(cases.map((c) => [c.id, c])) as Record<CaseId, Case>;
