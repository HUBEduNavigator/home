# HUB EduNavigator

Web một trang (Next.js, export tĩnh) cho mentor định hướng tự học HUB EduNavigator.

## Chạy và build

```bash
npm install
npm run dev      # phát triển
npm run build    # xuất web tĩnh vào thư mục out/
```

## Deploy (GitHub Pages)

Workflow `.github/workflows/deploy.yml` tự build và đăng khi push `main`. `basePath` lấy theo tên repo.

Bật Pages một lần: Settings → Pages → Source: **GitHub Actions**. Nếu deploy từ nhánh khác `main` bị chặn, vào Settings → Environments → github-pages để cho phép nhánh đó, hoặc merge vào `main`.

## Sửa nội dung (thư mục `content/`)

| File | Nội dung |
|---|---|
| `site.ts` | Liên hệ, link, `FORM_ENDPOINT`, các giá trị TODO |
| `copy.ts` | Hero, giới thiệu công cụ tự kiểm tra (theo phụ huynh/học sinh) |
| `cases.ts` | Năm trường hợp |
| `diagnostic.ts` | Câu hỏi và **quy tắc chấm** |
| `results.ts` | Giải thích kết quả và 3 việc làm tại nhà |
| `compare.ts`, `process.ts` | So sánh Mentor/gia sư, 3 bước làm việc |
| `profile.ts`, `resources.ts`, `plans.ts`, `faq.ts` | Hai người sáng lập, kho tài liệu, theo cấp học, hỏi đáp |
| `testimonials.ts` | Cảm nhận. Mảng rỗng thì phần này ẩn. Chỉ thêm khi có sự đồng ý của người viết |

## Việc HUB có thể bổ sung

- Ảnh của hai người sáng lập (hiện dùng chữ viết tắt BH / TT)
- Học phí: `plans[].price` (hiện hiện "Liên hệ để được tư vấn")
- Hình thức gặp mặt và khu vực: `site.deliveryMode`, `site.serviceArea`
- `site.FORM_ENDPOINT`: Google Form/Formspree nếu muốn có nút gửi biểu mẫu
- `testimonials.ts`: cảm nhận thật, kèm đồng ý của người viết
- `results.ts`: đọc lại các việc làm tại nhà
- Duyệt danh sách câu hỏi tự kiểm tra trong `DECISIONS.md`
