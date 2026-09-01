import type { Config } from "tailwindcss";

// As cores apontam para variáveis CSS definidas em app/globals.css, de modo que
// o modo escuro (derivado, ver CLAUDE.md §4) troca apenas os valores das
// variáveis — nenhuma classe precisa mudar.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        accent: "var(--accent)",
        correct: "var(--correct)",
        wrong: "var(--wrong)",
        due: "var(--due)",
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Escala da §4. Cada entrada define tamanho e altura de linha.
        enunciado: ["19px", "1.6"],
        corpo: ["16px", "1.55"],
        secundario: ["14px", "1.5"],
        rotulo: ["13px", "1.4"],
        numero: ["32px", "1.1"],
      },
      borderRadius: {
        surface: "6px",
        acao: "10px",
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
