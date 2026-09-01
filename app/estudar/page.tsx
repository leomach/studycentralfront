"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  Banca,
  Confidence,
  Exam,
  Grade,
  Subject,
} from "@/lib/api/types";
import { db, type QueuedItem } from "@/lib/db/schema";
import { readLocalQueue, prefetchAll } from "@/lib/sync/prefetch";
import { recordAttempt, recordReview } from "@/lib/study/record";
import { addDraft } from "@/lib/db/outbox";
import { subjectName, subjectPath } from "@/lib/format";
import { SessionHeader } from "@/components/sessao/SessionHeader";
import { QuestionItem } from "@/components/sessao/QuestionItem";
import { FlashcardItem } from "@/components/sessao/FlashcardItem";
import {
  SessionSummary,
  type SessionStats,
} from "@/components/sessao/SessionSummary";
import { Button } from "@/components/ui/Button";

interface Catalog {
  subjects: Subject[];
  bancas: Banca[];
  exams: Exam[];
}

type Phase = "loading" | "empty" | "running" | "done";

export default function EstudarPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted text-corpo">Preparando sessão…</p>
        </div>
      }
    >
      <Sessao />
    </Suspense>
  );
}

function Sessao() {
  const router = useRouter();
  const params = useSearchParams();
  const minutes = Number(params.get("minutes") ?? "40");

  const [phase, setPhase] = useState<Phase>("loading");
  const [items, setItems] = useState<QueuedItem[]>([]);
  const [index, setIndex] = useState(0);
  const [catalog, setCatalog] = useState<Catalog>({
    subjects: [],
    bancas: [],
    exams: [],
  });

  // Acumuladores para o resumo final.
  const startedAt = useRef<number>(0);
  const [elapsed, setElapsed] = useState(0);
  const stats = useRef<SessionStats>({
    total: 0,
    questionsAnswered: 0,
    questionsCorrect: 0,
    cardsReviewed: 0,
    elapsedSeconds: 0,
    subjects: [],
  });
  const seenSubjects = useRef<Set<string>>(new Set());

  // ---- Carregamento offline-first ----
  useEffect(() => {
    let alive = true;
    (async () => {
      let queue = await readLocalQueue();
      if (queue.length === 0 && navigator.onLine) {
        // Sem fila local ainda: tenta um prefetch antes de desistir.
        await prefetchAll().catch(() => {});
        queue = await readLocalQueue();
      }
      const [subjects, bancas, exams] = await Promise.all([
        db().subjects.toArray(),
        db().bancas.toArray(),
        db().exams.toArray(),
      ]);
      if (!alive) return;
      setCatalog({ subjects, bancas, exams });
      setItems(queue);
      startedAt.current = Date.now();
      setPhase(queue.length === 0 ? "empty" : "running");
    })();
    return () => {
      alive = false;
    };
  }, []);

  // ---- Cronômetro ----
  useEffect(() => {
    if (phase !== "running") return;
    const id = window.setInterval(() => {
      const secs = Math.floor((Date.now() - startedAt.current) / 1000);
      setElapsed(secs);
      if (minutes > 0 && secs >= minutes * 60) {
        finish();
      }
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, minutes]);

  const secondsLeft = minutes > 0 ? Math.max(0, minutes * 60 - elapsed) : null;

  const finish = useCallback(() => {
    stats.current.elapsedSeconds = Math.floor(
      (Date.now() - startedAt.current) / 1000,
    );
    stats.current.subjects = Array.from(seenSubjects.current);
    setPhase("done");
  }, []);

  const current = items[index];

  const noteSubject = useCallback(
    (subjectId: number) => {
      seenSubjects.current.add(subjectName(subjectId, catalog.subjects));
    },
    [catalog.subjects],
  );

  const advance = useCallback(() => {
    setIndex((i) => {
      const next = i + 1;
      if (next >= items.length) {
        finish();
        return i;
      }
      return next;
    });
  }, [items.length, finish]);

  // ---- Handlers de item ----
  const onAnswer = useCallback(
    async (givenAnswer: string, confidence: Confidence) => {
      const q = current.question!;
      noteSubject(q.subject_id);
      const result = await recordAttempt(q, givenAnswer, confidence);
      stats.current.questionsAnswered += 1;
      if (result.is_correct) stats.current.questionsCorrect += 1;
      return result;
    },
    [current, noteSubject],
  );

  const onCreateDraft = useCallback(() => {
    const q = current.question!;
    // Correct answer legível para o verso do rascunho.
    const back =
      q.format === "certo_errado"
        ? q.correct_answer === "certo"
          ? "Certo"
          : "Errado"
        : (q.alternatives.find((a) => a.key === q.correct_answer)?.text ??
          "");
    void addDraft({
      subject_id: q.subject_id,
      source_question_id: q.id,
      front: q.statement,
      back,
    });
  }, [current]);

  const onGrade = useCallback(
    (grade: Grade) => {
      const fc = current.flashcard!;
      noteSubject(fc.subject_id);
      void recordReview(fc, grade);
      stats.current.cardsReviewed += 1;

      // Card errado reaparece mais adiante na mesma sessão (§7).
      if (grade === 1) {
        setItems((prev) => [...prev, current]);
      }
      advance();
    },
    [current, advance, noteSubject],
  );

  // ---- Metadados discretos ----
  const meta = useMemo(() => {
    if (!current) return "";
    if (current.question) {
      const q = current.question;
      const banca = catalog.bancas.find((b) => b.id === q.banca_id)?.name;
      const year = catalog.exams.find((e) => e.id === q.exam_id)?.year;
      const parts = [
        banca,
        year ? String(year) : undefined,
        subjectPath(q.subject_id, catalog.subjects),
      ].filter(Boolean);
      return parts.join(" · ");
    }
    const fc = current.flashcard!;
    const kind = fc.kind === "resumo" ? "Resumo" : "Pergunta";
    return `${kind} · ${subjectPath(fc.subject_id, catalog.subjects)}`;
  }, [current, catalog]);

  // ---- Render ----
  if (phase === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted text-corpo">Preparando sessão…</p>
      </div>
    );
  }

  if (phase === "empty") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-enunciado text-ink">Fila vazia.</p>
        <p className="text-corpo text-muted max-w-leitura">
          Não há itens preparados para estudar offline. Abra o app com rede para
          baixar a fila do dia.
        </p>
        <Button size="lg" onClick={() => router.push("/")}>
          Voltar ao início
        </Button>
      </div>
    );
  }

  if (phase === "done") {
    return <SessionSummary stats={stats.current} />;
  }

  return (
    <>
      <SessionHeader
        index={index}
        total={items.length}
        secondsLeft={secondsLeft}
        elapsed={elapsed}
        onExit={finish}
      />
      <div className="flex-1 min-h-0">
        {current?.question ? (
          <QuestionItem
            key={`q-${index}`}
            question={current.question}
            meta={meta}
            reasons={current.reasons}
            onAnswer={onAnswer}
            onCreateDraft={onCreateDraft}
            onNext={advance}
          />
        ) : current?.flashcard ? (
          <FlashcardItem
            key={`f-${index}`}
            flashcard={current.flashcard}
            meta={meta}
            reasons={current.reasons}
            onGrade={onGrade}
          />
        ) : null}
      </div>
    </>
  );
}
