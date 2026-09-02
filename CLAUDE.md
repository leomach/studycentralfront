# Central de Estudos — Especificação do Frontend

> **Este é o repositório do frontend.** Ele complementa uma especificação de
> backend que vive em um repositório separado (projeto em Go + Gin + Gorm +
> PostgreSQL, documentado no `CLAUDE.md` daquele repo).
>
> Como os dois projetos são independentes, este documento carrega abaixo todo
> o contexto de backend necessário para trabalhar aqui — não é preciso ter
> acesso ao outro repositório. O que **não** é permitido é ampliar o escopo
> definido lá: se uma tela parecer exigir um endpoint, campo ou domínio que não
> está descrito neste documento, isso é uma divergência a reportar, não uma
> licença para inventar.

---

## 1. O contexto de uso define tudo

Este não é um app de escritório. O cenário principal, que deve guiar cada
decisão de interface:

- **Onde**: dentro de um carro estacionado, antes do expediente
- **Quando**: 7h20 às 8h00, com luz variando entre penumbra e sol direto no
  para-brisa ao longo do ano
- **Como**: celular, uma mão só, telefone possivelmente apoiado
- **Rede**: 4G instável ou inexistente (estacionamento, prédio bloqueando sinal)
- **Estado mental**: pressa, sono, janela fixa que não pode ser desperdiçada

Consequências diretas e não negociáveis:

1. Se o app precisar de rede para funcionar durante a sessão, ele falhou.
2. Se exigir digitação durante a sessão, ele falhou.
3. Se levar mais de 2 toques para começar a estudar, ele falhou.
4. Se um spinner aparecer entre um card e o próximo, ele falhou.

Cenários secundários (intervalo de almoço, fim de semana em casa, desktop para
cadastrar questões em lote) são importantes mas **nunca** devem comprometer o
cenário principal.

---

## 1.1 Contexto do backend (resumo autossuficiente)

O backend é um projeto separado em **Go + Gin + Gorm + PostgreSQL**, mantido
deliberadamente pequeno. Você não precisa alterá-lo, mas precisa conhecê-lo
para consumir corretamente.

**Cinco domínios**: `auth` (contas, login, refresh token), `catalog` (eixo
temático, banca, concurso — compartilhado entre contas), `question` (questão
— compartilhada — e tentativa — por conta), `flashcard` (card e estado de
revisão, por conta) e `dashboard` (agregações e a fila do dia, por conta).

**Modelo de dados** — os campos que importam para o frontend (nomes reais do
Go, não os do desenho original — ver auditoria de 2026-09-01):

```
users               id, name, email, plan ('free' | 'premium'), is_admin
subjects            id, parent_id, name              # eixo temático, hierárquico — COMPARTILHADO
bancas              id, name                          # Cebraspe, FGV, FCC... — COMPARTILHADO
exams               id, name, banca_id, year          # concurso — COMPARTILHADO
questions           id, subject_id, banca_id, exam_id,
                    format ('certo_errado' | 'multipla_escolha'),
                    statement, alternatives ({key,text}[]), correct_answer
                    # COMPARTILHADA — sem exam_year embutido; o ano vive em exams.year
attempts            id, question_id, answer, is_correct,
                    confidence ('certeza' | 'duvida' | 'chute'), created_at
                    # por conta
flashcards          id, subject_id, source_question_id,
                    kind ('pergunta_resposta' | 'resumo'), front, back
                    # por conta
flashcard_reviews   id, flashcard_id, due_date, interval_days,
                    ease_factor, reps, lapses, last_grade
                    # por conta (sem last_reviewed_at)
```

**Multi-tenancy**: toda conta nasce `free` e não acessa nenhuma rota fora de
`/api/auth/*` (403 em tudo o resto) até ser promovida a `premium`. Ver §8 e
`lib/auth/`.

