export const aiDemo = {
  problem:
    "Một cửa hàng giảm giá 20% cho mọi sản phẩm, rồi giảm thêm 10% tính trên giá đã giảm. Chiếc áo có giá gốc 500.000đ. Hỏi giá cuối cùng là bao nhiêu, và tổng cộng đã giảm bao nhiêu phần trăm so với giá gốc?",
  modes: {
    solve: {
      label: "AI giải hộ",
      caption:
        "Em có đáp án sau vài giây nhưng không hiểu vì sao tổng giảm là 28% chứ không phải 30%. Đổi số liệu một chút là em không tự làm được.",
      messages: [
        { from: "student", text: "Giải giúp em bài này và cho em đáp số luôn." },
        {
          from: "ai",
          text: "Sau lần giảm 20%: 500.000 × 0,8 = 400.000đ.\nSau lần giảm 10%: 400.000 × 0,9 = 360.000đ.\nTổng đã giảm 140.000đ, tức 28%.\nĐáp số: 360.000đ và 28%.",
        },
        { from: "student", text: "Dạ. Em chép luôn." },
        { from: "student", text: "…(Em vẫn không biết vì sao không phải 30%.)", note: true },
      ],
    },
    guide: {
      label: "AI hỏi gợi mở",
      caption:
        "Em tự tìm ra kết quả và hiểu vì sao không thể cộng thẳng 20% với 10%. Kiến thức này trở thành của chính em, lần sau em tự làm được.",
      messages: [
        {
          from: "student",
          text: "Em nghĩ tổng giảm là 20% + 10% = 30%. Bạn đừng đưa đáp án vội, hãy hỏi gợi ý để em tự kiểm tra xem đúng hay sai.",
        },
        { from: "ai", text: "Cách đặt vấn đề của em rất tốt. Ta thử từng bước nhé: sau lần giảm 20% đầu tiên, chiếc áo còn bao nhiêu tiền?" },
        { from: "student", text: "20% của 500.000đ là 100.000đ, nên còn 400.000đ ạ." },
        {
          from: "ai",
          text: "Đúng rồi. Đề nói lần giảm 10% tính trên giá đã giảm. Vậy 10% đó tính trên 400.000đ hay 500.000đ? Giá cuối là bao nhiêu?",
        },
        { from: "student", text: "Tính trên 400.000đ ạ, được 40.000đ. Giá cuối là 360.000đ." },
        { from: "ai", text: "360.000đ so với giá gốc 500.000đ thì đã giảm bao nhiêu phần trăm?" },
        { from: "student", text: "Giảm 140.000đ, tức 28%. Không phải 30%!" },
        { from: "ai", text: "Chính xác. Em thử tự giải thích vì sao hai lần giảm không cộng thẳng được với nhau?" },
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
      body: "Hãy bảo AI: “hỏi em từng bước”, “chỉ ra chỗ em sai mà đừng giải hộ”, “cho em một bài tương tự để thử”.",
    },
  ],
};
