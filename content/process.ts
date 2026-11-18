/** `duration: null` = TODO, HUB chốt thời lượng. UI hiện "Thống nhất khi tư vấn". */
export const steps = [
  {
    id: "diagnose",
    name: "Chẩn đoán",
    what: "Trao đổi với con và ba mẹ, xem vở ghi và bài kiểm tra gần đây, làm vài bài nhỏ để xác định đúng chỗ con đang nghẽn: kiến thức nền, cách học hay tâm lý.",
    who: "HUB làm việc trực tiếp với con. Ba mẹ tham gia phần đầu để chia sẻ bối cảnh.",
    product: "Bản chẩn đoán 1 trang: nghẽn ở đâu, vì sao, và nên xử lý theo thứ tự nào.",
    duration: null as string | null,
  },
  {
    id: "plan",
    name: "Lộ trình cá nhân",
    what: "Từ bản chẩn đoán, chọn ra vài việc quan trọng nhất và xếp vào lịch thực tế của con, cân đối giữa giờ học ở trường và thời gian tự học ở nhà.",
    who: "HUB soạn bản đầu, con cùng chỉnh lại để chắc chắn làm được.",
    product: "Kế hoạch tự học 4 tuần, có việc cụ thể từng ngày và cách tự kiểm tra.",
    duration: null as string | null,
  },
  {
    id: "companion",
    name: "Đồng hành",
    what: "Con học theo kế hoạch. Mỗi tuần HUB xem con đã làm được gì, chỗ nào còn vướng, rồi chỉnh kế hoạch, đồng thời hướng dẫn con dùng AI để hỏi lại thay vì chép đáp án.",
    who: "Con học và thực hành. HUB hỏi, gợi ý và chỉnh. Ba mẹ nhận cập nhật ngắn.",
    product: "Nhật ký học tập của con và bản kế hoạch cập nhật sau mỗi tuần.",
    duration: null as string | null,
  },
  {
    id: "independent",
    name: "Tự chủ",
    what: "HUB giảm dần mức can thiệp. Con tự lập kế hoạch tuần, tự kiểm tra, tự quyết khi nào cần hỏi AI hoặc hỏi thầy cô. HUB chỉ xem lại ở các mốc quan trọng.",
    who: "Con làm chủ quy trình. HUB xem lại và gỡ vướng khi cần.",
    product: "Cách học riêng của con, tự dùng được cho nhiều môn và các kỳ sau.",
    duration: null as string | null,
  },
];