**Papel de administrador de contas** (`is_admin`, campo separado de `plan`):
concedido uma vez pelo backend via um segredo de servidor (bootstrap, fora
deste repo), gerenciável dali em diante pela própria conta admin em
`app/admin/page.tsx` — trocar plano/`is_admin` de qualquer conta. `is_admin`
viaja no JWT (igual `plan`, decodificado em `lib/auth/jwt.ts`), então
`AuthGate` deixa passar um admin mesmo com plano `free` (senão o primeiro
admin, ainda free logo após o bootstrap, ficaria trancado do próprio
painel) — ver §4 "Navegação" e `components/AuthGate.tsx`. `GET /api/me` não
exige premium, só sessão válida, exatamente por causa desse caso.

**Algoritmo de repetição espaçada**: SM-2 clássico (não FSRS), implementado em
`internal/flashcard/sm2.go`. As regras exatas, que o espelho em TypeScript
precisa reproduzir (ver §7):

```
grade 1 (errei)     → reps = 0, interval = 1 dia, ease -= 0.2
grade 2 (difícil)   → interval = interval * 1.2
grade 3 (bom)       → interval = interval * ease
grade 4 (fácil)     → interval = interval * ease * 1.3, ease += 0.1

piso de ease: 1.3
intervalo base mínimo: 1 dia (um card novo tem interval = 0; multiplicar
por zero travaria o card permanentemente)
```

**Fila do dia**: a função `BuildQueue` no backend combina três critérios de
priorização, com pesos escalonados — flashcards vencidos (peso 100) > eixos
pouco estudados (40) > eixos com mais erros (30). Cada item retornado vem com
um campo `reasons` explicando por que entrou na fila. Use isso: exibir o motivo
de forma discreta ajuda o usuário a confiar na priorização em vez de achar que
é aleatório.

## 2. Stack

- **Next.js** (App Router) + **TypeScript** em modo `strict`
- **Tailwind CSS** para estilo
- **TanStack Query** para estado de servidor e cache
- **Dexie** (wrapper de IndexedDB) para persistência local
- **Serwist** para o service worker / PWA (sucessor mantido do `next-pwa`)

Deliberadamente fora: biblioteca de componentes pesada, gerenciador de estado
global (Redux/Zustand), biblioteca de animação, rich text editor. Um conjunto
pequeno de primitivos próprios em `components/ui/` é suficiente e evita que o
bundle inche — o que importa quando o app precisa carregar em rede ruim.

Renderização: como praticamente toda tela depende de dados do usuário e precisa
funcionar offline, este app é predominantemente **client-side**. Use Server
Components apenas para o shell estático (layout, navegação). Não tente fazer
SSR de dados de estudo — conflita com a estratégia offline.

---

## 3. Princípios de interface

**Uma tela responde uma pergunta.** A tela de sessão responde "o que eu estudo
agora?". A de desempenho responde "como estou indo?". Não misture.

**A sessão é o produto.** Todo o resto (cadastro, catálogo, filtros) é
infraestrutura de apoio. Se houver conflito de prioridade, a sessão ganha.

**Zona do polegar.** Em qualquer tela usada durante a sessão, ações ficam na
metade inferior. O topo é para informação, o rodapé é para ação.

**Alvos grandes.** Mínimo de 48px de altura em qualquer elemento tocável
durante a sessão; os botões de avaliação de flashcard devem ser bem maiores
que isso.

**Offline é o estado normal.** A interface nunca trata "sem rede" como erro.
Um indicador discreto de sincronização pendente basta. Nada de modal, nada de
alerta, nada de bloqueio.

**Feedback imediato.** Ao responder uma questão ou avaliar um card, o resultado
aparece instantaneamente a partir de estado local. A gravação no servidor
acontece depois, em segundo plano, e não é problema do usuário.

---

## 4. Direção visual — design system STUD (referência obrigatória)

