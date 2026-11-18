import { freqLabels, questions, scoring, type Grade } from "@/content/diagnostic";
import type { CaseId } from "@/content/types";

export type Answers = Record<string, number>; // questionId -> level 0..3 (theo thứ tự hiển thị)

export function visibleQuestions(grade: Grade | null) {
  return questions.filter((q) => !q.onlyGrade || (grade && q.onlyGrade.includes(grade)));
}

export function optionsOf(q: (typeof questions)[number]) {
  return q.options ?? freqLabels;
}

export function score(grade: Grade, answers: Answers): { top: CaseId[]; shares: Record<CaseId, number> } {
  const ids: CaseId[] = ["pressure", "gaps", "inefficient", "nomentor", "grade5"];
  const got: Record<string, number> = {};
  const max: Record<string, number> = {};
  for (const q of visibleQuestions(grade)) {
    const lvl = answers[q.id] ?? 0;
    const eff = q.reverse ? 3 - lvl : lvl;
    for (const [c, w] of Object.entries(q.weights)) {
      got[c] = (got[c] ?? 0) + eff * (w ?? 0);
      max[c] = (max[c] ?? 0) + 3 * (w ?? 0);
    }
  }
  const shares = {} as Record<CaseId, number>;
  for (const c of ids) {
    let s = max[c] ? (got[c] ?? 0) / max[c] : 0;
    if (c === "grade5") s = grade === "5" ? scoring.grade5Base + (1 - scoring.grade5Base) * s : 0;
    shares[c] = s;
  }
  const best = Math.max(...Object.values(shares));
  const top = ids
    .filter((c) => shares[c] >= scoring.minShare && shares[c] >= scoring.closeToTop * best)
    .sort((a, b) => shares[b] - shares[a])
    .slice(0, scoring.maxCases);
  return { top, shares };
}
