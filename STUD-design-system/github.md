repo: leomach/studycentralfront
branch: main

## Last sync
date: 2026-09-01T17:31:00Z

### Updated in this project
- Built the STUD token set from the repo's colour roles, type scale and touch targets.
- Recreated all six app views as the Central de Estudos UI kit.
- Extracted the repo's UI primitives (Button, Input/Textarea, Select, Sheet) plus the inline patterns they imply.
- Copied `public/icon.svg` in as the only brand graphic the repo ships.

## Screen map
| Project screen | Repo files |
| --- | --- |
| ui_kits/central-de-estudos/HomeScreen.jsx | app/page.tsx |
| ui_kits/central-de-estudos/SessionScreen.jsx | app/estudar/page.tsx, components/sessao/SessionHeader.tsx, components/sessao/QuestionItem.tsx, components/sessao/FlashcardItem.tsx, components/sessao/SessionSummary.tsx |
| ui_kits/central-de-estudos/QuestoesScreen.jsx | app/questoes/page.tsx |
| ui_kits/central-de-estudos/FlashcardsScreen.jsx | app/flashcards/page.tsx |
| ui_kits/central-de-estudos/DesempenhoScreen.jsx | app/desempenho/page.tsx |
| ui_kits/central-de-estudos/CatalogoScreen.jsx | app/catalogo/page.tsx |
| components/core/Button.jsx | components/ui/Button.tsx |
| components/forms/Input.jsx | components/ui/Field.tsx |
| components/forms/Select.jsx | components/ui/Select.tsx |
| components/overlay/Sheet.jsx | components/ui/Sheet.tsx |
| components/navigation/AppNav.jsx | components/AppNav.tsx, components/SyncIndicator.tsx |
| tokens/*.css | app/globals.css, tailwind.config.ts, app/layout.tsx |