> **Toda decisão visual de front, a partir de 2026-09-01, segue o design
> system em `STUD-design-system/`** (na raiz deste repo, irmão de `app/`).
> Contém `tokens/*.css` (cor, tipografia, espaço, borda, movimento),
> `components/**/*.jsx` (27 componentes de referência) e
> `ui_kits/central-de-estudos/*.jsx` (protótipo clicável das telas do
> produto, incluindo três que ainda não existiam aqui: onboarding, auth,
> perfil). Qualquer tela nova ou retrabalhada consulta esse diretório
> primeiro — não improvise um visual paralelo. Os componentes reais deste
> repo vivem em `components/ui/*.tsx`: são a tradução dos `.jsx` do STUD
> (que usam 100% `style={{}}` inline) para Tailwind + `var(--token)>`, com o
> mesmo agrupamento de arquivo do STUD (`Bento`/`Canvas`/`Panel` moram em
> `Card.tsx`; `Chip` mora em `Badge.tsx`; `AccuracyBar`/`SegmentBar`/
> `BarChart` moram em `ProgressBar.tsx`; `StatBox` mora em `StatBlock.tsx`;
> `SyncIndicator` mora dentro de `AppNav.tsx`) — ao criar um componente novo
> do kit, siga esse agrupamento em vez de criar um arquivo por nome.

Esta seção documentava antes uma direção sóbria e de baixa saturação — o
STUD é deliberadamente o oposto (cor saturada em tela cheia, mascote,
tipografia poster) e substitui essa direção por inteiro, por pedido
explícito. O que a seção antiga acertava e continua valendo: a sessão é o
produto, o resto é infraestrutura de apoio; alvos grandes; feedback
imediato a partir do estado local. O que muda é só o vocabulário visual.

### A regra de ouro: o kit manda no visual, o backend manda no dado

O STUD é um protótipo. Ele mostra telas inteiras — inclusive campos, botões e
fluxos (recuperar senha, trocar e-mail, concurso alvo, lembrete diário,
filtro de histórico em Questões) que **não têm endpoint real** no backend
Go descrito na §1.1/§8. A regra usada para reconciliar isso, e que qualquer
trabalho futuro de front deve seguir:

**A interface do kit entra inteira — nunca se esconde uma tela ou um campo
só porque falta back-end.** Onde não houver dado ou ação real por trás, o
elemento continua visível e tocável, mas ao ser usado mostra um aviso curto
e honesto (variação de "em breve — isso ainda não existe no servidor"), em
vez de: (a) fingir que a ação funcionou, ou (b) desaparecer silenciosamente.
Isso não é uma tela cheia de bloqueio nem um modal — é um texto inline ou
um `Card`/`Badge` discreto perto de onde a ação foi tentada. Exemplos já
implementados: `app/entrar/page.tsx` ("Esqueci minha senha"),
`app/questoes/page.tsx` (filtro "Histórico"), `app/perfil/page.tsx`
(concurso alvo, meta diária, lembrete, trocar e-mail/senha).

Ao criar uma tela nova a partir do kit, audite campo a campo contra a §1.1 e
a §8 antes de escrever: se o campo tiver dado real (nome, e-mail, plano,
due/mature/acerto, contagem da outbox…), ligue-o de verdade; se não tiver,
aplique o padrão "em breve" acima — nunca invente um número (streak, horas
estudadas) só porque o kit mostra um.

### Cor

Paleta de cor saturada em tela cheia via `Canvas` — cada tela vive dentro de
um bloco de cor sólida (`tokens/colors.css`, ported para `tailwind.config.ts`
como `coral`/`sun`/`spring`/`forest`/`lilac`/`bubblegum`/`sky`/`clay`/
`cream`). As cores semânticas antigas continuam existindo com os mesmos
nomes — só o valor mudou, então código que só usa essas variáveis não
precisa ser tocado:

```
--paper / --surface / --ink / --muted / --rule / --accent
--correct / --wrong / --due
```

**Atenção com `--rule`**: no STUD ele vale a cor `ink` (quase preto) e é
usado como contorno **grosso** de ~2.5px, não como divisória sutil. Uma tela
que reaproveite `border-rule`/`divide-rule` sem revisão visual vai ganhar uma
linha grossa onde antes era uma linha cinza discreta — revise cada tela
migrada, não confie na variável sozinha.

