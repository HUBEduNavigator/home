import type { CaseId, Dual } from "./types";


type DualList = { parent: string[]; student: string[] };

export type CaseResult = {
  why: Dual;
  actions: { title: string; time: string; steps: DualList }[];
  docsLabel: string;
};

export const results: Record<CaseId, CaseResult> = {
  pressure: {
    why: {
      parent:
        "Các câu trả lời cho thấy con đang so mình với bạn bè nhiều và có dấu hiệu căng thẳng quanh việc học. Khi một em thấy mình “thua”, em thường né học trước, rồi mới tụt điểm sau.",
      student:
        "Các câu trả lời cho thấy bạn đang so mình với bạn bè nhiều và thấy căng khi nghĩ tới việc học. Đó là phản ứng rất bình thường, và có cách làm nhẹ đi.",
    },
    
    docsLabel: "Tài liệu về quản lý áp lực và đặt mục tiêu nhỏ",
    actions: [
      {
        title: "Viết ra “thước đo của riêng mình”",
        time: "15 phút, một lần",
        steps: {
          parent: [
            "Ngồi cạnh con, đưa một tờ giấy, hỏi: “tuần này con muốn làm được việc gì mà tuần trước chưa làm được?”.",
            "Cùng chọn đúng một việc nhỏ, đo được (ví dụ: giải được 5 bài dạng này không cần xem đáp án).",
            "Dán tờ giấy ở bàn học. Không nhắc tới điểm của bạn khác trong tuần này.",
          ],
          student: [
            "Lấy một tờ giấy, viết: “tuần này mình muốn làm được việc gì mà tuần trước mình chưa làm được?”.",
            "Chọn đúng một việc nhỏ, đếm được (ví dụ: giải được 5 bài dạng này không cần xem đáp án).",
            "Dán tờ giấy ở bàn học. Cuối tuần chỉ so với chính mình tuần trước.",
          ],
        },
      },
      {
        title: "Ghi lại ba việc đã làm được mỗi tối",
        time: "5 phút mỗi tối",
        steps: {
          parent: [
            "Mỗi tối, hỏi con một câu: “hôm nay con làm được những việc gì liên quan tới học?”.",
            "Cùng con ghi đúng ba ý ngắn vào một quyển sổ nhỏ, kể cả việc rất nhỏ như “hiểu được một bước giải”.",
            "Không sửa, không bình luận. Chỉ đọc lại cùng con vào cuối tuần.",
          ],
          student: [
            "Mỗi tối, viết ba việc bạn đã làm được liên quan tới học, kể cả việc rất nhỏ.",
            "Viết cụ thể (“hiểu bước chuyển vế”) thay vì chung chung (“học tốt”).",
            "Cuối tuần đọc lại cả danh sách. Đây là bằng chứng bạn đang tiến lên.",
          ],
        },
      },
      {
        title: "Tách “cảm giác” khỏi “dữ kiện”",
        time: "10 phút, khi con đang nản",
        steps: {
          parent: [
            "Khi con nói “con dở lắm”, hỏi tiếp: “cụ thể là môn nào, dạng bài nào?”.",
            "Viết ra hai cột: điều con cảm thấy / điều thực sự xảy ra (điểm, lỗi sai cụ thể).",
            "Chọn một dòng ở cột thứ hai để cùng xử lý trong tuần.",
          ],
          student: [
            "Khi thấy nản, vẽ hai cột: “mình cảm thấy” và “thực tế xảy ra” (điểm, lỗi sai cụ thể).",
            "Điền thật chi tiết cột thứ hai: môn nào, dạng bài nào, sai ở bước nào.",
            "Chọn một dòng ở cột thứ hai để xử lý trong tuần này.",
          ],
        },
      },
    ],
  },
  gaps: {
    why: {
      parent:
        "Các câu trả lời cho thấy con vướng ở bài mới chủ yếu vì phần kiến thức bên dưới chưa chắc. Cố học thêm bài mới lúc này thường làm con thấy nản hơn.",
      student:
        "Các câu trả lời cho thấy bạn vướng ở bài mới chủ yếu vì phần kiến thức bên dưới chưa chắc. Học thêm bài mới lúc này không giúp, lùi lại đúng chỗ mới giúp.",
    },
    
    docsLabel: "Tài liệu ôn lại kiến thức nền theo môn và lớp",
    actions: [
      {
        title: "Lập “nhật ký lỗi sai” của tuần",
        time: "10 phút mỗi ngày",
        steps: {
          parent: [
            "Cho con một quyển vở riêng. Mỗi lần sai một bài, con chép lại đề và ghi một dòng: “mình sai vì…”.",
            "Cuối tuần, cùng đọc lại và hỏi: “lỗi nào lặp lại nhiều nhất?”.",
            "Chỉ cần khoanh ra 1–2 chỗ lặp lại. Đó là chỗ cần lấp trước.",
          ],
          student: [
            "Dùng một quyển vở riêng. Mỗi lần sai, chép đề và viết một dòng: “mình sai vì…”.",
            "Cuối tuần đọc lại và gạch chân lỗi nào lặp lại nhiều nhất.",
            "Chọn 1–2 chỗ lặp lại. Đó là chỗ cần lấp trước.",
          ],
        },
      },
      {
        title: "Lùi một bước để tìm chỗ vướng",
        time: "20 phút, một lần",
        steps: {
          parent: [
            "Lấy một bài con vừa làm sai. Hỏi: “để làm bài này, con cần biết những gì trước đó?”, rồi ghi ra.",
            "Thử đưa cho con một bài đơn giản hơn dùng đúng phần kiến thức đó.",
            "Nếu con làm sai, lùi thêm một bước nữa. Dừng ở chỗ con làm đúng được: đó là điểm xuất phát.",
          ],
          student: [
            "Lấy một bài vừa làm sai. Tự hỏi: “để làm bài này mình cần biết gì trước đó?”, rồi ghi ra.",
            "Tìm hoặc tự ra một bài đơn giản hơn dùng đúng phần kiến thức đó và làm thử.",
            "Nếu vẫn sai, lùi thêm một bước. Dừng ở chỗ làm đúng được: đó là điểm xuất phát của bạn.",
          ],
        },
      },
      {
        title: "Học lại một mắt xích nhỏ bằng cách tự dạy",
        time: "25 phút, 3 buổi trong tuần",
        steps: {
          parent: [
            "Chọn một mắt xích nhỏ vừa tìm ra (một dạng bài, một quy tắc).",
            "Nhờ con “dạy” lại cho ba mẹ như thể ba mẹ chưa biết gì. Ba mẹ chỉ hỏi “vì sao?”, không sửa ngay.",
            "Chỗ nào con ấp úng là chỗ cần xem lại. Ghi lại để làm tiếp buổi sau.",
          ],
          student: [
            "Chọn một mắt xích nhỏ vừa tìm ra (một dạng bài, một quy tắc).",
            "Giảng lại cho một người (hoặc nói to một mình) như thể họ chưa biết gì.",
            "Chỗ nào bạn ấp úng là chỗ cần xem lại. Ghi lại để làm tiếp buổi sau.",
          ],
        },
      },
    ],
  },
  inefficient: {
    why: {
      parent:
        "Các câu trả lời cho thấy con đã bỏ nhiều thời gian nhưng cách học chưa giúp nhớ và hiểu lâu. Thường vấn đề không nằm ở số giờ học, mà ở việc con ít được tự kiểm tra và tự giải thích.",
      student:
        "Các câu trả lời cho thấy bạn đã bỏ nhiều thời gian nhưng cách học chưa giúp nhớ lâu. Thường vấn đề không phải số giờ học, mà là ít khi tự kiểm tra và tự giải thích lại.",
    },
    
    docsLabel: "Tài liệu về phương pháp tự học và tự kiểm tra",
    actions: [
      {
        title: "Gấp sách và nhớ lại",
        time: "10 phút sau mỗi buổi học",
        steps: {
          parent: [
            "Sau khi con học xong một bài, bảo con gấp sách lại.",
            "Con viết ra giấy mọi điều còn nhớ về bài đó, không nhìn sách.",
            "Mở sách ra, cùng đối chiếu và dùng bút khác màu bổ sung phần còn thiếu.",
          ],
          student: [
            "Học xong một bài, gấp sách lại.",
            "Viết ra giấy mọi điều bạn còn nhớ về bài đó, không nhìn sách.",
            "Mở sách ra đối chiếu và dùng bút khác màu bổ sung phần thiếu.",
          ],
        },
      },
      {
        title: "Ôn theo quãng cách",
        time: "15 phút, 3 lần trong tuần",
        steps: {
          parent: [
            "Chọn bài con học hôm nay. Hẹn con ôn lại bài đó sau 1 ngày, rồi sau 3 ngày, rồi sau 7 ngày.",
            "Mỗi lần ôn chỉ 10–15 phút và bắt đầu bằng việc nhớ lại, không đọc lại.",
            "Ghi ngày ôn lên lịch dán trên bàn để con tự làm theo.",
          ],
          student: [
            "Chọn bài bạn học hôm nay. Hẹn mình ôn lại sau 1 ngày, 3 ngày, 7 ngày.",
            "Mỗi lần chỉ 10–15 phút và bắt đầu bằng việc nhớ lại, không đọc lại.",
            "Ghi ngày ôn lên lịch dán trên bàn để khỏi quên.",
          ],
        },
      },
      {
        title: "Sửa bài bằng “vì sao”, không chỉ chép đáp án",
        time: "10 phút mỗi lần sửa bài",
        steps: {
          parent: [
            "Với mỗi bài sai, hỏi con: “bước nào con bắt đầu đi lệch?”.",
            "Con tự viết lại lời giải, kèm một dòng giải thích vì sao bước đó đúng.",
            "Một tuần sau, lấy lại đúng bài đó để con làm lại từ đầu.",
          ],
          student: [
            "Với mỗi bài sai, tìm cho ra bước nào bạn bắt đầu đi lệch.",
            "Tự viết lại lời giải, kèm một dòng giải thích vì sao bước đó đúng.",
            "Một tuần sau, làm lại đúng bài đó từ đầu, không xem lời giải.",
          ],
        },
      },
    ],
  },
  nomentor: {
    why: {
      parent:
        "Các câu trả lời cho thấy con cần được bắt đầu lại từ nền tảng, nhưng chưa có ai ngồi cùng để làm việc đó. Đây không phải lỗi của con, vì phần lớn lớp học thêm được thiết kế để đi tiếp chương trình.",
      student:
        "Các câu trả lời cho thấy bạn cần bắt đầu lại từ nền tảng nhưng chưa có ai ngồi cùng để làm việc đó. Đó không phải lỗi của bạn, vì phần lớn lớp học được thiết kế để đi tiếp chương trình.",
    },
    
    docsLabel: "Tài liệu học lại từ nền tảng",
    actions: [
      {
        title: "Chọn một môn và xác định điểm xuất phát",
        time: "30 phút, một lần",
        steps: {
          parent: [
            "Chọn một môn con thấy khó nhất. Lấy sách giáo khoa lớp dưới một lớp so với lớp hiện tại.",
            "Cho con làm 5 bài ở cuối một chương, không giúp.",
            "Làm đúng hết thì lùi hoặc tiến một chương. Làm sai nhiều thì lùi tiếp. Chương làm đúng được khoảng 4/5 bài là điểm xuất phát.",
          ],
          student: [
            "Chọn một môn bạn thấy khó nhất. Lấy sách giáo khoa lớp dưới một lớp.",
            "Làm 5 bài cuối một chương, không xem đáp án.",
            "Đúng hết thì tiến một chương. Sai nhiều thì lùi một chương. Chương làm đúng khoảng 4/5 bài là điểm xuất phát.",
          ],
        },
      },
      {
        title: "Xếp lộ trình học lại 2 tuần",
        time: "15 phút, một lần",
        steps: {
          parent: [
            "Từ điểm xuất phát, chia nội dung cần học lại thành các phần nhỏ, mỗi phần học được trong 20–30 phút.",
            "Cùng con xếp vào lịch 2 tuần, mỗi ngày đúng một phần, có một ngày nghỉ.",
            "Dán lịch lên bàn, con tự đánh dấu khi xong.",
          ],
          student: [
            "Từ điểm xuất phát, chia nội dung cần học lại thành các phần nhỏ, mỗi phần 20–30 phút.",
            "Xếp vào lịch 2 tuần, mỗi ngày đúng một phần, có một ngày nghỉ.",
            "Dán lịch lên bàn và tự đánh dấu khi xong.",
          ],
        },
      },
      {
        title: "Chuẩn bị 3 câu hỏi cho buổi hỏi đáp",
        time: "10 phút mỗi tuần",
        steps: {
          parent: [
            "Cuối tuần, con ghi ba chỗ vẫn chưa hiểu, mỗi chỗ viết thành một câu hỏi cụ thể.",
            "Hỏi thầy cô, bạn giỏi hơn, hoặc một người có thể giúp, và ghi lại câu trả lời.",
            "Sau khi hỏi xong, con tự làm một bài tương tự để kiểm tra.",
          ],
          student: [
            "Cuối tuần, ghi ba chỗ bạn vẫn chưa hiểu, mỗi chỗ viết thành một câu hỏi cụ thể.",
            "Hỏi thầy cô hoặc bạn giỏi hơn, và ghi lại câu trả lời.",
            "Sau khi hỏi xong, tự làm một bài tương tự để kiểm tra.",
          ],
        },
      },
    ],
  },
  grade5: {
    why: {
      parent:
        "Con đang học lớp 5, nên điều đáng chuẩn bị nhất lúc này không phải kiến thức lớp 6 mà là thói quen tự học và sự tự tin khi bước vào môi trường mới.",
      student:
        "Bạn đang học lớp 5, nên điều đáng chuẩn bị nhất lúc này không phải bài lớp 6 mà là thói quen tự học và sự tự tin khi vào môi trường mới.",
    },
    
    docsLabel: "Tài liệu chuẩn bị lên THCS",
    actions: [
      {
        title: "Tự làm “lịch một ngày” cho thứ Bảy",
        time: "15 phút",
        steps: {
          parent: [
            "Đưa con một tờ giấy và hỏi: “thứ Bảy này con muốn làm những gì?”. Để con tự viết.",
            "Con tự ghi giờ và chọn việc nào làm trước, việc nào làm sau.",
            "Cuối ngày, cùng nhìn lại: việc nào xong, việc nào chưa, vì sao.",
          ],
          student: [
            "Lấy một tờ giấy, viết những việc bạn muốn làm vào thứ Bảy.",
            "Ghi giờ và chọn việc nào làm trước, việc nào làm sau.",
            "Cuối ngày nhìn lại: việc nào xong, việc nào chưa, vì sao.",
          ],
        },
      },
      {
        title: "Tập ghi chép một đoạn ngắn",
        time: "10 phút, 3 lần trong tuần",
        steps: {
          parent: [
            "Chọn một đoạn ngắn (bài đọc, bản tin trẻ em, đoạn sách giáo khoa).",
            "Cho con đọc và ghi lại ý chính bằng 3 câu hoặc một sơ đồ nhỏ, bằng lời của con.",
            "Hỏi: “nếu kể lại cho bạn chưa đọc, con sẽ nói gì?”.",
          ],
          student: [
            "Chọn một đoạn ngắn (bài đọc, bản tin, đoạn sách giáo khoa).",
            "Ghi ý chính bằng 3 câu hoặc một sơ đồ nhỏ, bằng lời của bạn.",
            "Thử kể lại cho một người chưa đọc. Chỗ nào kể không trôi là chỗ cần đọc lại.",
          ],
        },
      },
      {
        title: "Tập hỏi khi chưa hiểu",
        time: "5 phút mỗi ngày",
        steps: {
          parent: [
            "Mỗi ngày, hỏi con: “hôm nay có chỗ nào con chưa hiểu không?”.",
            "Nếu có, giúp con viết thành một câu hỏi hoàn chỉnh để hôm sau hỏi thầy cô.",
            "Khen việc con dám hỏi, không khen việc “biết rồi”.",
          ],
          student: [
            "Mỗi ngày, tự hỏi: “hôm nay có chỗ nào mình chưa hiểu không?”.",
            "Nếu có, viết nó thành một câu hỏi rõ ràng để hôm sau hỏi thầy cô.",
            "Hỏi là cách học nhanh nhất, không phải dấu hiệu của việc kém.",
          ],
        },
      },
    ],
  },
};

/** Khi không có trường hợp nào nổi bật. */
export const neutralResult = {
  title: "Chưa có dấu hiệu nào nổi bật",
  why: {
    parent:
      "Từ các câu trả lời, chưa có một vấn đề nào nổi bật rõ ràng. Điều đó thường có nghĩa là con đang ổn, hoặc vấn đề nằm ở chỗ khác mà bài ngắn này chưa hỏi tới. Gặp trực tiếp sẽ rõ hơn.",
    student:
      "Từ các câu trả lời, chưa có một vấn đề nào nổi bật rõ ràng. Điều đó thường có nghĩa là bạn đang ổn, hoặc vấn đề nằm ở chỗ bài ngắn này chưa hỏi tới. Nói chuyện trực tiếp sẽ rõ hơn.",
  } as Dual,
  cases: ["inefficient"] as CaseId[],
};
