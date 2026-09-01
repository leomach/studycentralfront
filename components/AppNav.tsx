"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { SyncIndicator } from "./SyncIndicator";

const links = [
  { href: "/", label: "Início" },
  { href: "/questoes", label: "Questões" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/desempenho", label: "Desempenho" },
  { href: "/catalogo", label: "Catálogo" },
];

// Cabeçalho leve com navegação. A rota /estudar tem layout próprio e não
// renderiza este componente (§6.2).
export function AppNav() {
  const pathname = usePathname();

  // A sessão ocupa a tela inteira, sem cabeçalho de app (§6.2).
  if (pathname.startsWith("/estudar")) return null;

  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-rule">
      <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between gap-4">
        <nav className="flex items-center gap-1 overflow-x-auto">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-3 py-2 rounded-surface text-secundario whitespace-nowrap",
                  active ? "text-ink font-medium bg-surface" : "text-muted",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <SyncIndicator />
      </div>
    </header>
  );
}