Modo escuro segue existindo (`:root[data-theme="dark"]` e
`prefers-color-scheme`), com controle manual real em `app/perfil/page.tsx`
via `lib/theme.ts` (`getTheme`/`applyTheme`, persistido em `localStorage`,
reaplicado no boot por `app/providers.tsx`).

### Tipografia

Quatro vozes, cada uma com um só trabalho (`app/layout.tsx`):

```
Nunito            voz padrão — corpo, headers, números, botões
Archivo Black     headlines poster (font-poster) — telas cheias, "STUD" no AppNav
Instrument Serif  só o verso de flashcard e citações (font-serif)
IBM Plex Mono     só valores tipo relógio (font-mono) — cronômetro, intervalos, %
```

Escala completa em `tailwind.config.ts` (`fontSize.enunciado/corpo/
secundario/rotulo/numero/eyebrow/heading/title/display/mega/poster`).
Enunciado de questão continua sendo o texto mais importante da tela — não
comprimir para caber mais coisa.

### Espaço e forma

Raio de canto vai de `xs` a `xl`, mais `panel` (folha inferior) e `pill`
(botões, chips, avatar) — ver `borderRadius` em `tailwind.config.ts`. Sombra
é sempre opt-in (`shadow-hard*`/`shadow-panel`), nunca padrão num bloco de
cor chapada — contorno com sombra dura (`sticker`/`outlined` nos
componentes) é a exceção visível, não a regra.

### Movimento

`transitionTimingFunction.snap`/`.pop` e `transitionDuration.fast/DEFAULT/
slow` em `tailwind.config.ts`. Mesma regra de antes: resposta a uma ação
(virar card, revelar gabarito, pressionar botão), nunca entrada animada de
seção ao carregar a página. Respeitar `prefers-reduced-motion`. Pressão de
botão é feedback via escala/translação (`Button.tsx`), nunca opacidade.

### Navegação

`TabBar` (`components/ui/TabBar.tsx`) é o único chrome global e persistente:
4 destinos fixos (Início, Questões, Cards, Progresso), renderizado por
`AuthGate` fora de rotas fullscreen. `AppNav` (`components/AppNav.tsx`) **não**
é chrome global — é renderizado como primeiro filho dentro do `Canvas` de
cada tela, herdando a cor via `tone="inherit"`. Catálogo e Perfil não estão
no `TabBar`: Perfil é alcançado pelo botão de avatar na Início
(`AppNavAvatarButton`); Catálogo, de dentro do Perfil.

---

## 5. Estrutura de pastas e rotas

```
app/
├── layout.tsx
├── page.tsx                      # início
├── estudar/
│   ├── layout.tsx                 # layout dedicado: sem navegação, fullscreen
│   └── page.tsx                   # a sessão
├── questoes/
│   ├── page.tsx                   # banco + filtros
│   ├── nova/page.tsx
│   └── [id]/page.tsx
├── flashcards/
│   ├── page.tsx
│   ├── novo/page.tsx
│   └── [id]/page.tsx
├── catalogo/
│   └── page.tsx                   # eixos, bancas, concursos
├── desempenho/
│   └── page.tsx
├── perfil/
│   └── page.tsx                   # identidade, stats, "em breve" (design system STUD)
├── admin/
│   └── page.tsx                   # painel de contas — só quem tem is_admin=true (§1.1)
├── entrar/page.tsx                # login
├── cadastro/page.tsx              # registro
└── onboarding/
    └── page.tsx                   # 3 telas, mostradas uma vez (lib/onboarding.ts)

components/
├── ui/                            # primitivos do design system STUD (Button, Card/
│                                    Bento/Canvas/Panel, Badge/Chip, Face, StatBlock/
│                                    StatBox, ProgressBar, WeekStrip, Field, Select,
│                                    Sheet, DurationPicker, TabBar)
├── AppNav.tsx                      # barra por-tela (não é chrome global — ver §4)
├── AuthGate.tsx                    # decide o que renderizar conforme a sessão
├── sessao/                        # componentes exclusivos da sessão
├── questao/
└── flashcard/

lib/
├── api/                           # cliente HTTP + hooks TanStack Query
├── auth/                          # sessão (Dexie), login/registro/refresh, hooks
├── db/                            # schema Dexie, outbox
├── sync/                          # motor de sincronização
├── theme.ts                       # tema claro/escuro/sistema (§4), usado em /perfil
├── onboarding.ts                   # flag "já visto" das telas de onboarding
└── sm2.ts                         # espelho do SM-2 do backend (ver §7)
```

