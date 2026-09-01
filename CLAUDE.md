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

**Quatro domínios**: `catalog` (eixo temático, banca, concurso), `question`
(questão e tentativa), `flashcard` (card e estado de revisão) e `dashboard`
(agregações e a fila do dia).

**Modelo de dados** — os campos que importam para o frontend:

```
subjects            id, parent_id, name              # eixo temático, hierárquico
bancas              id, name                          # Cebraspe, FGV, FCC...
exams               id, name, banca_id, year          # concurso
questions           id, subject_id, banca_id, exam_id, exam_year,
                    format ('certo_errado' | 'multipla_escolha'),
                    statement, alternatives (jsonb), correct_answer
attempts            id, question_id, given_answer, is_correct,
                    confidence ('certeza' | 'duvida' | 'chute'), attempted_at
flashcards          id, subject_id, source_question_id,
                    kind ('pergunta_resposta' | 'resumo'), front, back
flashcard_reviews   id, flashcard_id, due_date, interval_days,
                    ease_factor, reps, lapses, last_reviewed_at
```

Existe também uma tabela `users`, mas autenticação está fora de escopo: o
backend fixa um único usuário e o frontend não deve enviar identificação de
usuário em nenhuma requisição.

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

## 4. Direção visual

### Ancoragem

O vocabulário visual vem do mundo em que este conteúdo vive: documentos
institucionais, editais, gabaritos oficiais, cartão-resposta. Isso significa
precisão e sobriedade — não "app de produtividade colorido", nem "plataforma
educacional alegre". A interface deve parecer um instrumento sério, porque o
uso é sério e o tempo é curto.

### Cor

**Modo claro é o padrão.** O modo escuro existe como alternativa e deve seguir
`prefers-color-scheme` do sistema, além de ter um controle manual nas
configurações — mas toda decisão de design é tomada primeiro no claro, e o
escuro é derivado dele.

A paleta é de baixa saturação e temperatura fria. A razão é funcional: cores
quentes e saturadas puxam atenção para si, o que é útil em interfaces que
querem ser notadas e prejudicial numa que precisa desaparecer para que o
enunciado da questão seja a única coisa na cabeça do usuário. Verdes e azuis
dessaturados sustentam leitura longa sem competir com o conteúdo.

```
--paper        #F4F7F4   fundo base: branco levemente esverdeado
--surface      #FFFFFF   superfícies elevadas
--ink          #1B2A28   texto principal: verde-petróleo muito escuro
--muted        #5E6E6B   texto secundário, rótulos
--rule         #DCE3DE   divisórias e contornos
--accent       #1F5F73   azul-petróleo: ação primária, foco, seleção

--correct      #2F7A55   acerto
--wrong        #A8443C   erro
--due          #9A6B1F   vencido / pendente
```

O fundo não é branco puro nem creme. Branco puro em tela, sob leitura
prolongada, cansa; creme é o clichê visual de todo app de leitura e leva a
interface para um registro nostálgico que não combina com o assunto. O verde
quase imperceptível do `--paper` é o do papel de caderno bom — presente o
bastante para tirar a dureza do branco, discreto o bastante para ninguém
chamar de "verde".

O texto principal é verde-petróleo escuro, não preto. Preto sobre fundo claro
cria contraste alto demais para leitura de enunciados longos; um escuro com
matiz reduz a fadiga sem perder legibilidade (o contraste continua acima de
AA com folga).

O acento é azul-petróleo, deliberadamente distante do verde do `--correct`.
Se ação primária e feedback de acerto fossem ambos verdes, o usuário
precisaria interpretar contexto para saber o que a cor está dizendo — e num
app onde a resposta certa é a informação mais importante da tela, essa
ambiguidade é inaceitável.

As três cores funcionais **só** aparecem para comunicar estado — nunca como
decoração, gradiente ou destaque estético. Se uma cor funcional aparecer num
lugar que não seja acerto, erro ou vencimento, está errado.

### Modo escuro (derivado)

```
--paper        #151C1E
--surface      #1D2629
--ink          #E3E9E6
--muted        #8A9A96
--rule         #2B3639
--accent       #4E9FB8

--correct      #4E9E72
--wrong        #C96B60
--due          #C99A47
```

Não inverta mecanicamente as cores do modo claro: as cores funcionais precisam
ser mais claras e um pouco menos saturadas no escuro para manter contraste
sem vibrar contra o fundo.

### Tipografia

Uma família: **IBM Plex Sans**, com **IBM Plex Mono** exclusivamente para
números (cronômetro, contadores, percentuais, intervalos em dias). A escolha é
deliberada: Plex tem origem institucional e boa legibilidade em corpo pequeno,
e a variante mono dá aos números a estabilidade de largura que faz um
cronômetro não "tremer" a cada segundo.

Escala (base 16px):

```
enunciado de questão     19px / 1.6    — o texto mais importante do app
corpo                    16px / 1.55
secundário               14px / 1.5
rótulo                   13px / 1.4
número grande (mono)     32px / 1.1
```

Enunciados de questão são o conteúdo central: dê a eles largura de linha
confortável (máx. ~70 caracteres), espaçamento generoso e o maior contraste da
tela. Nunca comprima enunciado para caber mais coisa.

### Espaço e forma

Raio de canto: `6px` em superfícies, `10px` em botões de ação primária. Não use
o mesmo raio em tudo — hierarquia também é forma.

Evite encapsular todo conteúdo em cards idênticos. Numa lista de questões, uma
divisória horizontal simples entre itens comunica melhor e pesa menos que 20
cartões com sombra.

### Movimento

Movimento apenas como resposta a uma ação: virar um flashcard, revelar o
gabarito, confirmar sincronização. Duração curta (150–200ms). Nada de entradas
animadas em seções ao carregar a página. Respeitar `prefers-reduced-motion`.

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
└── desempenho/
    └── page.tsx

components/
├── ui/                            # primitivos: botão, campo, seletor, folha
├── sessao/                        # componentes exclusivos da sessão
├── questao/
└── flashcard/

lib/
├── api/                           # cliente HTTP + hooks TanStack Query
├── db/                            # schema Dexie, outbox
├── sync/                          # motor de sincronização
└── sm2.ts                         # espelho do SM-2 do backend (ver §7)
```

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
GET    /api/subjects
POST   /api/subjects
GET    /api/bancas
POST   /api/bancas
GET    /api/exams
POST   /api/exams

GET    /api/questions?subject_id=&banca_id=&exam_id=&year=&status=
POST   /api/questions
GET    /api/questions/:id
POST   /api/questions/:id/attempts     { given_answer, confidence, client_id }

GET    /api/flashcards?subject_id=&state=
POST   /api/flashcards
POST   /api/flashcards/:id/reviews     { grade, client_id }

GET    /api/study/queue?minutes=
GET    /api/dashboard/overview
```

A URL base vem de `NEXT_PUBLIC_API_URL`. Em desenvolvimento o backend roda
localmente em outra porta, então CORS precisa estar liberado do lado Go.

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

- Autenticação e telas de login (usuário único por enquanto)
- Notificações push
- Sincronização multi-dispositivo com resolução de conflito
- Gamificação (pontos, medalhas, ligas)
- Editor de texto rico ou renderização de markdown nos cards
- Importação de PDF ou qualquer ingestão automatizada
- Compartilhamento de decks ou qualquer feature social
- Modo de leitura offline de teoria/resumos longos

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