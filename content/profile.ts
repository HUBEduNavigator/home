/** Hai người sáng lập. Chỉ ghi những thông tin HUB đã cung cấp. */
export type Member = {
  id: string;
  initials: string;
  name: string;
  role: string;
  degree: string;
  summary: string;
  highlightsTitle: string;
  highlights: string[];
  languagesTitle: string | null;
  languages: { name: string; level: string; pct: number }[];
  badge: string | null;
  link: { label: string; href: string } | null;
};

export const founders = {
  eyebrow: "Đội ngũ sáng lập và cố vấn",
  title: "Hai người đồng hành đứng sau HUB EduNavigator",
  intro:
    "Cả hai đều là Cử nhân Ngôn ngữ Anh, trực tiếp áp dụng cách “tự học mà không học thuật” và công nghệ AI vào học tập lẫn công việc thực tế.",
};

export const members: Member[] = [
  {
    id: "bao-huy",
    initials: "BH",
    name: "Bảo Huy (HUB)",
    role: "Người sáng lập",
    degree: "Cử nhân Ngôn ngữ Anh",
    summary:
      "Làm việc tự do ở nhiều lĩnh vực, trực tiếp áp dụng cách tự học và công nghệ AI vào công việc hằng ngày.",
    highlightsTitle: "Lĩnh vực đã làm",
    highlights: ["Marketing", "Phân tích dữ liệu", "Nghiên cứu học thuật", "SEO", "Vibe coding", "Sáng tạo nội dung (TikToker)"],
    languagesTitle: "Ngoại ngữ tự học (bắt đầu từ con số 0 khi vào đại học)",
    languages: [
      { name: "Tiếng Anh", level: "C1", pct: 85 },
      { name: "Tiếng Pháp", level: "B1", pct: 50 },
      { name: "Tiếng Hàn", level: "A2", pct: 30 },
      { name: "Tiếng Trung", level: "Giao tiếp nghe – nói", pct: 35 },
    ],
    badge: null,
    link: { label: "Xem trang giới thiệu của Bảo Huy", href: "https://huybao2206.github.io/hubcuteee/" },
  },
  {
    id: "bui-tran-thanh",
    initials: "TT",
    name: "Bùi Trần Thạnh",
    role: "Đồng sáng lập",
    degree: "Cử nhân Ngôn ngữ Anh",
    summary:
      "Giáo viên dạy tiếng Anh, có chứng chỉ IELTS 8.0, định hướng phát triển tri thức toàn diện gắn với tư duy hội nhập.",
    highlightsTitle: "Chuyên môn và định hướng",
    highlights: [
      "Giáo viên dạy tiếng Anh",
      "Phát triển tri thức từ sách, tin tức và văn hoá quốc tế",
      "Hình thành tư duy toàn cầu (Global Mindset) cho học sinh",
    ],
    languagesTitle: null,
    languages: [],
    badge: "IELTS 8.0",
    link: null,
  },
];
