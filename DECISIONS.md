# DECISIONS

- **Nhánh git:** môi trường này chỉ cho đẩy lên `claude/new-session-jga0ez`, nên làm trên nhánh đó thay vì `main`. Workflow chạy cho cả `main` và nhánh này.
- **Tên repo:** repo thực tế là `HUBEduNavigator/home`, không phải `huybao2206/edunavigator`. `basePath` và URL được workflow tính từ tên repo (`NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_SITE_URL`), nên đổi tên repo không phải sửa code.
- **TypeScript 5.9** thay vì 7: tương thích Next đã kiểm chứng.
- **Font:** Be Vietnam Pro (nội dung) + Fraunces (tiêu đề, serif ấm, có subset tiếng Việt).
- **Không lưu gì:** kể cả theme và đối tượng đều chỉ nằm trong bộ nhớ tab; theme mặc định theo hệ thống.
- **Thang đo và ngưỡng chấm:** xem `scoring` trong `content/diagnostic.ts`. Lớp 5 chỉ tính khi chọn lớp 5, kèm câu riêng về tự quản lý.
- **3 việc làm tại nhà** viết cho cả hai giọng (phụ huynh / học sinh), nằm trong `content/results.ts`. Đây là nội dung tôi soạn, HUB cần đọc lại.
- **Khung giờ liên hệ** (sáng/chiều/tối/cuối tuần) là lựa chọn của người đặt, không phải lịch làm việc của HUB.
- **Thanh trình độ ngoại ngữ:** phần trăm chỉ minh hoạ trực quan cho C1/B1/A2, không phải điểm số.
- **Thời lượng từng chặng, giá, hình thức học, ảnh, lời người sáng lập:** để TODO, UI hiện "Thống nhất khi tư vấn" hoặc "Liên hệ để được tư vấn".
- **Kho tài liệu:** vì web tài liệu đang xây, phần này là mô phỏng bộ lọc (có ghi rõ), không phải ảnh chụp, và không nêu nội dung cụ thể chưa có.
- **Link tài liệu trong kết quả:** hiện trỏ về trang chủ web tài liệu; sau này gắn đường dẫn riêng cho từng trường hợp.

## Danh sách câu hỏi tự kiểm tra (để HUB duyệt)

Câu 0 (mọi người): chọn lớp 5 / THCS / THPT. Thang trả lời mặc định: Hầu như không / Thỉnh thoảng / Khá thường xuyên / Gần như luôn luôn (một số câu có thang riêng, xem `content/diagnostic.ts`).

1. `compare`
   - Phụ huynh: Con có nhắc điểm hoặc thành tích của bạn bè rồi tỏ ra nản, kiểu “con không bằng ai” không?
   - Học sinh: Bạn có nhìn điểm của bạn bè rồi thấy mình kém hơn và không muốn học nữa không?
2. `stress`
   - Phụ huynh: Trước bài kiểm tra hay buổi học, con có biểu hiện căng thẳng như đau bụng, khó ngủ, hoặc né nói về việc học không?
   - Học sinh: Trước bài kiểm tra, bạn có thấy bồn chồn, khó ngủ, hoặc cố không nghĩ tới nó không?
3. `old-gap`
   - Phụ huynh: Con có làm sai bài mới vì không nắm kiến thức lớp dưới (ví dụ phân số, ngữ pháp cơ bản, công thức đã học) không?
   - Học sinh: Khi làm bài, bạn có nhận ra mình bị vướng vì quên hoặc chưa bao giờ hiểu phần kiến thức ở lớp trước không?
4. `lost`
   - Phụ huynh: Con có ngồi nghe giảng mà không theo kịp, và cũng không biết hỏi chỗ nào không?
   - Học sinh: Trên lớp, có lúc bạn bị lạc mà không biết mình lạc ở chỗ nào để hỏi không?
5. `no-progress`
   - Phụ huynh: Con đã học thêm một hoặc nhiều nơi, nhưng điểm hoặc sự tự tin của con vài tháng nay vẫn đứng yên. Điều này đúng với con tới đâu?
   - Học sinh: Bạn đã đi học thêm hoặc làm thêm nhiều bài, nhưng điểm vài tháng nay vẫn gần như không đổi. Điều này đúng với bạn tới đâu?
6. `explain`
   - Phụ huynh: Sau khi học xong một bài, con có tự giải thích lại được bằng lời của mình không?
   - Học sinh: Sau khi học xong một bài, bạn có tự giải thích lại được bằng lời của mình không?
