"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const ITEMS = [
  { href: "/", label: "Início" },
  { href: "/questoes", label: "Questões" },
  { href: "/flashcards", label: "Cards" },
  { href: "/desempenho", label: "Progresso" },
];

// Navegação inferior fixa, construída para QUATRO destinos (design system
// STUD — components/navigation/TabBar.jsx: cinco rótulos não respiram a
// 390px). Catálogo e Perfil saem daqui e ficam atrás do botão de perfil em
// AppNav.
//
// `fixed` de verdade (não só "última coisa no flex column"): antes, o
// TabBar só ficava parado na tela enquanto a altura calculada da página
// batia exatamente com a viewport — qualquer conteúdo vazando altura (uma
// tela sem `overflow-y-auto` bem contido, um teclado abrindo, etc.) fazia a
// página inteira rolar e arrastava o TabBar junto. `fixed` tira ele do
// fluxo normal e prende na borda inferior da viewport sempre, não importa o
// que aconteça no conteúdo — components/AuthGate.tsx reserva o mesmo espaço
// (`--tabbar-h`) em fluxo normal pra nada ficar escondido atrás dele.
export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-black/[0.08] bg-white px-4 pt-3"
      style={{ paddingBottom: "calc(20px + env(safe-area-inset-bottom))" }}
      aria-label="Navegação principal"
    >
      {ITEMS.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "min-h-[var(--tap-min)] min-w-0 flex-1 rounded-full px-2",
              "flex items-center justify-center overflow-hidden whitespace-nowrap",
              "font-sans text-[13.5px] font-black tracking-[-0.015em]",
              "transition-colors duration-fast ease-snap",
              active ? "bg-[var(--ink)] text-cream" : "bg-transparent text-muted",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
