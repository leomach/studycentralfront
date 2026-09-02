"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminUsers, useMe } from "@/lib/api/queries";
import { useSetUserAdmin, useSetUserPlan } from "@/lib/api/mutations";
import type { AuthUser, Plan } from "@/lib/api/types";
import { Canvas, Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AppNav, AppNavBackButton } from "@/components/AppNav";

// Painel administrativo: gerenciar plano e papel de admin de qualquer conta,
// pelo próprio login (sem precisar do ADMIN_SECRET, reservado ao bootstrap —
// ver CLAUDE.md do backend, "Papel de administrador de contas"). Só quem tem
// is_admin=true chega até aqui; qualquer outra conta é mandada de volta.
export default function AdminPage() {
  const router = useRouter();
  const me = useMe();
  const users = useAdminUsers();
  const setPlan = useSetUserPlan();
  const setAdmin = useSetUserAdmin();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (me.data && !me.data.is_admin) router.replace("/");
  }, [me.data, router]);

  if (!me.data || !me.data.is_admin) {
    return (
      <Canvas tone="ink" className="items-center justify-center">
        <p className="font-sans text-[15px] font-bold text-cream opacity-60">Carregando…</p>
      </Canvas>
    );
  }

  const togglePlan = (u: AuthUser) => {
    setError(null);
    const next: Plan = u.plan === "premium" ? "free" : "premium";
    setPlan.mutate({ id: u.id, plan: next }, { onError: (e) => setError(errorMessage(e)) });
  };

  const toggleAdmin = (u: AuthUser) => {
    setError(null);
    setAdmin.mutate({ id: u.id, isAdmin: !u.is_admin }, { onError: (e) => setError(errorMessage(e)) });
  };

  return (
    <Canvas tone="ink" className="text-cream">
      <AppNav title="Administração" action={<AppNavBackButton onClick={() => router.push("/perfil")} />} />

      <div className="flex-1 overflow-y-auto px-[var(--canvas-pad)] pb-16">
        <h1 className="m-0 font-poster text-[36px] uppercase leading-[0.9] tracking-[-0.04em]">Contas</h1>
        <p className="mt-2 font-sans text-[14px] font-semibold opacity-70">
          Promover a premium ou conceder/remover admin não exige mais o segredo do servidor — só a partir daqui.
        </p>

        {error && (
          <Card tone="coral" radius="lg" pad="sm" className="mt-4">
            <p className="m-0 font-sans text-[13px] font-bold">{error}</p>
          </Card>
        )}

        {users.isLoading ? (
          <p className="mt-6 font-sans text-[15px] font-bold opacity-60">Carregando…</p>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            {(users.data ?? []).map((u) => {
              const isSelf = u.id === me.data!.id;
              return (
                <Card key={u.id} tone="surface" radius="lg" pad="md" className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="m-0 truncate font-display text-[16px] font-black">
                        {u.name}
                        {isSelf && <span className="ml-1.5 font-sans text-[12px] font-bold opacity-50">(você)</span>}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-[12px] opacity-55">{u.email}</p>
                    </div>
                    <div className="flex flex-shrink-0 gap-1.5">
                      {u.is_admin && <Badge tone="lilac">admin</Badge>}
                      <Badge tone={u.plan === "premium" ? "correct" : "neutral"}>{u.plan}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      disabled={setPlan.isPending}
                      onClick={() => togglePlan(u)}
                    >
                      {u.plan === "premium" ? "Tornar free" : "Tornar premium"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      disabled={setAdmin.isPending || isSelf}
                      onClick={() => toggleAdmin(u)}
                    >
                      {u.is_admin ? "Remover admin" : "Tornar admin"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Canvas>
  );
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Não foi possível completar a ação.";
}
