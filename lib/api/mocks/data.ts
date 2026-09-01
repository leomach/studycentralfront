// Dados de mock PROVISÓRIOS (CLAUDE.md §8). Não é o contrato — é andaime para
// rodar o app sem o backend Go. Coerente o bastante para exercitar todas as
// telas: árvore de eixos, bancas, concursos, questões, flashcards e fila.

import type {
  Banca,
  Exam,
  Flashcard,
  Question,
  Subject,
} from "../types";

export const subjects: Subject[] = [
  { id: 1, parent_id: null, name: "Direito" },
  { id: 2, parent_id: 1, name: "Direito Constitucional" },
  { id: 3, parent_id: 1, name: "Direito Administrativo" },
  { id: 4, parent_id: 1, name: "Direito Tributário" },
  { id: 5, parent_id: 2, name: "Direitos Fundamentais" },
  { id: 6, parent_id: 2, name: "Organização do Estado" },
  { id: 7, parent_id: 3, name: "Atos Administrativos" },
  { id: 8, parent_id: 3, name: "Licitações" },
  { id: 9, parent_id: null, name: "Português" },
  { id: 10, parent_id: 9, name: "Concordância" },
];

export const bancas: Banca[] = [
  { id: 1, name: "Cebraspe" },
  { id: 2, name: "FGV" },
  { id: 3, name: "FCC" },
];

export const exams: Exam[] = [
  { id: 1, name: "TRF1 — Analista Judiciário", banca_id: 1, year: 2024 },
  { id: 2, name: "TJ-SP — Escrevente", banca_id: 2, year: 2023 },
  { id: 3, name: "Receita Federal — Auditor", banca_id: 3, year: 2023 },
];

export const questions: Question[] = [
  {
    id: 1,
    subject_id: 5,
    banca_id: 1,
    exam_id: 1,
    format: "certo_errado",
    statement:
      "Os direitos e garantias fundamentais previstos na Constituição Federal têm aplicação imediata.",
    alternatives: [],
    correct_answer: "certo",
  },
  {
    id: 2,
    subject_id: 7,
    banca_id: 2,
    exam_id: 2,
    format: "multipla_escolha",
    statement:
      "Sobre a revogação e a anulação dos atos administrativos, assinale a alternativa correta.",
    alternatives: [
      { key: "a", text: "A anulação pode ser feita apenas pelo Poder Judiciário." },
      { key: "b", text: "A revogação decorre de vício de legalidade." },
      { key: "c", text: "A anulação opera efeitos ex tunc, retroagindo à origem do ato." },
      { key: "d", text: "A revogação opera efeitos ex tunc." },
      { key: "e", text: "Atos vinculados podem ser revogados por conveniência." },
    ],
    correct_answer: "c",
  },
  {
    id: 3,
    subject_id: 4,
    banca_id: 3,
    exam_id: 3,
    format: "certo_errado",
    statement:
      "A competência tributária é indelegável, mas a capacidade tributária ativa pode ser delegada.",
    alternatives: [],
    correct_answer: "certo",
  },
  {
    id: 4,
    subject_id: 8,
    banca_id: 1,
    exam_id: 1,
    format: "multipla_escolha",
    statement:
      "Na modalidade pregão, o critério de julgamento é, em regra, o de:",
    alternatives: [
      { key: "a", text: "melhor técnica" },
      { key: "b", text: "técnica e preço" },
      { key: "c", text: "menor preço" },
      { key: "d", text: "maior lance" },
      { key: "e", text: "melhor proposta artística" },
    ],
    correct_answer: "c",
  },
  {
    id: 5,
    subject_id: 10,
    banca_id: 2,
    exam_id: 2,
    format: "certo_errado",
    statement:
      'Na frase "Fazem dez anos que ele partiu", o verbo fazer está corretamente flexionado.',
    alternatives: [],
    correct_answer: "errado",
  },
];

export const flashcards: Flashcard[] = [
  {
    id: 1,
    subject_id: 5,
    source_question_id: 1,
    kind: "pergunta_resposta",
    front: "Direitos fundamentais têm aplicação imediata?",
    back: "Sim — art. 5º, §1º da CF: as normas definidoras de direitos e garantias fundamentais têm aplicação imediata.",
    review: {
      id: 1,
      flashcard_id: 1,
      due_date: new Date(Date.now() - 86400000).toISOString(),
      interval_days: 4,
      ease_factor: 2.5,
      reps: 3,
      lapses: 0,
      last_grade: 3,
    },
  },
  {
    id: 2,
    subject_id: 4,
    source_question_id: null,
    kind: "resumo",
    front: "Competência × capacidade tributária",
    back: "Competência tributária: poder de instituir tributo (indelegável). Capacidade tributária ativa: arrecadar/fiscalizar (delegável).",
    review: {
      id: 2,
      flashcard_id: 2,
      due_date: new Date(Date.now() - 2 * 86400000).toISOString(),
      interval_days: 2,
      ease_factor: 2.3,
      reps: 1,
      lapses: 1,
      last_grade: 1,
    },
  },
  {
    id: 3,
    subject_id: 8,
    source_question_id: 4,
    kind: "pergunta_resposta",
    front: "Critério de julgamento padrão do pregão?",
    back: "Menor preço.",
    review: {
      id: 3,
      flashcard_id: 3,
      due_date: new Date(Date.now() + 3 * 86400000).toISOString(),
      interval_days: 8,
      ease_factor: 2.6,
      reps: 4,
      lapses: 0,
      last_grade: 3,
    },
  },
];