7. `find-mentor`
   - Phụ huynh: Ba mẹ đã tìm người dạy lại từ nền tảng cho con và thấy khó tìm, vì nơi nào cũng chỉ muốn đi tiếp chương trình hiện tại?
   - Học sinh: Bạn đã muốn học lại từ phần nền tảng nhưng không tìm được ai chịu dạy lại từ đầu?
8. `companion`
   - Phụ huynh: Có ai ngồi cùng con để biết con đang hổng chỗ nào và sắp xếp việc học cho con, ở nhà hoặc ở trường không?
   - Học sinh: Có ai ngồi cùng bạn để biết bạn đang hổng chỗ nào và sắp xếp việc học cùng bạn không?
9. `self-manage`
   - Phụ huynh: Con có tự soạn cặp, ghi lịch bài tập và chủ động bắt đầu làm bài mà không cần nhắc từng việc không?
   - Học sinh: Bạn có tự soạn cặp, ghi lịch bài tập và chủ động bắt đầu làm bài mà không cần ai nhắc không?

## Đợt nâng cấp 2
- **Hoạt ảnh:** `LazyMotion` + `domAnimation` (chỉ nạp phần cần) và `MotionConfig reducedMotion="user"` cho toàn trang. Component dùng chung trong `components/motion.tsx`: `Reveal`, `Stagger`, `SectionHead`.
- **Hero:** một chấm sáng đi dọc con đường, mỗi chặng sáng lên đúng lúc chấm đi qua; la bàn dò hướng rồi dừng bằng lò xo, chỉ về phía trước. Chạy khi hình vào màn hình (trên điện thoại hình nằm dưới nút bấm).
- **Hero không làm mờ h1 lúc tải** để không làm chậm LCP; chỉ chuyển cảnh khi đổi phụ huynh/học sinh.
- **Modal đặt lịch** chỉ tải mã khi bấm mở lần đầu (`BookingModalLazy`).
- **Font:** Be Vietnam Pro 400/600, Fraunces 600 (không preload) để LCP nhanh hơn. Slogan bỏ chữ nghiêng.
- **Deploy:** workflow tự thử bật Pages (`configure-pages` với `enablement`). Nếu token mặc định không đủ quyền thì vẫn cần bật tay một lần.

## Đợt biên tập nội dung (bản viết lại từ HUB)
Đã áp: văn phong 5 tình huống (có lời giải riêng cho phụ huynh/học sinh), hero, bảng so sánh, quy trình, hội thoại demo AI (học sinh nêu cách tính sai 30% rồi tự sửa), FAQ, gói theo cấp học, mô tả kho tài liệu, nhãn menu.

Đã **lọc ra, không áp**, vì trái brief gốc hoặc sai sự thật:
- **"Tâm thư từ Người sáng lập"**: brief yêu cầu HUB tự viết; để nguyên khung TODO.
- **Chi tiết hồ sơ HUB không có trong thông tin HUB cung cấp**: "Đọc hiểu & Giao tiếp độc lập", "Hệ chữ viết", "Marketing chiến lược", "Chuyên môn cố vấn nâng cao", "C1 (IELTS 8.0)" gộp lại; giữ đúng danh sách gốc. "Đội ngũ" đổi thành một người sáng lập.
- **Thời lượng/quy trình tự bịa**: buổi chẩn đoán "30–45 phút", "15 phút đầu", "chu kỳ 4 tuần, 1–3 chu kỳ", bộ "Prompt cá nhân hóa". Thời lượng vẫn TODO.
- **Đoạn văn bảo mật "lưu cục bộ trên thiết bị"**: sai, web không lưu gì. Giữ bản chính xác. Giữ © năm tự cập nhật.
- **Bộ 6 câu hỏi chẩn đoán mới**: thiếu so với yêu cầu 8–10 câu, làm hỏng bộ chấm điểm; giữ bộ 9–10 câu hiện tại.
- **Lời nhãn thương mại/thuật ngữ**: "Ma trận dạng bài tối ưu bởi AI", "khai phóng", "Socratic Prompting", "Feynman", "Peer Pressure" (brief cấm sáo rỗng và dịch nguyên cụm tiếng Anh), "kết quả tất yếu", "tối ưu hóa điểm số" (không hứa kết quả).
- **Tên hai nút ở hero** giữ như brief: "Đặt lịch chẩn đoán miễn phí", "Tự kiểm tra trong 3 phút".
