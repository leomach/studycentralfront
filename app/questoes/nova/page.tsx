"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBancas, useExams, useSubjects } from "@/lib/api/queries";
import { useCreateQuestion } from "@/lib/api/mutations";
import type { QuestionFormat } from "@/lib/api/types";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { subjectPath } from "@/lib/format";

function letterKey(i: number): string {
  return String.fromCharCode(97 + i); // "a", "b", "c"...
}

// Cadastro de questão (cenário secundário: desktop, cadastro em lote).
// Sem campo de ano: o ano vive em Exam, não em Question (o backend não tem
// essa coluna — ver auditoria de 2026-09-01).
export default function NovaQuestaoPage() {
  const router = useRouter();
  const subjects = useSubjects();
  const bancas = useBancas();
  const exams = useExams();
  const create = useCreateQuestion();

  const [subjectId, setSubjectId] = useState("");
  const [bancaId, setBancaId] = useState("");
  const [examId, setExamId] = useState("");
  const [format, setFormat] = useState<QuestionFormat>("certo_errado");
  const [statement, setStatement] = useState("");
  const [alternatives, setAlternatives] = useState<string[]>(["", "", "", "", ""]);
  // Para certo_errado: "certo"/"errado". Para múltipla escolha: a key da
  // alternativa (letra), sempre estável por posição — nunca reindexada por
  // filtro de alternativas vazias.
  const [correct, setCorrect] = useState("certo");

  const canSave = subjectId !== "" && statement.trim() !== "";

  const save = async () => {
    if (!canSave) return;
    await create.mutateAsync({
      subject_id: Number(subjectId),
      banca_id: bancaId ? Number(bancaId) : null,
      exam_id: examId ? Number(examId) : null,
      format,
      statement: statement.trim(),
      alternatives:
        format === "multipla_escolha"
          ? alternatives
              .map((text, i) => ({ key: letterKey(i), text: text.trim() }))
              .filter((a) => a.text !== "")
          : [],
      correct_answer: correct,
    });
    router.push("/questoes");
  };

  return (
    <main className="mx-auto max-w-leitura px-4 pt-6 pb-16 flex flex-col gap-4">
      <h1 className="text-enunciado text-ink">Nova questão</h1>

      <Select
        label="Eixo temático"
        placeholder="Selecione"
        options={(subjects.data ?? []).map((s) => ({
          value: String(s.id),
          label: subjectPath(s.id, subjects.data ?? []),
        }))}
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Banca"
          placeholder="—"
          options={(bancas.data ?? []).map((b) => ({
            value: String(b.id),
            label: b.name,
          }))}
          value={bancaId}
          onChange={(e) => setBancaId(e.target.value)}
        />
        <Select
          label="Concurso"
          placeholder="—"
          options={(exams.data ?? []).map((e) => ({
            value: String(e.id),
            label: `${e.name} (${e.year})`,
          }))}
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
        />
      </div>

      <Select
        label="Formato"
        options={[
          { value: "certo_errado", label: "Certo/Errado" },
          { value: "multipla_escolha", label: "Múltipla escolha" },
        ]}
        value={format}
        onChange={(e) => {
          const f = e.target.value as QuestionFormat;
          setFormat(f);
          setCorrect(f === "certo_errado" ? "certo" : letterKey(0));
        }}
      />

      <Textarea
        label="Enunciado"
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
        rows={5}
      />

      {format === "certo_errado" ? (
        <Select
          label="Gabarito"
          options={[
            { value: "certo", label: "Certo" },
            { value: "errado", label: "Errado" },
          ]}
          value={correct}
          onChange={(e) => setCorrect(e.target.value)}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {alternatives.map((alt, i) => (
            <Input
              key={i}
              label={`Alternativa ${letterKey(i).toUpperCase()}`}
              value={alt}
              onChange={(e) =>
                setAlternatives((prev) =>
                  prev.map((a, j) => (j === i ? e.target.value : a)),
                )
              }
            />
          ))}
          <Select
            label="Alternativa correta"
            options={alternatives.map((_, i) => ({
              value: letterKey(i),
              label: letterKey(i).toUpperCase(),
            }))}
            value={correct}
            onChange={(e) => setCorrect(e.target.value)}
          />
        </div>
      )}

      <div className="flex gap-2 mt-2">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
        <Button
          className="flex-1"
          onClick={save}
          disabled={!canSave || create.isPending}
        >
          {create.isPending ? "Salvando…" : "Salvar"}
        </Button>
      </div>
    </main>
  );
}
