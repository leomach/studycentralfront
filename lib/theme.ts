// Controle manual de tema (CLAUDE.md §4). Persistido em localStorage; quando
// ausente, o CSS cai no prefers-color-scheme do sistema.
"use client";

export type Theme = "light" | "dark" | "system";

const KEY = "theme";

export function getTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem(KEY) as Theme) ?? "system";
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === "system") {
    root.removeAttribute("data-theme");
    localStorage.removeItem(KEY);
  } else {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
  }
}
