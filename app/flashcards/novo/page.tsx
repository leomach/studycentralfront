"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSubjects } from "@/lib/api/queries";
import { useCreateFlashcard } from "@/lib/api/mutations";
import { removeDraft } from "@/lib/db/outbox";
import { db } from "@/lib/db/schema";
import type { FlashcardKind } from "@/lib/api/types";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { subjectPath } from "@/lib/format";

export default function NovoFlashcardPage() {
  return (
    <Suspense fallback={null}>
      <NovoFlashcard />
    </Suspense>
  );
}

function NovoFlashcard() {
  const router = useRouter();
  const params = useSearchParams();
  const draftId = params.get("draft");
  const subjects = useSubjects();
  const create = useCreateFlashcard();

  const [kind, setKind] = useState<FlashcardKind>("pergunta_resposta");
  const [subjectId, setSubjectId] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [sourceQuestionId, setSourceQuestionId] = useState<number | null>(null);

  // Pré-preenche a partir de um rascunho marcado na sessão (§6.2 passo 5).
  useEffect(() => {
    if (!draftId) return;
    void db()
      .drafts.get(draftId)
      .then((d) => {
        if (!d) return;
        setFront(d.front);
        setBack(d.back);
        setSourceQuestionId(d.source_question_id);
        if (d.subject_id) setSubjectId(String(d.subject_id));
      });
  }, [draftId]);

  const canSave = subjectId !== "" && front.trim() !== "";

  const save = async () => {
    if (!canSave) return;
    await create.mutateAsync({
      subject_id: Number(subjectId),
      kind,
      front: front.trim(),
      back: back.trim(),
      source_question_id: sourceQuestionId,
    });
    if (draftId) await removeDraft(draftId);
    router.push("/flashcards");
  };

  return (
    <main className="mx-auto max-w-leitura px-4 pt-6 pb-16 flex flex-col gap-4">
      <h1 className="text-enunciado text-ink">Novo flashcard</h1>

      <Select
        label="Tipo"
        options={[
          { value: "pergunta_resposta", label: "Pergunta / resposta" },
          { value: "resumo", label: "Resumo" },
        ]}
        value={kind}
        onChange={(e) => setKind(e.target.value as FlashcardKind)}
      />

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

      <Textarea
        label={kind === "resumo" ? "Título" : "Frente (pergunta)"}
        value={front}
        onChange={(e) => setFront(e.target.value)}
        rows={3}
      />
      <Textarea
        label={kind === "resumo" ? "Conteúdo" : "Verso (resposta)"}
        value={back}
        onChange={(e) => setBack(e.target.value)}
        rows={5}
      />

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
