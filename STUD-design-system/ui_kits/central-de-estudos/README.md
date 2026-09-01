# UI kit — Central de Estudos (PWA)

Recreation of the study app in `leomach/studycentralfront`, restyled in the STUD
visual language. Open `index.html`: it boots a 400×840 app frame and is
click-through — pick a duration, run a session (flashcard → question → summary),
filter Questões through the bottom sheet, browse Flashcards / Desempenho / Catálogo.

| File | Screen | Source in the repo |
| --- | --- | --- |
| `app.jsx` | shell + routing + queue assembly | `app/layout.tsx`, `app/estudar/page.tsx` |
| `home-screen.jsx` | Início | `app/page.tsx` |
| `session-screen.jsx` | Sessão (question / flashcard / summary) | `app/estudar/page.tsx`, `components/sessao/*` |
| `questoes-screen.jsx` | Questões + filter sheet | `app/questoes/page.tsx` |
| `flashcards-screen.jsx` | Flashcards, drafts, novo card | `app/flashcards/page.tsx` |
| `desempenho-screen.jsx` | Desempenho | `app/desempenho/page.tsx` |
| `catalogo-screen.jsx` | Catálogo | `app/catalogo/page.tsx` |
| `onboarding-screen.jsx` | Onboarding (3 telas) | new — not in the repo |
| `auth-screen.jsx` | Entrar / Criar conta | new — not in the repo |
| `profile-screen.jsx` | Perfil, preferências, trocar senha, sair | new — not in the repo |
| `data.js` | mock content | `lib/api/mocks/data.ts` |
| `shell.jsx` | shared page chrome (title, labels, scroll) | — |

## Tweaks

The panel (top-right in the preview) drives the prototype:

- **Fluxo** — onboarding · auth · app
- **Estado** da tela inicial — `pendencias` · `nada_vencido` · `fila_vazia` · `primeiro_dia`
- **Mostrar semana** — hide the week strip in the bottom panel

Onboarding, Auth and Perfil are **new surfaces with no upstream counterpart** —
the repo has no auth or settings screen. They follow the STUD language but the
copy and fields are proposals, not product truth.

All UI primitives come from the compiled design system (`window.STUDDesignSystem_29ef30`);
nothing is re-implemented here. Screen files are plain `text/babel` scripts that
register on `window`, so they are not compiled into the component bundle.
