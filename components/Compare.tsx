import { compareNote, compareRows } from "@/content/compare";

export function Compare() {
  return (
    <section id="so-sanh" className="section bg-surface2">
      <div className="container-x">
        <p className="eyebrow">Mentor khác gia sư thế nào</p>
        <h2 className="h2 mt-2">Hai vai trò khác nhau, mỗi vai trò hợp với một tình huống</h2>

        {/* Bảng trên màn rộng */}
        <div className="card mt-8 hidden overflow-hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">So sánh gia sư truyền thống và mentor định hướng tự học</caption>
            <thead>
              <tr className="bg-navy text-white">
                <th scope="col" className="w-48 p-4"><span className="sr-only">Tiêu chí</span></th>
                <th scope="col" className="p-4 font-semibold">Gia sư truyền thống</th>
                <th scope="col" className="p-4 font-semibold">Mentor EduNavigator</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((r) => (
                <tr key={r.label} className="border-t border-line align-top">
                  <th scope="row" className="p-4 font-semibold">{r.label}</th>
                  <td className="p-4 text-muted">{r.tutor}</td>
                  <td className="p-4">{r.mentor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Thẻ trên điện thoại */}
        <ul className="mt-8 space-y-4 md:hidden">
          {compareRows.map((r) => (
            <li key={r.label} className="card p-5">
              <p className="font-display text-lg font-semibold">{r.label}</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-muted">Gia sư truyền thống</p>
              <p className="text-muted">{r.tutor}</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-accenttext">Mentor EduNavigator</p>
              <p>{r.mentor}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-muted">{compareNote}</p>
      </div>
    </section>
  );
}
