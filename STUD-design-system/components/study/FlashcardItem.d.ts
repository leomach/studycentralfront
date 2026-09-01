export type Grade = 1 | 2 | 3 | 4;

export interface FlashcardShape {
  kind: "pergunta_resposta" | "resumo";
  front: string;
  back: string;
}

/**
 * Full-screen flashcard: reveal the back, then grade 1–4 (2×2 grid, 72px targets).
 * @startingPoint section="Study" subtitle="Flashcard reveal and grading" viewport="420x740"
 */
export interface FlashcardItemProps {
  flashcard: FlashcardShape;
  meta?: string;
  reasons?: string[];
  /** Next-interval preview in days, keyed by grade (from the local SM-2 mirror). */
  intervals?: Record<Grade, number>;
  onGrade?: (grade: Grade) => void;
}

export function FlashcardItem(props: FlashcardItemProps): JSX.Element;
