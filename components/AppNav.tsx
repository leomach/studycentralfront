import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SyncIndicator } from "./SyncIndicator";

interface AppNavProps {
  title?: string;
  action?: ReactNode;
  /** "inherit" (padrão) pega a cor do Canvas onde está — AppNav é renderizado
   * como primeiro filho do Canvas de cada tela, nunca como chrome global
   * (design system STUD — components/navigation/AppNav.jsx). */
  tone?: "inherit" | string;
}

// Barra mínima: marca + título da tela + um slot de ação + indicador de sync.
// Cada página decide o que vai no slot de ação (botão de perfil na Início,
// "Filtros" em Questões, "Voltar" em sub-telas) — ver CLAUDE.md §4/§12.
export function AppNav({ title, action, tone = "inherit" }: AppNavProps) {
  return (
    <header
      className="flex flex-shrink-0 items-center justify-between gap-4 px-[var(--canvas-pad)] pb-3 pt-5"
      style={{ color: tone === "inherit" ? "inherit" : `var(--${tone})` }}
    >
      <div className="flex min-w-0 flex-1 items-baseline gap-3">
        <span className="flex-shrink-0 font-poster text-[17px] uppercase tracking-[-0.02em]">STUD</span>
        {title && (
          <span className="truncate font-sans text-[13px] font-extrabold opacity-60">{title}</span>
        )}
      </div>
      <div className="flex flex-shrink-0 items-center gap-3">
        <SyncIndicator />
        {action}
      </div>
    </header>
  );
}

/** Botão de avatar padrão pro slot de ação — usado só na Início, que é o
 * único ponto de entrada pro Perfil (§6.1/§12). */
export function AppNavAvatarButton({ initial, onClick }: { initial: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Abrir perfil"
      className={cn(
        "grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-[var(--ink)]",
        "font-sans text-[13px] font-black text-cream",
      )}
    >
      {initial}
    </button>
  );
}

/** Botão de texto "Voltar" pro slot de ação, usado nas sub-telas. */
export function AppNavBackButton({ onClick, label = "Voltar" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="border-0 bg-transparent font-sans text-[13px] font-extrabold uppercase tracking-[0.05em] text-inherit opacity-70"
    >
      {label}
    </button>
  );
}
