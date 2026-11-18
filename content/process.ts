/** `duration: null` = TODO, HUB chốt thời lượng. UI hiện "Thống nhất khi tư vấn". */
export const steps = [
  {
    id: "diagnose",
    name: "Chẩn đoán",
    what: "Nói chuyện với con (và ba mẹ), xem vở bài tập và bài kiểm tra gần đây, làm vài bài nhỏ để khoanh đúng chỗ con đang kẹt: kiến thức gốc, cách học hay tâm lý.",
    who: "HUB làm việc cùng con. Ba mẹ tham gia phần đầu để kể bối cảnh.",
    product: "Bản chẩn đoán 1 trang: kẹt ở đâu, vì sao, nên xử lý theo thứ tự nào.",
    duration: null as string | null,
  },
  {
    id: "plan",
    name: "Lộ trình cá nhân",
    what: "Từ bản chẩn đoán, chọn ra vài việc quan trọng nhất và xếp vào lịch học thực tế của con, phù hợp với giờ giấc ở trường và ở nhà.",
    who: "HUB soạn nháp, con cùng chỉnh lại để chắc là làm được.",
    product: "Kế hoạch tự học 4 tuần, có việc cụ thể từng ngày và cách tự kiểm tra.",
    duration: null as string | null,
  },
  {
    id: "companion",
    name: "Đồng hành",
    what: "Con học theo kế hoạch. Mỗi tuần HUB xem con đã làm được gì, chỗ nào vướng, chỉnh kế hoạch, và hướng dẫn dùng AI để hỏi lại thay vì chép đáp án.",
    who: "Con học. HUB hỏi, gợi ý và chỉnh. Ba mẹ nhận cập nhật ngắn.",
    product: "Nhật ký học tập của con và bản cập nhật kế hoạch sau mỗi tuần.",
    duration: null as string | null,
  },
  {
    id: "independent",
    name: "Tự chủ",
    what: "HUB lùi dần. Con tự lập kế hoạch tuần, tự kiểm tra, tự quyết khi nào cần hỏi AI hoặc hỏi thầy cô. HUB chỉ còn kiểm tra lại ở các mốc.",
    who: "Con làm chính. HUB chỉ xem lại và gỡ vướng.",
    product: "Bộ cách học của riêng con, tự dùng được cho các môn và các kỳ sau.",
    duration: null as string | null,
  },
];
