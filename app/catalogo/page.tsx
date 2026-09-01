"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useBancas, useExams, useSubjects } from "@/lib/api/queries";
import { useCreateBanca, useCreateExam, useCreateSubject } from "@/lib/api/mutations";
import type { Subject } from "@/lib/api/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Card, Canvas } from "@/components/ui/Card";
import { Badge, Chip } from "@/components/ui/Badge";
import { AppNav, AppNavBackButton } from "@/components/AppNav";

const ROOT_TONES = ["lilac", "sun", "spring", "sky", "bubblegum", "clay"] as const;

// Catálogo (§6.5): pensado primeiro para desktop. Estrutura um concurso —
// bancas, concursos e a árvore de eixos temáticos.
export default function CatalogoPage() {
  const router = useRouter();
  return (
    <Canvas tone="cream">
      <AppNav title="Catálogo" action={<AppNavBackButton onClick={() => router.push("/perfil")} />} />
      <div className="flex-1 overflow-y-auto px-[var(--canvas-pad)] pb-16">
        <h1 className="m-0 font-poster text-[36px] uppercase leading-[0.9] tracking-[-0.04em]">Catálogo</h1>
        <div className="mt-6 flex flex-col gap-8">
          <SubjectsSection />
          <BancasSection />
          <ExamsSection />
        </div>
      </div>
    </Canvas>
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

function countDescendants(node: Subject, tree: Map<number | null, Subject[]>): number {
  const children = tree.get(node.id) ?? [];
  return children.reduce((sum, c) => sum + 1 + countDescendants(c, tree), 0);
}

function SubjectsSection() {
  const subjects = useSubjects();
  const create = useCreateSubject();
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  const tree = useMemo(() => buildTree(subjects.data ?? []), [subjects.data]);
  const roots = tree.get(null) ?? [];

  const add = async () => {
    if (!name.trim()) return;
    await create.mutateAsync({ name: name.trim(), parent_id: parent ? Number(parent) : null });
    setName("");
  };

  return (
    <section>
      <h2 className="font-sans text-eyebrow font-black uppercase tracking-eyebrow opacity-55">Eixos temáticos</h2>
      {roots.length === 0 ? (
        <p className="mt-3 font-sans text-[14px] font-bold opacity-55">Nenhum eixo ainda.</p>
      ) : (
        <div className="mt-3 flex flex-col gap-2">
          {roots.map((r, i) => {
            const children = tree.get(r.id) ?? [];
            return (
              <Card key={r.id} tone={ROOT_TONES[i % ROOT_TONES.length]} radius="lg">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[18px] font-black tracking-[-0.02em]">{r.name}</span>
                  <span className="font-mono text-[13px] font-semibold opacity-65">
                    {countDescendants(r, tree)}
                  </span>
                </div>
                {children.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {children.map((c) => (
                      <Badge key={c.id} tone="light">
                        {c.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
      <div className="mt-4 flex items-end gap-2">
        <div className="flex-1">
          <Input label="Novo eixo" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Direito Penal" />
        </div>
        <div className="flex-1">
          <Select
            label="Dentro de"
            placeholder="Raiz"
            options={(subjects.data ?? []).map((s) => ({ value: String(s.id), label: s.name }))}
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
      <h2 className="font-sans text-eyebrow font-black uppercase tracking-eyebrow opacity-55">Bancas</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {(bancas.data ?? []).map((b) => (
          <Chip key={b.id} selected>
            {b.name}
          </Chip>
        ))}
      </div>
      <div className="mt-4 flex items-end gap-2">
        <div className="flex-1">
          <Input label="Nova banca" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Cebraspe" />
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
      <h2 className="font-sans text-eyebrow font-black uppercase tracking-eyebrow opacity-55">Concursos</h2>
      <div className="mt-3 flex flex-col gap-2">
        {(exams.data ?? []).map((e) => (
          <Card key={e.id} tone="surface" radius="lg" className="flex items-center justify-between">
            <span className="font-sans text-[15px] font-bold">{e.name}</span>
            <span className="font-mono text-[13px] opacity-60">
              {bancas.data?.find((b) => b.id === e.banca_id)?.name} · {e.year}
            </span>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3">
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
              options={(bancas.data ?? []).map((b) => ({ value: String(b.id), label: b.name }))}
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
