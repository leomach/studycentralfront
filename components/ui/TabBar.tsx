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
export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-shrink-0 gap-2 border-t border-black/[0.08] bg-white px-4 pb-5 pt-3"
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