Rotas de auth, sem `TabBar`: `app/entrar/page.tsx` (login), `app/cadastro/
page.tsx` (registro), `app/onboarding/page.tsx` (mostrada uma vez para quem
chega sem sessão — ver `lib/onboarding.ts`). `components/AuthGate.tsx` é o
único lugar que decide o que renderizar conforme a sessão — sem ele em cada
tela, sem `if (!logado)` espalhado.

Regra de fetch: nenhum componente chama `fetch` diretamente. Todo acesso a
dados passa por um hook em `lib/api/`. Isso mantém a lógica de cache e offline
num lugar só.

---

## 6. Telas

### 6.1 Início (`/`)

Responde "eu tenho o que estudar agora?" em menos de um segundo.

**Mostra**: um bloco único e dominante com a contagem do que está pendente hoje
(flashcards vencidos + questões sugeridas) e um botão grande de iniciar.
Abaixo, três números pequenos em mono: sequência de dias estudados, questões
respondidas nos últimos 7 dias, percentual de acerto no período.

**Ação principal**: "Estudar 40 minutos" como botão primário, com opção
secundária de escolher outra duração (20 / 40 / 60 / livre). A duração de 40
minutos é o padrão porque é o bloco real do usuário.

**Estado vazio**: se não há nada vencido, o texto não comemora nem enche
linguiça — informa o que existe para fazer ("Nada vencido hoje. Você pode
adiantar 12 cards ou resolver questões novas de Direito Tributário.") e oferece
a ação.

### 6.2 Sessão (`/estudar`) — a tela central

Layout sem navegação, sem cabeçalho de app. Ocupa a tela inteira.

**Estrutura vertical fixa**:
- Topo: barra de progresso fina da sessão + cronômetro regressivo em mono +
  contador `7/23`. Nada mais.
- Meio: o item atual.
- Rodapé: as ações. Sempre no mesmo lugar, sempre no alcance do polegar.

**Item do tipo questão**:
1. Enunciado, com metadados discretos acima (banca · ano · eixo) em texto
   secundário.
2. Alternativas como botões de altura generosa. Certo/Errado renderiza dois
   botões grandes; múltipla escolha renderiza de A a E empilhados.
3. Ao tocar numa alternativa, **antes** de revelar o gabarito, pergunte a
   confiança: três botões — "Tinha certeza", "Fiquei na dúvida", "Chutei".
   Este passo é obrigatório e alimenta o campo `confidence` do backend.
4. Revele o resultado: alternativa correta destacada em `--correct`, a
   escolhida errada em `--wrong`.
5. Oferecer, num toque só, "Criar flashcard disso" — pré-preenchendo frente
   com o enunciado e verso com a alternativa correta, para edição posterior.
   Não abrir editor durante a sessão; apenas marcar para criar depois.
6. Botão de avançar.

**Item do tipo flashcard**:
1. Frente do card, centralizada, com bastante respiro.
2. Um botão largo: "Mostrar resposta".
3. Verso revelado, e então quatro botões de avaliação em grade 2×2 (para caber
   no polegar sem esticar): **Errei · Difícil · Bom · Fácil**. Cada um exibe,
   em texto pequeno mono, o próximo intervalo calculado localmente ("3 d").
4. Cards do tipo `resumo` não têm frente/verso de pergunta: mostram o conteúdo
   e pedem apenas uma autoavaliação de "revisei / preciso rever".

**Fim da sessão**: resumo curto — quantos itens, percentual de acerto, tempo
usado, e quais eixos apareceram. Sem confete, sem gamificação.

**Encerramento antecipado**: sempre acessível, sem confirmação em modal. O
progresso já está salvo item a item.

**Estados**: offline (indicador discreto, tudo funciona), fila vazia (redireciona
ao início com explicação), sincronizando (indicador no canto, não bloqueia).

### 6.3 Banco de questões (`/questoes`)

Responde "quero resolver algo específico".

**Filtros**: eixo temático (hierárquico), banca, concurso, ano, formato, e três
filtros de histórico que são os mais úteis na prática — "nunca respondidas",
"que eu errei", "que acertei no chute". Filtros ficam numa folha deslizante
(bottom sheet) no mobile, não numa barra lateral.

**Lista**: linhas separadas por divisória, cada uma com trecho do enunciado
(2 linhas máximo), metadados em texto secundário, e um marcador de estado
(nunca respondida / acertei / errei).

**Ação**: iniciar uma sessão avulsa com o resultado do filtro atual.

Salvar combinações de filtro para reuso é desejável, mas fica para depois do
v1 funcionar.

### 6.4 Flashcards (`/flashcards`)

Lista com filtro por eixo e por estado (vencido, em aprendizado, maduro).
Criação manual com escolha do tipo — pergunta/resposta ou resumo — e seleção
de eixo temático. Campos de texto simples com suporte a quebra de linha; sem
editor rico, sem markdown renderizado no v1.

A tela precisa de uma fila de "cards para criar", alimentada pelo passo 5 da
sessão de questões: itens marcados durante o estudo aparecem aqui como
rascunhos a completar quando houver tempo (almoço, fim de semana).

### 6.5 Catálogo (`/catalogo`)

Gestão de eixos temáticos (árvore), bancas e concursos. É a única tela pensada
primeiro para desktop, porque é onde se estrutura o conteúdo de um concurso
inteiro — tarefa de fim de semana, não de carro. Deve funcionar no mobile, mas
não precisa ser otimizada para ele.

Estruturar um concurso significa: criar o concurso, vincular a banca, e montar
a árvore de eixos temáticos que ele cobra. Permita reordenar e aninhar.

### 6.6 Desempenho (`/desempenho`)

Responde "onde estou fraco?".

**Blocos**:
1. Acerto por eixo temático, ordenado do pior para o melhor, em barras
   horizontais simples. Esta é a informação mais acionável do app inteiro.
2. Acerto por concurso e por banca.
3. Volume: questões respondidas e cards revisados por dia, últimos 30 dias.
4. Saúde dos flashcards: vencidos / em aprendizado / maduros.

Cruzamento de confiança com acerto ("acertos por chute" — o indicador mais
honesto de conhecimento frágil) é altamente desejável mas pode ficar para a
segunda iteração desta tela.

Sem gráficos elaborados. Barras e números em mono resolvem.

---

## 7. Estratégia offline — a parte crítica

Esta é a seção que mais diferencia este app de um CRUD comum. Implemente com
cuidado.

### Prefetch

Ao abrir o app **com rede** (tipicamente em casa, antes de sair), baixe e
persista no IndexedDB:

- A fila do dia com folga: chame `GET /api/study/queue?minutes=120` mesmo que a
  sessão vá durar 40 — sobra material se o usuário render mais que o previsto.
- O conteúdo **completo** de cada item (enunciado, alternativas, gabarito,
  frente e verso dos cards). Nada de carregar sob demanda durante a sessão.
- O catálogo inteiro (eixos, bancas, concursos) — é pequeno e raramente muda.

Dispare o prefetch na abertura do app e quando ele voltar ao foco com rede
disponível.

### Outbox

Toda escrita durante a sessão (tentativa de questão, avaliação de flashcard) é
gravada primeiro numa tabela `outbox` local, com:

- um **UUID gerado no cliente**, que funciona como chave de idempotência
- o timestamp real do evento no cliente (não confie no horário do servidor para
  registrar quando o usuário respondeu)
- o payload e o endpoint de destino

A UI atualiza a partir do estado local imediatamente. O usuário nunca espera
uma resposta HTTP.

### Sincronização

Ao detectar rede (evento `online`, ou retorno de foco do app), esvazie a outbox
em ordem cronológica, uma requisição por item. Em caso de falha, mantenha o item
e tente de novo depois — nunca descarte silenciosamente.

O backend precisa aceitar o UUID do cliente e ignorar duplicatas. **Isso é uma
dependência externa deste projeto**: exige um campo `client_id` com índice
único em `attempts` e `flashcard_reviews`, do lado do repositório Go. Se ainda
não existir, sinalize — não contorne gerando IDs no servidor nem removendo a
idempotência, porque sem ela uma sincronização interrompida duplica registros
na retentativa.

Não implemente resolução de conflito. Com um usuário e um dispositivo, o último
a escrever vence, e isso basta.

### O espelho do SM-2 — decisão importante

Para que a sessão funcione offline de ponta a ponta, o cliente precisa calcular
o próximo intervalo de um flashcard sem consultar o servidor (para exibir "3 d"
nos botões e para reprogramar o card se ele reaparecer na mesma sessão).

Isso significa **duplicar deliberadamente** a lógica de `internal/flashcard/sm2.go`
em `lib/sm2.ts`. É duplicação consciente, não descuido. Portanto:

- `lib/sm2.ts` deve ser função pura, com a mesma assinatura conceitual do Go
- deve ter os mesmos testes, com os mesmos casos, incluindo o piso de ease em
  1.3 e o intervalo mínimo de 1 dia
- ambos os arquivos levam um comentário no topo apontando um para o outro, com
  a instrução de que qualquer alteração precisa ser feita nos dois
- o servidor continua sendo a fonte da verdade: quando a sincronização
  acontece, o estado que o backend devolve substitui o local

---

## 8. Contrato de API consumido

Endpoints esperados do backend Go:

```
# Públicas — sem token
POST   /api/auth/register             { name, email, password }
POST   /api/auth/login                { email, password } -> { access_token, refresh_token }
POST   /api/auth/refresh              { refresh_token }   -> { access_token, refresh_token }
POST   /api/auth/logout               { refresh_token }

# Só sessão válida, NÃO exige premium (ver "papel de administrador" acima)
GET    /api/me

# Protegidas — header Authorization: Bearer <access_token>, exige plano premium
GET    /api/subjects
POST   /api/subjects
GET    /api/bancas
POST   /api/bancas
GET    /api/exams
POST   /api/exams

GET    /api/questions?subject_id=&banca_id=&exam_id=&format=
POST   /api/questions
GET    /api/questions/:id
POST   /api/questions/:id/attempts     { answer, confidence, client_id }

GET    /api/flashcards?subject_id=
POST   /api/flashcards
POST   /api/flashcards/:id/reviews     { grade, client_id }

GET    /api/study/queue?minutes=
GET    /api/dashboard/overview

# Painel /admin — Authorization: Bearer <access_token> de uma conta com
# is_admin=true; NÃO exige premium (mesma razão de GET /api/me acima)
GET    /api/admin/users
PATCH  /api/admin/users/:id/plan       { plan: "free" | "premium" }
PATCH  /api/admin/users/:id/admin      { is_admin: boolean }
```

Toda rota fora de `/api/auth/*` exige o header `Authorization: Bearer
<access_token>` — sem ele, 401; com token de conta `free`, 403. `lib/api/client.ts`
é o único lugar que anexa esse header e cuida de renovar o token perto de
expirar (`lib/auth/session.ts`) — nenhum outro código deve montar esse header
na mão. `answer`/`format` (não `given_answer`/`year`/`status`) são os nomes
reais de campo/filtro do Go — "ano" e "nunca respondida/errei/acertei no
chute" não existem como filtro no backend hoje, não invente esses parâmetros.

A URL base vem de `NEXT_PUBLIC_API_URL` (resolvida em `lib/api/base-url.ts`,
o único lugar que lê essa variável — `lib/api/client.ts` e
`lib/auth/session.ts` importam de lá em vez de duplicar a leitura). Três
valores possíveis: vazio (mock provisório, §8 acima), um valor literal (URL
fixa, ex.: um deploy real), ou `"auto"` — deriva a URL do host que o
navegador usou pra abrir a página, na porta 8080. Use `"auto"` em
desenvolvimento: como `NEXT_PUBLIC_API_URL` é gravado em texto literal no
JavaScript na hora do build, um valor fixo tipo `http://localhost:8080` só
funciona pra quem abre a página exatamente por `localhost` — quem acessa pelo
IP da rede local (ex.: celular testando o PWA) teria "localhost" resolvendo
para o próprio aparelho, não para a máquina de dev, e todo fetch falharia com
erro de conexão mesmo com CORS/firewall corretos. Em desenvolvimento o
backend roda localmente em outra porta, então CORS precisa estar liberado do
lado Go (`CORS_ORIGIN`, que aceita uma lista separada por vírgula — esse sim
é o lugar certo pra listar várias origens, já que é uma checagem de
segurança, não uma URL de destino única).

Como o backend é um repositório separado, você **não pode alterá-lo a partir
daqui**. Se algum endpoint não existir ou divergir do descrito acima, não
invente um contrato novo nem crie um mock permanente para contornar: registre a
divergência de forma visível e pergunte. Um mock temporário para destravar
desenvolvimento é aceitável, desde que fique isolado em `lib/api/mocks/` e
claramente marcado como provisório.

---

## 9. Convenções de código

- TypeScript `strict`. Sem `any`; se um tipo for realmente desconhecido, use
  `unknown` e estreite.
- Tipos da API vivem em `lib/api/types.ts` e espelham os structs do Go.
- Nomes de domínio em português (`questao`, `eixo`, `banca`, `concurso`),
  nomes técnicos em inglês (`useQuery`, `SyncEngine`, `OutboxItem`). O
  vocabulário do usuário e o vocabulário do código são coisas diferentes, e
  misturar tradução no meio do termo técnico só confunde.
- Componentes recebem dados por props; não buscam dados sozinhos, exceto os
  containers de rota.
- Acessibilidade mínima obrigatória: foco de teclado visível, rótulos em todo
  controle, contraste mínimo AA nos dois modos de cor.

---

## 10. Fora de escopo do v1

Não implementar sem pedido explícito:

- Notificações push
- Sincronização multi-dispositivo com resolução de conflito
- Gamificação (pontos, medalhas, ligas)
- Editor de texto rico ou renderização de markdown nos cards
- Importação de PDF ou qualquer ingestão automatizada
- Compartilhamento de decks ou qualquer feature social
- Modo de leitura offline de teoria/resumos longos
- Verificação de e-mail, "esqueci minha senha", troca de e-mail/senha,
  concurso alvo, lembrete diário, listagem/revogação de sessões ativas — o
  backend não expõe nada disso ainda. **Isso é escopo de back-end, não de
  UI**: o kit STUD mostra esses campos/ações e a UI correspondente já existe
  (ver §4, "a regra de ouro"); o que fica fora do v1 é implementar o
  endpoint real por trás deles, não o botão em si

---

## 11. Ordem sugerida de implementação

1. Shell do app: layout, navegação, tokens de cor e tipografia
2. Cliente de API + tipos + hooks TanStack Query, ainda online-only
3. Tela de sessão funcionando online, com os dois tipos de item
4. Dexie: schema local, prefetch da fila, leitura offline
5. Outbox + motor de sincronização
6. `lib/sm2.ts` com testes espelhando o Go
7. Service worker / PWA instalável
8. Banco de questões com filtros
9. Flashcards: lista, criação, fila de rascunhos
10. Catálogo
11. Desempenho

Os passos 3 a 6 são o núcleo. Se o tempo acabar, um app que só faz sessão
offline já é útil todos os dias; um app com todas as telas mas que trava sem
rede não serve para nada no estacionamento.