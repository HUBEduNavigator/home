# DECISIONS

- **Nhánh git:** môi trường này chỉ cho đẩy lên `claude/new-session-jga0ez`, nên làm trên nhánh đó thay vì `main`. Workflow chạy cho cả `main` và nhánh này.
- **Tên repo:** repo thực tế là `HUBEduNavigator/home`, không phải `huybao2206/edunavigator`. `basePath` và URL được workflow tính từ tên repo (`NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_SITE_URL`), nên đổi tên repo không phải sửa code.
- **TypeScript 5.9** thay vì 7: tương thích Next đã kiểm chứng.
- **Font:** Be Vietnam Pro (nội dung) + Fraunces (tiêu đề, serif ấm, có subset tiếng Việt).
- **Không lưu gì:** kể cả theme và đối tượng đều chỉ nằm trong bộ nhớ tab; theme mặc định theo hệ thống.
