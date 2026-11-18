# HUB EduNavigator

Web một trang (Next.js, export tĩnh) cho mentor định hướng tự học HUB EduNavigator.

## Chạy và build

```bash
npm install
npm run dev      # phát triển
npm run build    # xuất web tĩnh vào thư mục out/
```

## Deploy (GitHub Pages)

Workflow `.github/workflows/deploy.yml` tự build và đăng khi push `main` (và nhánh `claude/new-session-jga0ez`). `basePath` lấy theo tên repo.

Bật Pages một lần: Settings → Pages → Source: **GitHub Actions**. Nếu deploy từ nhánh khác `main` bị chặn, vào Settings → Environments → github-pages để cho phép nhánh đó, hoặc merge vào `main`.

## Sửa nội dung (thư mục `content/`)

| File | Nội dung |
|---|---|
| `site.ts` | Liên hệ, link, `FORM_ENDPOINT`, các giá trị TODO |
| `copy.ts` | Hero, giới thiệu công cụ tự kiểm tra (theo phụ huynh/học sinh) |
| `cases.ts` | Năm trường hợp |
| `diagnostic.ts` | Câu hỏi và **quy tắc chấm** |
| `results.ts` | Giải thích kết quả và 3 việc làm tại nhà |
| `compare.ts`, `process.ts`, `ai-demo.ts` | So sánh, quy trình, demo AI |
| `profile.ts`, `resources.ts`, `plans.ts`, `faq.ts` | Người đồng hành, tài liệu, gói, hỏi đáp |
| `testimonials.ts` | Cảm nhận. Mảng rỗng thì phần này ẩn. Chỉ thêm khi có sự đồng ý của người viết |

## Danh sách TODO cho HUB

- `site.founderPhoto`: ảnh của HUB (đặt file vào `public/`, ví dụ `"/hub.jpg"`)
- `site.founderNote`: "Lời của người sáng lập" (HUB tự viết)
- `site.pricing`, `plans[].price`: học phí (đang hiện "Liên hệ để được tư vấn")
- `site.deliveryMode`: học online hay trực tiếp; `site.serviceArea`: khu vực
- `process.ts` → `duration`: thời lượng từng chặng
- `site.FORM_ENDPOINT`: Google Form/Formspree nếu muốn có nút gửi biểu mẫu
- `testimonials.ts`: cảm nhận thật
- `results.ts`: đọc lại các việc làm tại nhà; gắn link tài liệu riêng cho từng trường hợp
- Duyệt danh sách câu hỏi trong `DECISIONS.md`
