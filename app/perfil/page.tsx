"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { useBancas, useDashboard, useExams, useMe, useSubjects } from "@/lib/api/queries";
import { useLogout } from "@/lib/auth/hooks";
import { applyTheme, getTheme, type Theme } from "@/lib/theme";
import { flushOutbox, notifySyncChange } from "@/lib/sync/engine";
import { db } from "@/lib/db/schema";
import { Canvas, Card } from "@/components/ui/Card";
import { StatBox } from "@/components/ui/StatBlock";
import { Badge, Chip } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Face } from "@/components/ui/Face";
import { AppNav, AppNavBackButton } from "@/components/AppNav";

const TEMAS: { value: Theme; label: string }[] = [
  { value: "light", label: "Claro" },
  { value: "dark", label: "Escuro" },
  { value: "system", label: "Sistema" },
];

// Perfil (§6, tela nova): identidade e stats reais vêm de /api/me e
// /api/dashboard/overview. O que o kit mostra sem back-end por trás (concurso
// alvo, meta diária, lembrete, trocar e-mail/senha) fica visível mas marcado
// como "em breve" em vez de escondido ou fingido — ver CLAUDE.md §12.
export default function PerfilPage() {
  const router = useRouter();
  const me = useMe();
  const logout = useLogout();
  const dashboard = useDashboard();
  const subjects = useSubjects();
  const bancas = useBancas();
  const exams = useExams();
  const pending = useLiveQuery(() => db().outbox.count(), [], 0);

  const [tema, setTema] = useState<Theme>(() => getTheme());
  const [notice, setNotice] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  const emBreve = (msg: string) => setNotice(msg);

  const trocarTema = (t: Theme) => {
    setTema(t);
    applyTheme(t);
  };

  const sincronizar = async () => {
    setSyncing(true);
    try {
      const n = await flushOutbox();
      if (n > 0) notifySyncChange();
      setNotice(n > 0 ? `${n} escrita${n > 1 ? "s" : ""} sincronizada${n > 1 ? "s" : ""}.` : "Nada pendente ou sem rede agora.");
    } finally {
      setSyncing(false);
    }
  };

  const sair = async () => {
    await logout.mutateAsync();
    router.replace("/entrar");
  };

  const d = dashboard.data;
  const totalAttempts = d?.subjects.reduce((s, x) => s + x.attempts, 0) ?? 0;
  const totalCorrect = d?.subjects.reduce((s, x) => s + x.correct, 0) ?? 0;
  const acerto = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : null;

  return (
    <Canvas tone="cream">
      <AppNav title="Perfil" action={<AppNavBackButton onClick={() => router.push("/")} />} />

      <div className="flex-1 overflow-y-auto px-[var(--canvas-pad)] pb-16">
        <Card tone="lilac" radius="lg" pad="md" className="flex items-center gap-4">
          <div className="grid h-[68px] w-[68px] flex-shrink-0 place-items-center rounded-pill bg-[var(--ink)]">
            <Face mood="happy" size={40} tone="cream" />
          </div>
          <div className="min-w-0">
            <p className="m-0 truncate font-poster text-[24px] uppercase leading-none tracking-[-0.035em]">
              {me.data?.name ?? "—"}
            </p>
            <p className="mt-2 truncate font-mono text-[12px] opacity-60">{me.data?.email ?? "—"}</p>
            {me.data?.plan && (
              <Badge tone={me.data.plan === "premium" ? "correct" : "neutral"} className="mt-2">
                {me.data.plan === "premium" ? "premium" : "free"}
              </Badge>
            )}
          </div>
        </Card>

        <div className="mt-4 flex gap-2">
          <StatBox tone="spring" value={d?.flashcards.due ?? "—"} label="vencidos" />
          <StatBox value={d?.volume.last_30_days ?? "—"} label="questões / 30 d" />
          <StatBox value={acerto !== null ? `${acerto}%` : "—"} label="acerto geral" />
        </div>
        <NoticeInline visible={dashboard.isLoading} text="Carregando stats…" />

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="neutral">sequência de dias — em breve</Badge>
          <Badge tone="neutral">tempo estudado — em breve</Badge>
        </div>

        <Card tone="surface" radius="lg" pad="md" className="mt-6">
          <Eyebrow>seu concurso</Eyebrow>
          <div className="mt-2">
            <Linha
              label="Catálogo"
              value={`${subjects.data?.length ?? 0} eixos · ${bancas.data?.length ?? 0} bancas · ${exams.data?.length ?? 0} concursos`}
              action={
                <Button size="sm" onClick={() => router.push("/catalogo")}>
                  Abrir
                </Button>
              }
            />
            <Linha
              label="Concurso alvo"
              action={
                <Button variant="outline" size="sm" onClick={() => emBreve("Concurso alvo ainda não existe no servidor.")}>
                  Trocar
                </Button>
              }
            />
          </div>
        </Card>

        <Card tone="surface" radius="lg" pad="md" className="mt-4">
          <Eyebrow>preferências</Eyebrow>
          <div className="mt-2">
            <Linha
              label="Meta diária"
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => emBreve("A duração é escolhida na sessão — ainda não há uma meta salva no perfil.")}
                >
                  Alterar
                </Button>
              }
            />
            <Linha
              label="Tema"
              action={
                <div className="flex flex-wrap justify-end gap-1.5">
                  {TEMAS.map((t) => (
                    <Chip key={t.value} size="sm" selected={tema === t.value} onClick={() => trocarTema(t.value)}>
                      {t.label}
                    </Chip>
                  ))}
                </div>
              }
            />
            <Linha
              label="Lembrete de estudo"
              action={
                <Button variant="outline" size="sm" onClick={() => emBreve("Lembrete diário ainda não existe no servidor.")}>
                  Editar
                </Button>
              }
            />
          </div>
        </Card>

        <Card tone="surface" radius="lg" pad="md" className="mt-4">
          <Eyebrow>conta e segurança</Eyebrow>
          <div className="mt-2">
            <Linha
              label="E-mail"
              value={me.data?.email}
              action={
                <Button variant="outline" size="sm" onClick={() => emBreve("Trocar e-mail ainda não existe no servidor.")}>
                  Trocar
                </Button>
              }
            />
            <Linha
              label="Senha"
              action={
                <Button variant="outline" size="sm" onClick={() => emBreve("Trocar senha ainda não existe no servidor.")}>
                  Trocar
                </Button>
              }
            />
            <Linha
              label="Sincronização"
              value={pending === 1 ? "1 escrita pendente" : `${pending ?? 0} escritas pendentes`}
              action={
                <Button size="sm" onClick={sincronizar} disabled={syncing}>
                  {syncing ? "Sincronizando…" : "Sincronizar"}
                </Button>
              }
            />
          </div>
        </Card>

        {notice && (
          <Card tone="sun" radius="lg" pad="sm" className="mt-4">
            <p className="m-0 font-sans text-[13px] font-bold">{notice}</p>
          </Card>
        )}

        <Button
          variant="outline"
          size="lg"
          block
          className="mt-6"
          onClick={sair}
          disabled={logout.isPending}
        >
          {logout.isPending ? "Saindo…" : "Sair da conta"}
        </Button>
      </div>
    </Canvas>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <h2 className="m-0 font-sans text-eyebrow font-black uppercase tracking-eyebrow opacity-55">{children}</h2>;
}

function Linha({ label, value, action }: { label: string; value?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[color:rgba(17,17,16,0.08)] py-4 last:border-0">
      <div className="flex min-w-0 flex-col gap-1">
        <span className="font-display text-[16px] font-black leading-[1.2] tracking-[-0.02em]">{label}</span>
        {value && <span className="truncate font-sans text-[13px] font-bold leading-[1.3] opacity-50">{value}</span>}
      </div>
      {action}
    </div>
  );
}

function NoticeInline({ visible, text }: { visible: boolean; text: string }) {
  if (!visible) return null;
  return <p className="mt-2 font-sans text-[13px] font-bold opacity-55">{text}</p>;
}
