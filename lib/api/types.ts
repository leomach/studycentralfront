// Tipos da API — espelham os structs do backend Go (CLAUDE.md §1.1 e §8).
// Nomes de domínio em português; nomes técnicos em inglês (§9).

export type ID = number;

// ---- Catálogo ----

export interface Subject {
  id: ID;
  parent_id: ID | null;
  name: string;
}

export interface Banca {
  id: ID;
  name: string;
}

export interface Exam {
  id: ID;
  name: string;
  banca_id: ID;
  year: number;
}

// ---- Questões ----

export type QuestionFormat = "certo_errado" | "multipla_escolha";

export interface Question {
  id: ID;
  subject_id: ID;
  banca_id: ID | null;
  exam_id: ID | null;
  exam_year: number | null;
  format: QuestionFormat;
  statement: string;
  // Múltipla escolha: uma alternativa por posição (A..E). Certo/errado: vazio.
  alternatives: string[];
  // Índice da alternativa correta (múltipla escolha) ou "certo" | "errado".
  correct_answer: string;
}

export type Confidence = "certeza" | "duvida" | "chute";

export interface Attempt {
  id: ID;
  question_id: ID;
  given_answer: string;
  is_correct: boolean;
  confidence: Confidence;
  attempted_at: string; // ISO
}

export interface AttemptInput {
  given_answer: string;
  confidence: Confidence;
  client_id: string; // UUID de idempotência (§7)
}

// ---- Flashcards ----

export type FlashcardKind = "pergunta_resposta" | "resumo";
export type FlashcardState = "vencido" | "aprendizado" | "maduro";

export interface Flashcard {
  id: ID;
  subject_id: ID;
  source_question_id: ID | null;
  kind: FlashcardKind;
  front: string;
  back: string;
  review?: FlashcardReview;
}

export interface FlashcardReview {
  id: ID;
  flashcard_id: ID;
  due_date: string; // ISO
  interval_days: number;
  ease_factor: number;
  reps: number;
  lapses: number;
  last_reviewed_at: string | null;
}

export interface FlashcardInput {
  subject_id: ID;
  kind: FlashcardKind;
  front: string;
  back: string;
  source_question_id?: ID | null;
}

// grade 1..4 (§1.1 / §7)
export type Grade = 1 | 2 | 3 | 4;

export interface ReviewInput {
  grade: Grade;
  client_id: string;
}

// ---- Fila do dia ----

export type QueueItemKind = "questao" | "flashcard";

export interface QueueItem {
  kind: QueueItemKind;
  // Exatamente um destes vem preenchido conforme `kind`.
  question?: Question;
  flashcard?: Flashcard;
  // Por que o item entrou na fila (§1.1 — exibir discretamente).
  reasons: string[];
}

export interface StudyQueue {
  minutes: number;
  items: QueueItem[];
}

// ---- Dashboard ----

export interface SubjectAccuracy {
  subject_id: ID;
  subject_name: string;
  answered: number;
  correct: number;
}

export interface NamedAccuracy {
  id: ID;
  name: string;
  answered: number;
  correct: number;
}

export interface VolumePoint {
  date: string; // YYYY-MM-DD
  questions: number;
  reviews: number;
}

export interface FlashcardHealth {
  vencido: number;
  aprendizado: number;
  maduro: number;
}

export interface DashboardOverview {
  // Bloco de início.
  due_today: number;
  suggested_questions: number;
  streak_days: number;
  questions_last_7d: number;
  accuracy_last_7d: number; // 0..1
  // Blocos de desempenho.
  accuracy_by_subject: SubjectAccuracy[];
  accuracy_by_exam: NamedAccuracy[];
  accuracy_by_banca: NamedAccuracy[];
  volume_30d: VolumePoint[];
  flashcard_health: FlashcardHealth;
}
