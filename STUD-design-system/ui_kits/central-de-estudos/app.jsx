const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "flow": "app",
  "homeState": "pendencias",
  "showWeek": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState("/");
  const [overlay, setOverlay] = React.useState(null);
  const [session, setSession] = React.useState(null);

  const flow = t.flow;
  const setFlow = (v) => setTweak("flow", v);

  const buildQueue = () => {
    const q = window.STUD_DATA.questions.map((question) => ({ kind: "questao", question, reasons: ["Sugerida hoje"] }));
    const fc = window.STUD_DATA.flashcards.map((flashcard) => ({ kind: "flashcard", flashcard, reasons: [flashcard.state === "vencido" ? "Vencido hoje" : "Reforço"] }));
    const out = [];
    for (let i = 0; i < Math.max(q.length, fc.length); i++) { if (fc[i]) out.push(fc[i]); if (q[i]) out.push(q[i]); }
    return out;
  };

  const panel = (
    <TweaksPanel>
      <TweakSection label="Fluxo" />
      <TweakSelect label="Tela" value={flow} options={["onboarding", "auth", "app"]} onChange={setFlow} />
      <TweakSection label="Tela inicial" />
      <TweakSelect label="Estado" value={t.homeState} options={["pendencias", "nada_vencido", "fila_vazia", "primeiro_dia"]} onChange={(v) => setTweak("homeState", v)} />
      <TweakToggle label="Mostrar semana" value={t.showWeek} onChange={(v) => setTweak("showWeek", v)} />
    </TweaksPanel>
  );

  if (flow === "onboarding") {
    return <><OnboardingScreen onFinish={() => setFlow("auth")} onSkip={() => setFlow("auth")} />{panel}</>;
  }

  if (flow === "auth") {
    return <><AuthScreen onDone={() => setFlow("app")} onBack={() => setFlow("onboarding")} />{panel}</>;
  }

  if (session) {
    return <><SessionScreen queue={session.queue} minutes={session.minutes} onFinish={() => { setSession(null); setRoute("/"); }} />{panel}</>;
  }

  if (overlay === "perfil") {
    return <><ProfileScreen onBack={() => setOverlay(null)} onCatalogo={() => setOverlay("catalogo")} onLogout={() => { setOverlay(null); setFlow("auth"); }} />{panel}</>;
  }

  if (overlay === "catalogo") {
    return <><CatalogoScreen onBack={() => setOverlay("perfil")} />{panel}</>;
  }

  return (
    <>
      {route === "/" ? (
        <HomeScreen
          state={t.homeState}
          showWeek={t.showWeek}
          onProfile={() => setOverlay("perfil")}
          onStart={(minutes) => setSession({ minutes, queue: buildQueue() })}
        />
      ) : null}
      {route === "/questoes" ? <QuestoesScreen onStudy={(qs) => setSession({ minutes: 0, queue: qs.map((question) => ({ kind: "questao", question, reasons: ["Sessão avulsa (filtro)"] })) })} /> : null}
      {route === "/flashcards" ? <FlashcardsScreen /> : null}
      {route === "/desempenho" ? <DesempenhoScreen /> : null}
      <TabBar items={NAV} active={route} onNavigate={setRoute} />
      {panel}
    </>
  );
}
Object.assign(window, { App });
