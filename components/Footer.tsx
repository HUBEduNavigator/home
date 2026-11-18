import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-navy px-5 pb-28 pt-14 text-white md:pb-14">
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">{site.name}</p>
          <p className="mt-2 text-white/80">{site.slogan}</p>
        </div>
        <div>
          <p className="font-semibold">Liên hệ và liên kết</p>
          <ul className="mt-3 space-y-2 text-white/90">
            <li><a className="underline underline-offset-4" href={site.zaloUrl} target="_blank" rel="noopener noreferrer">Zalo {site.zaloNumber}</a></li>
            <li><a className="underline underline-offset-4" href={site.bioUrl} target="_blank" rel="noopener noreferrer">Trang giới thiệu của HUB</a></li>
            <li><a className="underline underline-offset-4" href={site.docsUrl} target="_blank" rel="noopener noreferrer">Web tài liệu tự học</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Chính sách bảo mật</p>
          <p className="mt-3 text-white/80">
            Web này không có máy chủ và không lưu thông tin của bạn: câu trả lời tự kiểm tra và thông tin đặt lịch chỉ nằm trên máy bạn. Thông tin chỉ được gửi đi khi chính bạn bấm gửi qua Zalo.
          </p>
        </div>
      </div>
      <p className="container-x mt-10 border-t border-white/20 pt-6 text-sm text-white/70">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
