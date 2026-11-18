export const aiDemo = {
  problem:
    "Một cửa hàng giảm giá 20%. Sau đó giảm thêm 10% trên giá đã giảm. Món đồ giá gốc 500.000đ. Giá cuối là bao nhiêu, và tổng cộng đã giảm bao nhiêu phần trăm?",
  modes: {
    solve: {
      label: "AI giải hộ",
      caption: "Em nhận được đáp án trong vài giây. Em không hiểu vì sao, và bài tương tự lần sau vẫn sai.",
      messages: [
        { from: "student", text: "Giải giúp em bài này với." },
        {
          from: "ai",
          text: "Giá sau giảm 20%: 500.000 × 0,8 = 400.000đ.\nGiá sau giảm thêm 10%: 400.000 × 0,9 = 360.000đ.\nTổng đã giảm: 28%.",
        },
        { from: "student", text: "Dạ. Em chép luôn." },
        { from: "student", text: "…(Em không biết vì sao không phải 30%.)", note: true },
      ],
    },
    guide: {
      label: "AI hỏi gợi mở",
      caption: "Em tự tìm ra lời giải và hiểu vì sao có lỗi hay gặp là cộng 20% với 10%. Lần sau em tự làm được.",
      messages: [
        { from: "student", text: "Giải giúp em bài này với." },
        { from: "ai", text: "Mình cùng làm nhé. Sau lần giảm 20% đầu tiên, giá còn bao nhiêu phần của 500.000đ?" },
        { from: "student", text: "Còn 80% ạ, tức 400.000đ." },
        { from: "ai", text: "Đúng rồi. Lần giảm 10% thứ hai tính trên số nào: 500.000đ hay 400.000đ?" },
        { from: "student", text: "Trên 400.000đ ạ. Vậy còn 360.000đ." },
        { from: "ai", text: "360.000đ so với 500.000đ ban đầu là bao nhiêu phần trăm? Em đã giảm tổng cộng bao nhiêu?" },
        { from: "student", text: "360 chia 500 là 72%, nên giảm 28%. Chứ không phải 30% ạ!" },
        { from: "ai", text: "Đúng. Em thử tự giải thích vì sao hai lần giảm không cộng thẳng được với nhau?" },
      ],
    },
  },
  principles: [
    {
      title: "Không chép đáp án",
      body: "AI là người hỏi lại, không phải người làm bài thay. Em phải tự viết được lời giải bằng lời của mình.",
    },
    {
      title: "Luôn kiểm chứng",
      body: "AI có thể sai, kể cả khi nói rất tự tin. Em đối chiếu với sách giáo khoa, thử lại bằng số cụ thể, hoặc hỏi thầy cô.",
    },
    {
      title: "Dùng AI để hỏi lại, không để làm thay",
      body: "Bảo AI “hỏi em từng bước”, “chỉ ra chỗ em sai mà đừng giải”, “cho em một bài tương tự để thử”.",
    },
  ],
};
