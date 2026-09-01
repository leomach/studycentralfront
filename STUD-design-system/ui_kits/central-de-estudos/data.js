// Mock content lifted from leomach/studycentralfront lib/api/mocks/data.ts.
window.STUD_DATA = {
  subjects: [
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
  ],
  bancas: [{ id: 1, name: "Cebraspe" }, { id: 2, name: "FGV" }, { id: 3, name: "FCC" }],
  exams: [
    { id: 1, name: "TRF1 — Analista Judiciário", banca_id: 1, year: 2024 },
    { id: 2, name: "TJ-SP — Escrevente", banca_id: 2, year: 2023 },
    { id: 3, name: "Receita Federal — Auditor", banca_id: 3, year: 2023 },
  ],
  questions: [
    { id: 1, subject_id: 5, banca_id: 1, exam_year: 2024, format: "certo_errado", statement: "Os direitos e garantias fundamentais previstos na Constituição Federal têm aplicação imediata.", alternatives: [], correct_answer: "certo" },
    { id: 2, subject_id: 7, banca_id: 2, exam_year: 2023, format: "multipla_escolha", statement: "Sobre a revogação e a anulação dos atos administrativos, assinale a alternativa correta.", alternatives: ["A anulação pode ser feita apenas pelo Poder Judiciário.", "A revogação decorre de vício de legalidade.", "A anulação opera efeitos ex tunc, retroagindo à origem do ato.", "A revogação opera efeitos ex tunc.", "Atos vinculados podem ser revogados por conveniência."], correct_answer: "2" },
    { id: 3, subject_id: 4, banca_id: 3, exam_year: 2023, format: "certo_errado", statement: "A competência tributária é indelegável, mas a capacidade tributária ativa pode ser delegada.", alternatives: [], correct_answer: "certo" },
    { id: 4, subject_id: 8, banca_id: 1, exam_year: 2024, format: "multipla_escolha", statement: "Na modalidade pregão, o critério de julgamento é, em regra, o de:", alternatives: ["melhor técnica", "técnica e preço", "menor preço", "maior lance", "melhor proposta artística"], correct_answer: "2" },
    { id: 5, subject_id: 10, banca_id: 2, exam_year: 2023, format: "certo_errado", statement: 'Na frase "Fazem dez anos que ele partiu", o verbo fazer está corretamente flexionado.', alternatives: [], correct_answer: "errado" },
  ],
  flashcards: [
    { id: 1, subject_id: 5, kind: "pergunta_resposta", state: "vencido", front: "Direitos fundamentais têm aplicação imediata?", back: "Sim — art. 5º, §1º da CF: as normas definidoras de direitos e garantias fundamentais têm aplicação imediata.", intervals: { 1: 1, 2: 3, 3: 8, 4: 12 } },
    { id: 2, subject_id: 4, kind: "resumo", state: "vencido", front: "Competência × capacidade tributária", back: "Competência tributária: poder de instituir tributo (indelegável). Capacidade tributária ativa: arrecadar/fiscalizar (delegável).", intervals: { 1: 1, 2: 2, 3: 5, 4: 9 } },
    { id: 3, subject_id: 8, kind: "pergunta_resposta", state: "maduro", front: "Critério de julgamento padrão do pregão?", back: "Menor preço.", intervals: { 1: 1, 2: 4, 3: 10, 4: 18 } },
  ],
  drafts: [{ local_id: "d1", front: "Na modalidade pregão, o critério de julgamento é, em regra, o de:" }],
  dashboard: {
    due_today: 6, suggested_questions: 9, streak_days: 18, questions_last_7d: 41, accuracy_last_7d: 0.74,
    accuracy_by_subject: [
      { subject_id: 8, subject_name: "Licitações", answered: 20, correct: 9 },
      { subject_id: 10, subject_name: "Concordância", answered: 14, correct: 8 },
      { subject_id: 7, subject_name: "Atos Administrativos", answered: 18, correct: 12 },
      { subject_id: 4, subject_name: "Direito Tributário", answered: 25, correct: 19 },
      { subject_id: 5, subject_name: "Direitos Fundamentais", answered: 21, correct: 17 },
    ],
    accuracy_by_exam: [
      { id: 1, name: "TRF1 — Analista", answered: 32, correct: 21 },
      { id: 2, name: "TJ-SP — Escrevente", answered: 24, correct: 18 },
      { id: 3, name: "Receita — Auditor", answered: 12, correct: 7 },
    ],
    accuracy_by_banca: [
      { id: 1, name: "Cebraspe", answered: 40, correct: 29 },
      { id: 2, name: "FGV", answered: 21, correct: 15 },
      { id: 3, name: "FCC", answered: 7, correct: 4 },
    ],
    volume_30d: [3,5,0,8,12,6,9,14,4,0,7,11,9,13,6,2,8,10,15,7,4,9,12,6,11,8,3,10,14,9].map((n, i) => ({ date: "d" + i, questions: n, reviews: Math.round(n * 0.6) })),
    flashcard_health: { vencido: 6, aprendizado: 11, maduro: 23 },
  },
};

window.STUD_HELP = {
  subjectPath(id, subjects) {
    const byId = new Map(subjects.map((s) => [s.id, s]));
    const parts = [];
    let cur = byId.get(id), guard = 0;
    while (cur && guard++ < 20) { parts.unshift(cur.name); cur = cur.parent_id ? byId.get(cur.parent_id) : undefined; }
    return parts.join(" › ");
  },
  pct(correct, answered) { return answered === 0 ? 0 : Math.round((correct / answered) * 100); },
};
