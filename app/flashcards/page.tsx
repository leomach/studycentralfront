"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { useFlashcards, useSubjects } from "@/lib/api/queries";
import type { Flashcard, FlashcardState } from "@/lib/api/types";
import { db } from "@/lib/db/schema";
import { removeDraft } from "@/lib/db/outbox";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Card, Canvas } from "@/components/ui/Card";
import { Badge, Chip } from "@/components/ui/Badge";
import { Face } from "@/components/ui/Face";
import { AppNav } from "@/components/AppNav";
import { subjectPath } from "@/lib/format";

const ESTADOS: { value: FlashcardState | ""; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "vencido", label: "Vencidos" },
  { value: "aprendizado", label: "Em aprendizado" },
  { value: "maduro", label: "Maduros" },
];

const ESTADO_BADGE: Record<FlashcardState, "vencido" | "aprendizado" | "maduro"> = {
  vencido: "vencido",
  aprendizado: "aprendizado",
  maduro: "maduro",
};

function estadoLabel(fc: Flashcard): FlashcardState {
  if (fc.review && new Date(fc.review.due_date).getTime() <= Date.now()) return "vencido";
  if (!fc.review || fc.review.interval_days < 21) return "aprendizado";
  return "maduro";
}

export default function FlashcardsPage() {
  const router = useRouter();
  const [subjectId, setSubjectId] = useState<number | undefined>(undefined);
  const [state, setState] = useState<FlashcardState | "">("");
  const subjects = useSubjects();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFlashcards(subjectId);
  const allCards = useMemo(() => data?.pages.flatMap((p) => p.items) ?? [], [data]);
  const total = data?.pages[0]?.total ?? 0;

  // O backend não filtra por estado (vencido/aprendizado/maduro) — ele é
  // derivado de `review`, que já vem embutido em cada card, então o filtro é
  // só uma seleção local sobre a lista já carregada (pode não cobrir todos os
  // cards do eixo enquanto houver página seguinte — daí o aviso abaixo).
  const cards = useMemo(
    () => (state ? allCards.filter((fc) => estadoLabel(fc) === state) : allCards),
    [allCards, state],
  );

  // Fila de rascunhos, alimentada durante a sessão (§6.4). Vem do Dexie local.
  const drafts = useLiveQuery(() => db().drafts.orderBy("created_at").toArray(), [], []);

  const subjectOptions = useMemo(
    () => (subjects.data ?? []).map((s) => ({ value: String(s.id), label: subjectPath(s.id, subjects.data ?? []) })),
    [subjects.data],
  );

  return (
    <Canvas tone="cream">
      <AppNav
        title="Flashcards"
        action={
          <Button size="sm" onClick={() => router.push("/flashcards/novo")}>
            Novo card
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto px-[var(--canvas-pad)] pb-16">
        {drafts.length > 0 && (
          <Card tone="sun" radius="lg" className="mb-6 flex flex-col gap-3">
            <p className="m-0 font-sans text-[14px] font-extrabold">
              {drafts.length} {drafts.length === 1 ? "rascunho" : "rascunhos"} para criar
            </p>
            <ul className="flex flex-col gap-2">
              {drafts.map((d) => (
                <li key={d.local_id} className="flex items-center justify-between gap-3">
                  <span className="line-clamp-1 font-sans text-[14px] font-bold">{d.front}</span>
                  <div className="flex flex-shrink-0 gap-2">
                    <Link href={`/flashcards/novo?draft=${d.local_id}`}>
                      <Button size="sm" variant="light">
                        Completar
                      </Button>
                    </Link>
                    <button
                      onClick={() => removeDraft(d.local_id)}
                      className="border-0 bg-transparent px-2 font-sans text-[13px] font-bold opacity-70"
                      aria-label="Descartar rascunho"
                    >
                      Descartar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <div className="flex flex-wrap gap-2">
          {ESTADOS.map((e) => (
            <Chip key={e.value} selected={state === e.value} onClick={() => setState(e.value)}>
              {e.label}
            </Chip>
          ))}
        </div>

        <div className="mt-4">
          <Select
            label="Eixo"
            placeholder="Todos"
            options={subjectOptions}
            value={subjectId ? String(subjectId) : ""}
            onChange={(e) => setSubjectId(e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>

        <div className="mt-6">
          {isLoading ? (
            <p className="font-sans text-[15px] font-bold opacity-60">Carregando…</p>
          ) : cards.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <Face mood="sleepy" size={100} />
              <p className="font-sans text-[15px] font-bold opacity-60">Nenhum flashcard.</p>
            </div>
          ) : (
            <>
              <p className="m-0 font-mono text-[13px] font-semibold opacity-55">
                {allCards.length} de {total} {total === 1 ? "card" : "cards"}
                {state && hasNextPage ? " · filtro aplicado só sobre os carregados" : ""}
              </p>
              <div className="mt-3 flex flex-col gap-3">
                {cards.map((fc) => {
                  const estado = estadoLabel(fc);
                  return (
                    <Link key={fc.id} href={`/flashcards/${fc.id}`}>
                      <Card tone="surface" radius="lg" className="flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <p className="m-0 line-clamp-2 font-sans text-[16px] font-bold leading-[1.4]">{fc.front}</p>
                          <Badge tone={ESTADO_BADGE[estado]}>{estado}</Badge>
                        </div>
                        <p className="m-0 font-mono text-[12px] opacity-55">
                          {fc.kind === "resumo" ? "resumo" : "pergunta"} ·{" "}
                          {subjectPath(fc.subject_id, subjects.data ?? [])}
                        </p>
                      </Card>
                    </Link>
                  );
                })}
              </div>
              {hasNextPage && (
                <Button
                  className="mt-4 w-full"
                  variant="outline"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Carregando…" : `Carregar mais (${total - allCards.length})`}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Canvas>
  );
}
