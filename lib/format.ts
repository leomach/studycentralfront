// Utilitários de formatação e derivação de dados de catálogo.
import type { Subject } from "./api/types";

export function pct(correct: number, answered: number): number {
  if (answered === 0) return 0;
  return Math.round((correct / answered) * 100);
}

/** "mm:ss" para o cronômetro regressivo, a partir de segundos. */
export function mmss(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

/** Intervalo em dias para os botões de flashcard ("1 d", "12 d"). */
export function dias(n: number): string {
  return `${n} d`;
}

/** Caminho hierárquico de um eixo: "Direito › Constitucional › Fundamentais". */
export function subjectPath(id: number, subjects: Subject[]): string {
  const byId = new Map(subjects.map((s) => [s.id, s]));
  const parts: string[] = [];
  let cur = byId.get(id);
  let guard = 0;
  while (cur && guard++ < 20) {
    parts.unshift(cur.name);
    cur = cur.parent_id ? byId.get(cur.parent_id) : undefined;
  }
  return parts.join(" › ");
}

/** Rótulo curto de um eixo (só o nome da folha). */
export function subjectName(id: number, subjects: Subject[]): string {
  return subjects.find((s) => s.id === id)?.name ?? "—";
}
