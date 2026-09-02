// Tipos da API — espelham os structs do backend Go tal como ele existe hoje
// (CLAUDE.md §1.1 e §8), não a especificação original.
//
// DIVERGÊNCIA CORRIGIDA (ver auditoria de 2026-09-01): a versão anterior deste
// arquivo assumia um contrato que o backend real nunca implementou —
// given_answer/attempted_at em vez de answer/created_at, alternatives como
// string[] em vez de {key,text}[], exam_year embutido na questão, review
// aninhado por padrão, fila com question/flashcard aninhados em vez de
// content achatado, overview com streak/volume diário. Este arquivo foi
// reescrito para bater com o Go; ver studycentralback/internal/*/model.go.

export type ID = number;

// ---- Conta (GET /api/me) ----

export type Plan = "free" | "premium";

export interface AuthUser {
  id: ID;
  name: string;
  email: string;
  plan: Plan;
  // Papel de administrar CONTAS (não confundir com "dono do catálogo", que
  // não existe — ver CLAUDE.md do backend). Concedido uma vez via bootstrap
  // (ADMIN_SECRET) e dali em diante gerenciável pelo próprio painel /admin.
  is_admin: boolean;
}

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

// Uma alternativa por posição, com uma chave estável (tipicamente "a".."e")
// que é o valor comparado contra `correct_answer` — não o índice na lista.
export interface Alternative {
  key: string;
  text: string;
}

export interface Question {
  id: ID;
  subject_id: ID;
  banca_id: ID | null;
  exam_id: ID | null;
  format: QuestionFormat;
  statement: string;
  // Múltipla escolha: uma entrada por alternativa. Certo/errado: vazio.
  alternatives: Alternative[];
  // A key da alternativa correta (múltipla escolha) ou "certo" | "errado".
  correct_answer: string;
}

export type Confidence = "certeza" | "duvida" | "chute";

export interface Attempt {
  id: ID;
  question_id: ID;
  answer: string;
  is_correct: boolean;
  confidence: Confidence;
  created_at: string; // ISO
}

export interface AttemptInput {
  answer: string;
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
  // Presente quando o card vem de GET /flashcards (join no backend) ou de um
  // item de flashcard sintetizado a partir da fila do dia. Ausente só é
  // teoricamente possível (Create grava os dois juntos no backend).
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
  last_grade: number;
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

// Em inglês porque é o valor literal que o backend envia — não traduzimos o
// enum na borda, só o rótulo exibido na UI.
export type QueueItemKind = "question" | "flashcard";

// O conteúdo do item, achatado (não aninhado como Question/Flashcard) porque
// é assim que o backend serializa: um único objeto com os campos que existirem
// conforme `kind` (as chaves do outro tipo vêm ausentes/undefined).
export interface QueueContent {
  // Flashcard
  card_kind?: FlashcardKind;
  front?: string;
  back?: string;
  interval_days?: number;
  ease_factor?: number;
  lapses?: number;
  reps?: number;

  // Questão
  banca_id?: ID;
  exam_id?: ID;
  format?: QuestionFormat;
  statement?: string;
  alternatives?: Alternative[];
  correct_answer?: string;
}

export interface QueueItem {
  kind: QueueItemKind;
  id: ID; // question_id ou flashcard_id conforme `kind`
  subject_id: ID;
  subject_name: string;
  score: number;
  reasons: string[];
  estimated_seconds: number;
  content: QueueContent;
}

export interface StudyQueue {
  minutes: number;
  items: QueueItem[];
}

// ---- Dashboard ----

export interface SubjectAccuracy {
  subject_id: ID;
  subject_name: string;
  attempts: number;
  correct: number;
  accuracy: number; // 0..1, já calculado pelo servidor
}

export interface ExamAccuracy {
  exam_id: ID;
  exam_name: string;
  attempts: number;
  correct: number;
  accuracy: number;
}

export interface ConfidenceAccuracy {
  confidence: Confidence;
  attempts: number;
  correct: number;
  accuracy: number;
}

export interface FlashcardHealth {
  due: number;
  mature: number;
  total: number;
}

export interface VolumeOverview {
  last_7_days: number;
  last_30_days: number;
}

export interface DashboardOverview {
  flashcards: FlashcardHealth;
  subjects: SubjectAccuracy[];
  exams: ExamAccuracy[];
  confidence: ConfidenceAccuracy[];
  volume: VolumeOverview;
}
