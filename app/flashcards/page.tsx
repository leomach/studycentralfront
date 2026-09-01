"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import {
  useFlashcards,
  useSubjects,
  type FlashcardFilter,
} from "@/lib/api/queries";
import type { Flashcard, FlashcardState } from "@/lib/api/types";
import { db } from "@/lib/db/schema";
import { removeDraft } from "@/lib/db/outbox";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { subjectPath } from "@/lib/format";
import { cn } from "@/lib/cn";

const ESTADOS = [
  { value: "", label: "Todos os estados" },
  { value: "vencido", label: "Vencido" },
  { value: "aprendizado", label: "Em aprendizado" },
  { value: "maduro", label: "Maduro" },
];

const estadoCor: Record<FlashcardState, string> = {
  vencido: "text-due",
  aprendizado: "text-muted",
  maduro: "text-correct",
};

function estadoLabel(fc: Flashcard): FlashcardState {
  if (fc.review && new Date(fc.review.due_date).getTime() <= Date.now())
    return "vencido";
  if (!fc.review || fc.review.interval_days < 21) return "aprendizado";
  return "maduro";
}

export default function FlashcardsPage() {
  const [filter, setFilter] = useState<FlashcardFilter>({});
  const subjects = useSubjects();
  const { data: cards = [], isLoading } = useFlashcards(filter);

  // Fila de rascunhos, alimentada durante a sessão (§6.4). Vem do Dexie local.
  const drafts = useLiveQuery(
    () => db().drafts.orderBy("created_at").toArray(),
    [],
    [],
  );

  const subjectOptions = useMemo(
    () =>
      (subjects.data ?? []).map((s) => ({
        value: String(s.id),
        label: subjectPath(s.id, subjects.data ?? []),
      })),
    [subjects.data],
  );

  return (
    <main className="mx-auto max-w-3xl px-4 pt-6 pb-16">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-enunciado text-ink">Flashcards</h1>
        <Link href="/flashcards/novo">
          <Button>Novo card</Button>
        </Link>
      </div>

      {/* Rascunhos a completar. */}
      {drafts.length > 0 && (
        <section className="mb-6 border border-due/40 rounded-surface p-4 bg-due/5">
          <p className="text-secundario text-due mb-2">
            {drafts.length} {drafts.length === 1 ? "rascunho" : "rascunhos"} para
            criar
          </p>
          <ul className="flex flex-col gap-2">
            {drafts.map((d) => (
              <li
                key={d.local_id}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-secundario text-ink line-clamp-1">
                  {d.front}
                </span>
                <div className="flex gap-2 shrink-0">
                  <Link href={`/flashcards/novo?draft=${d.local_id}`}>
                    <Button variant="secondary">Completar</Button>
                  </Link>
                  <button
                    onClick={() => removeDraft(d.local_id)}
                    className="text-rotulo text-muted px-2"
                    aria-label="Descartar rascunho"
                  >
                    Descartar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Select
          label="Eixo"
          placeholder="Todos"
          options={subjectOptions}
          value={filter.subject_id ? String(filter.subject_id) : ""}
          onChange={(e) =>
            setFilter((f) => ({
              ...f,
              subject_id: e.target.value ? Number(e.target.value) : undefined,
            }))
          }
        />
        <Select
          label="Estado"
          options={ESTADOS}
          value={filter.state ?? ""}
          onChange={(e) =>
            setFilter((f) => ({
              ...f,
              state: (e.target.value || undefined) as
                | FlashcardState
                | undefined,
            }))
          }
        />
      </div>

      {isLoading ? (
        <p className="text-muted text-corpo">Carregando…</p>
      ) : cards.length === 0 ? (
        <p className="text-muted text-corpo">Nenhum flashcard.</p>
      ) : (
        <ul className="divide-y divide-rule">
          {cards.map((fc) => {
            const estado = estadoLabel(fc);
            return (
              <li key={fc.id}>
                <Link href={`/flashcards/${fc.id}`} className="block py-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-corpo text-ink line-clamp-2">
                      {fc.front}
                    </p>
                    <span
                      className={cn(
                        "text-rotulo shrink-0",
                        estadoCor[estado],
                      )}
                    >
                      {estado}
                    </span>
                  </div>
                  <p className="text-secundario text-muted mt-1">
                    {fc.kind === "resumo" ? "Resumo" : "Pergunta"} ·{" "}
                    {subjectPath(fc.subject_id, subjects.data ?? [])}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
