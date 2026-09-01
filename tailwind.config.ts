import type { Config } from "tailwindcss";

// As cores apontam para variáveis CSS definidas em app/globals.css, de modo que
// o modo escuro (derivado, ver CLAUDE.md §4) troca apenas os valores das
// variáveis — nenhuma classe precisa mudar. Tokens do design system STUD
// (ver STUD-design-system/), aplicado a partir de 2026-09-01.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semânticas (mesmos nomes de antes — só o valor por trás mudou).
        paper: "var(--paper)",
        surface: "var(--surface)",
        "surface-sunk": "var(--surface-sunk)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        accent: "var(--accent)",
        correct: "var(--correct)",
        wrong: "var(--wrong)",
        due: "var(--due)",
        // Cru — canvas de uma cor só (STUD).
        cream: "var(--cream)",
        coral: "var(--coral)",
        sun: "var(--sun)",
        spring: "var(--spring)",
        forest: "var(--forest)",
        lilac: "var(--lilac)",
        bubblegum: "var(--bubblegum)",
        sky: "var(--sky)",
        clay: "var(--clay)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        poster: ["var(--font-poster)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Escala de leitura do produto (§4).
        enunciado: ["19px", "1.6"],
        corpo: ["16px", "1.55"],
        secundario: ["14px", "1.5"],
        rotulo: ["13px", "1.4"],
        numero: ["34px", "1"],
        eyebrow: ["11px", "1"],
        // Escala poster/display do STUD.
        heading: ["26px", "1.1"],
        title: ["36px", "0.98"],
        display: ["56px", "0.9"],
        mega: ["80px", "0.86"],
        poster: ["108px", "0.82"],
      },
      letterSpacing: {
        display: "-0.04em",
        title: "-0.03em",
        eyebrow: "0.16em",
      },
      borderRadius: {
        xs: "8px",
        sm: "14px",
        md: "20px",
        lg: "28px",
        xl: "36px",
        panel: "32px",
        // Mantidos por compatibilidade com telas ainda não migradas nesta onda.
        surface: "6px",
        acao: "10px",
      },
      boxShadow: {
        "hard-sm": "3px 3px 0 var(--rule)",
        hard: "5px 5px 0 var(--rule)",
        "hard-lg": "8px 8px 0 var(--rule)",
        "hard-press": "1px 1px 0 var(--rule)",
        panel: "0 -18px 40px rgba(17, 17, 16, 0.12)",
      },
      transitionTimingFunction: {
        snap: "cubic-bezier(0.2, 0.9, 0.25, 1)",
        pop: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        fast: "90ms",
        DEFAULT: "150ms",
        slow: "240ms",
      },
      maxWidth: {
        // ~70 caracteres para enunciados de questão.
        leitura: "38rem",
      },
    },
  },
  plugins: [],
};

export default config;
