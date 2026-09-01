"use client";

import { useMemo, useState } from "react";
import { useBancas, useExams, useSubjects } from "@/lib/api/queries";
import {
  useCreateBanca,
  useCreateExam,
  useCreateSubject,
} from "@/lib/api/mutations";
import type { Subject } from "@/lib/api/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";

// Catálogo (§6.5): pensado primeiro para desktop. Estrutura um concurso —
// bancas, concursos e a árvore de eixos temáticos.
export default function CatalogoPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-6 pb-16 flex flex-col gap-10">
      <h1 className="text-enunciado text-ink">Catálogo</h1>
      <SubjectsSection />
      <BancasSection />
      <ExamsSection />
    </main>
  );
}

// --- Árvore de eixos ---
function buildTree(subjects: Subject[]): Map<number | null, Subject[]> {
  const byParent = new Map<number | null, Subject[]>();
  for (const s of subjects) {
    const key = s.parent_id;
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key)!.push(s);
  }
  return byParent;
}

function SubjectNode({
  node,
  tree,
  depth,
}: {
  node: Subject;
  tree: Map<number | null, Subject[]>;
  depth: number;
}) {
  const children = tree.get(node.id) ?? [];
  return (
    <li>
      <div
        className="py-1.5 text-corpo text-ink border-b border-rule"
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        {depth > 0 && <span className="text-muted mr-1">›</span>}
        {node.name}
      </div>
      {children.length > 0 && (
        <ul>
          {children.map((c) => (
            <SubjectNode key={c.id} node={c} tree={tree} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

function SubjectsSection() {
  const subjects = useSubjects();
  const create = useCreateSubject();
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  const tree = useMemo(
    () => buildTree(subjects.data ?? []),
    [subjects.data],
  );
  const roots = tree.get(null) ?? [];

  const add = async () => {
    if (!name.trim()) return;
    await create.mutateAsync({
      name: name.trim(),
      parent_id: parent ? Number(parent) : null,
    });
    setName("");
  };

  return (
    <section>
      <h2 className="text-corpo font-medium text-ink mb-3">Eixos temáticos</h2>
      {roots.length === 0 ? (
        <p className="text-muted text-secundario mb-3">Nenhum eixo ainda.</p>
      ) : (
        <ul className="mb-4">
          {roots.map((r) => (
            <SubjectNode key={r.id} node={r} tree={tree} depth={0} />
          ))}
        </ul>
      )}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Input
            label="Novo eixo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Direito Penal"
          />
        </div>
        <div className="flex-1">
          <Select
            label="Dentro de"
            placeholder="Raiz"
            options={(subjects.data ?? []).map((s) => ({
              value: String(s.id),
              label: s.name,
            }))}
            value={parent}
            onChange={(e) => setParent(e.target.value)}
          />
        </div>
        <Button onClick={add} disabled={create.isPending}>
          Adicionar
        </Button>
      </div>
    </section>
  );
}

function BancasSection() {
  const bancas = useBancas();
  const create = useCreateBanca();
  const [name, setName] = useState("");

  const add = async () => {
    if (!name.trim()) return;
    await create.mutateAsync({ name: name.trim() });
    setName("");
  };

  return (
    <section>
      <h2 className="text-corpo font-medium text-ink mb-3">Bancas</h2>
      <ul className="divide-y divide-rule mb-4">
        {(bancas.data ?? []).map((b) => (
          <li key={b.id} className="py-2 text-corpo text-ink">
            {b.name}
          </li>
        ))}
      </ul>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Input
            label="Nova banca"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Cebraspe"
          />
        </div>
        <Button onClick={add} disabled={create.isPending}>
          Adicionar
        </Button>
      </div>
    </section>
  );
}

function ExamsSection() {
  const exams = useExams();
  const bancas = useBancas();
  const create = useCreateExam();
  const [name, setName] = useState("");
  const [bancaId, setBancaId] = useState("");
  const [year, setYear] = useState("");

  const add = async () => {
    if (!name.trim() || !bancaId) return;
    await create.mutateAsync({
      name: name.trim(),
      banca_id: Number(bancaId),
      year: year ? Number(year) : new Date().getFullYear(),
    });
    setName("");
    setYear("");
  };

  return (
    <section>
      <h2 className="text-corpo font-medium text-ink mb-3">Concursos</h2>
      <ul className="divide-y divide-rule mb-4">
        {(exams.data ?? []).map((e) => (
          <li
            key={e.id}
            className="py-2 flex items-center justify-between gap-3"
          >
            <span className="text-corpo text-ink">{e.name}</span>
            <span className="text-secundario text-muted">
              {bancas.data?.find((b) => b.id === e.banca_id)?.name} · {e.year}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2">
        <Input
          label="Novo concurso"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex.: TRF1 — Analista"
        />
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Select
              label="Banca"
              placeholder="Selecione"
              options={(bancas.data ?? []).map((b) => ({
                value: String(b.id),
                label: b.name,
              }))}
              value={bancaId}
              onChange={(e) => setBancaId(e.target.value)}
            />
          </div>
          <Input
            label="Ano"
            type="number"
            inputMode="numeric"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-24"
          />
          <Button onClick={add} disabled={create.isPending}>
            Adicionar
          </Button>
        </div>
      </div>
    </section>
  );
}
