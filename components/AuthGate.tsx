"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLogout, useSession } from "@/lib/auth/hooks";
import { hasSeenOnboarding } from "@/lib/onboarding";
import { startSyncEngine } from "@/lib/sync/engine";
import { prefetchAll } from "@/lib/sync/prefetch";
import { Button } from "@/components/ui/Button";
import { Canvas } from "@/components/ui/Card";
import { Face } from "@/components/ui/Face";
import { TabBar } from "@/components/ui/TabBar";

const PUBLIC_ROUTES = ["/entrar", "/cadastro", "/onboarding"];
const FULLSCREEN_ROUTES = ["/estudar", ...PUBLIC_ROUTES];

// Único lugar que decide o que o app mostra conforme a sessão (ver CLAUDE.md
// do front, seção de multi-tenancy): sem sessão -> tela de login; sessão
// free -> bloqueio explicando que a conta ainda não tem acesso; premium (ou
// modo mock) -> app normal, e só aí liga prefetch/sincronização — não faz
// sentido baixar dado de alguém que não vai conseguir usá-lo. Também decide
// se o TabBar aparece — nunca em rota fullscreen (sessão, auth, onboarding).
export function AuthGate({ children }: { children: ReactNode }) {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
  const showTabBar = !FULLSCREEN_ROUTES.some((r) => pathname.startsWith(r));
  const started = useRef(false);

  useEffect(() => {
    if (session.status === "anonymous" && !isPublicRoute) {
      router.replace(hasSeenOnboarding() ? "/entrar" : "/onboarding");
    }
  }, [session.status, isPublicRoute, router]);

  const allowed =
    session.status === "mock" ||
    (session.status === "authenticated" && session.plan === "premium");

  useEffect(() => {
    if (!allowed || started.current) return;
    started.current = true;
    // Liga a sincronização e dispara o prefetch na abertura (§7). Falha de
    // rede aqui é silenciosa — o app segue com o que já está no IndexedDB.
    startSyncEngine();
    void prefetchAll().catch(() => {});

    const onFocus = () => void prefetchAll().catch(() => {});
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [allowed]);

  // Um wrapper só, sempre com a mesma forma (flex column, min-h-dvh no topo,
  // flex-1 min-h-0 no meio), pra toda rota — inclusive as públicas. Antes,
  // rota pública pulava o wrapper e cada página compensava com `min-h-dvh`
  // no próprio Canvas; nas rotas com TabBar isso fazia o Canvas (flex-1
  // min-h-0) crescer além do espaço reservado pra ele, empurrando a TabBar
  // pra fora da viewport e forçando a página inteira a rolar. Com um wrapper
  // único, nenhuma página precisa (nem deve) forçar `min-h-dvh` no Canvas.
  let content: ReactNode;
  let tabBar = false;

  if (isPublicRoute) {
    content = children;
  } else if (session.status === "loading") {
    content = (
      <div className="flex flex-1 items-center justify-center">
        <p className="font-sans text-[14px] font-bold opacity-50">Carregando…</p>
      </div>
    );
  } else if (session.status === "anonymous") {
    // useEffect acima já disparou o redirect; nada pra mostrar no meio tempo.
    content = null;
  } else if (session.status === "authenticated" && session.plan !== "premium") {
    content = (
      <Canvas tone="forest">
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-[var(--canvas-pad)] text-center text-cream">
          <Face mood="calm" tone="cream" size={120} />
          <h1 className="m-0 font-poster text-[38px] uppercase leading-[0.9] tracking-[-0.04em]">
            Quase lá
          </h1>
          <p className="max-w-[var(--measure-read)] font-sans text-[16px] font-semibold opacity-80">
            Sua conta ainda não tem acesso liberado. Por enquanto, a ativação é
            manual — fale com quem administra a Central de Estudos.
          </p>
          <LogoutLink />
        </div>
      </Canvas>
    );
  } else {
    content = children;
    tabBar = showTabBar;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <div className="flex min-h-0 flex-1 flex-col">{content}</div>
      {tabBar && <TabBar />}
    </div>
  );
}

function LogoutLink() {
  const router = useRouter();
  const logout = useLogout();

  return (
    <Button
      variant="light"
      disabled={logout.isPending}
      onClick={() => logout.mutate(undefined, { onSettled: () => router.replace("/entrar") })}
    >
      Sair
    </Button>
  );
}
