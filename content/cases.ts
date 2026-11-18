import type { CaseId, Dual } from "./types";

export type Case = {
  id: CaseId;
  title: string;
  situation: Dual;
  handling: string;
};

export const cases: Case[] = [
  {
    id: "pressure",
    title: "Áp lực đồng lứa",
    situation: {
      parent:
        "Con hay kể bạn này giỏi, bạn kia học thêm ba nơi, rồi im lặng hoặc nói “con học dở lắm”. Việc học dần bị né tránh.",
      student:
        "Bạn bè ai cũng như đang đi lên, còn bạn thì thấy mình tụt lại và không biết bắt đầu từ đâu.",
    },
    handling:
      "Cùng em tách “bạn bè giỏi” ra khỏi “mình đang kẹt ở đâu”, rồi chọn một mục tiêu nhỏ, đo được, để em thấy mình tiến lên bằng chính bài của mình.",
  },
  {
    id: "gaps",
    title: "Muốn học nhưng hổng kiến thức gốc",
    situation: {
      parent:
        "Con có muốn học và ngồi vào bàn đàng hoàng, nhưng bài mới nào cũng vướng vì thiếu kiến thức lớp dưới. Ba mẹ không biết cho con học lại từ đâu.",
      student:
        "Bạn muốn học, nhưng cứ gặp bài mới là bị vướng vì phần cũ chưa chắc, mà không biết phải lùi lại tới đâu thì đủ.",
    },
    handling:
      "Làm một bản chẩn đoán để khoanh đúng những mắt xích đang thiếu, rồi xếp thứ tự lấp lại, bắt đầu từ chỗ nhỏ nhất đang chặn bài hiện tại.",
  },
  {
    id: "inefficient",
    title: "Học nhiều nhưng hiệu quả thấp",
    situation: {
      parent:
        "Đã cho con học thêm nhiều nơi, thời gian học dài, nhưng điểm số và sự tự tin của con vẫn đứng yên.",
      student:
        "Bạn học nhiều, làm nhiều bài, nhưng cuối cùng vẫn quên và vẫn sai những lỗi cũ.",
    },
    handling:
      "Xem lại cách học thực tế: học thế nào, ôn lúc nào, tự kiểm tra ra sao. Sau đó đổi từng thói quen một, bắt đầu từ thói quen tốn thời gian nhất mà ít hiệu quả nhất.",
  },
  {
    id: "nomentor",
    title: "Khó tìm người kèm lại từ nền tảng",
    situation: {
      parent:
        "Ba mẹ đã hỏi nhiều nơi, nhưng đa số chỉ nhận đi tiếp chương trình đang học. Ít ai nhận dạy lại từ nền tảng cho con.",
      student:
        "Bạn muốn học lại từ đầu, nhưng nơi nào cũng bắt đầu từ bài đang học trên lớp.",
    },
    handling:
      "Bắt đầu từ điểm xuất phát thật của em, kể cả khi đó là kiến thức của vài lớp trước, và đi đủ chậm để em theo kịp.",
  },
  {
    id: "grade5",
    title: "Lớp 5 chuẩn bị lên THCS",
    situation: {
      parent:
        "Con đang học lớp 5, sắp lên cấp 2. Ba mẹ muốn con quen nhịp học mới trước khi vào lớp 6, nhưng chưa biết chuẩn bị gì ngoài học trước bài.",
      student:
        "Bạn sắp lên lớp 6, vừa háo hức vừa lo vì chưa biết cấp 2 khác cấp 1 ở chỗ nào.",
    },
    handling:
      "Chuẩn bị ba thứ: thói quen tự học (ghi chép, quản lý thời gian), cách hỏi khi chưa hiểu, và cách dùng AI an toàn. Trọng tâm không phải học trước bài lớp 6.",
  },
];

export const caseById = Object.fromEntries(cases.map((c) => [c.id, c])) as Record<CaseId, Case>;
