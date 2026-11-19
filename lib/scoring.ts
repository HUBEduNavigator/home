import { freqLabels, questions, scoring, type Grade } from "@/content/diagnostic";
import type { CaseId } from "@/content/types";

export type Answers = Record<string, number>; // questionId -> level 0..3 (theo thứ tự hiển thị)

export function visibleQuestions(_grade?: Grade | null) {
  return questions;
}

export function optionsOf(q: (typeof questions)[number]) {
  return q.options ?? freqLabels;
}

export function score(_grade: Grade, answers: Answers): { top: CaseId[]; shares: Record<CaseId, number> } {
  const ids: CaseId[] = ["pressure", "gaps", "inefficient", "nomentor"];
  const got: Record<string, number> = {};
  const max: Record<string, number> = {};
  for (const q of visibleQuestions()) {
    const lvl = answers[q.id] ?? 0;
    const eff = q.reverse ? 3 - lvl : lvl;
    for (const [c, w] of Object.entries(q.weights)) {
      got[c] = (got[c] ?? 0) + eff * (w ?? 0);
      max[c] = (max[c] ?? 0) + 3 * (w ?? 0);
    }
  }
  const shares = {} as Record<CaseId, number>;
  for (const c of ids) {
    shares[c] = max[c] ? (got[c] ?? 0) / max[c] : 0;
  }
  const best = Math.max(...Object.values(shares));
  const top = ids
    .filter((c) => shares[c] >= scoring.minShare && shares[c] >= scoring.closeToTop * best)
    .sort((a, b) => shares[b] - shares[a])
    .slice(0, scoring.maxCases);
  return { top, shares };
}
