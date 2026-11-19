import type { CaseId, Dual } from "./types";

/**
 * QUY TẮC CHẤM (minh bạch, dễ chỉnh)
 * - Mỗi câu có 4 mức trả lời, mức 0 → 3. Câu `reverse` đảo chiều (trả lời "luôn được" = 0 điểm).
 * - `weights`: mỗi mức trả lời được nhân với trọng số này rồi cộng vào điểm của từng trường hợp.
 * - Điểm của một trường hợp được chia cho điểm tối đa có thể đạt (chỉ tính các câu đã hiện) → tỉ lệ 0–1.
 * - Trường hợp "nổi bật" nếu tỉ lệ ≥ minShare VÀ ≥ closeToTop × tỉ lệ cao nhất. Tối đa maxCases trường hợp.
 */
export const scoring = {
  minShare: 0.4,
  closeToTop: 0.85,
  maxCases: 2,
};

export type Grade = "thcs" | "thpt";

export const freqLabels = ["Hầu như không", "Thỉnh thoảng", "Khá thường xuyên", "Gần như luôn luôn"];
export const agreeLabels = ["Không đúng", "Đúng một phần", "Khá đúng", "Rất đúng"];
export const abilityLabels = ["Gần như luôn được", "Thường được", "Thỉnh thoảng được", "Hầu như không được"];

export const gradeQuestion = {
  id: "grade",
  text: { parent: "Con đang học lớp mấy?", student: "Bạn đang học lớp mấy?" } as Dual,
  options: [
    { value: "thcs" as Grade, label: "THCS (lớp 6–9)" },
    { value: "thpt" as Grade, label: "THPT (lớp 10–12)" },
  ],
};

type Q = {
  id: string;
  text: Dual;
  weights: Partial<Record<CaseId, number>>;
  reverse?: boolean;
  options?: string[];
};

export const questions: Q[] = [
  {
    id: "compare",
    text: {
      parent: "Con có nhắc điểm hoặc thành tích của bạn bè rồi tỏ ra nản, kiểu “con không bằng ai” không?",
      student: "Bạn có nhìn điểm của bạn bè rồi thấy mình kém hơn và không muốn học nữa không?",
    },
    weights: { pressure: 3 },
  },
  {
    id: "stress",
    text: {
      parent:
        "Trước bài kiểm tra hay buổi học, con có biểu hiện căng thẳng như đau bụng, khó ngủ, hoặc né nói về việc học không?",
      student: "Trước bài kiểm tra, bạn có thấy bồn chồn, khó ngủ, hoặc cố không nghĩ tới nó không?",
    },
    weights: { pressure: 3, inefficient: 1 },
  },
  {
    id: "old-gap",
    text: {
      parent:
        "Con có làm sai bài mới vì không nắm kiến thức lớp dưới (ví dụ phân số, ngữ pháp cơ bản, công thức đã học) không?",
      student:
        "Khi làm bài, bạn có nhận ra mình bị vướng vì quên hoặc chưa bao giờ hiểu phần kiến thức ở lớp trước không?",
    },
    weights: { gaps: 3, nomentor: 1 },
  },
  {
    id: "lost",
    text: {
      parent: "Con có ngồi nghe giảng mà không theo kịp, và cũng không biết hỏi chỗ nào không?",
      student: "Trên lớp, có lúc bạn bị lạc mà không biết mình lạc ở chỗ nào để hỏi không?",
    },
    weights: { gaps: 3, pressure: 1 },
  },
  {
    id: "no-progress",
    text: {
      parent:
        "Con đã học thêm một hoặc nhiều nơi, nhưng điểm hoặc sự tự tin của con vài tháng nay vẫn đứng yên. Điều này đúng với con tới đâu?",
      student:
        "Bạn đã đi học thêm hoặc làm thêm nhiều bài, nhưng điểm vài tháng nay vẫn gần như không đổi. Điều này đúng với bạn tới đâu?",
    },
    options: agreeLabels,
    weights: { inefficient: 3 },
  },
  {
    id: "explain",
    text: {
      parent: "Sau khi học xong một bài, con có tự giải thích lại được bằng lời của mình không?",
      student: "Sau khi học xong một bài, bạn có tự giải thích lại được bằng lời của mình không?",
    },
    weights: { inefficient: 3, gaps: 1 },
    reverse: true,
    options: abilityLabels,
  },
  {
    id: "find-mentor",
    text: {
      parent:
        "Ba mẹ đã tìm người dạy lại từ nền tảng cho con và thấy khó tìm, vì nơi nào cũng chỉ muốn đi tiếp chương trình hiện tại?",
      student:
        "Bạn đã muốn học lại từ phần nền tảng nhưng không tìm được ai chịu dạy lại từ đầu?",
    },
    weights: { nomentor: 3, gaps: 1 },
    options: ["Chưa tìm", "Có tìm, khá dễ", "Khá khó tìm", "Tìm mãi không được"],
  },
  {
    id: "companion",
    text: {
      parent:
        "Có ai ngồi cùng con để biết con đang hổng chỗ nào và sắp xếp việc học cho con, ở nhà hoặc ở trường không?",
      student:
        "Có ai ngồi cùng bạn để biết bạn đang hổng chỗ nào và sắp xếp việc học cùng bạn không?",
    },
    weights: { nomentor: 2, inefficient: 1, pressure: 1 },
    options: ["Có, đều đặn", "Thỉnh thoảng", "Hiếm khi", "Không có ai"],
  },
];
