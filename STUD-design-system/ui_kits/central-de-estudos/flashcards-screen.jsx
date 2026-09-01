function FlashcardsScreen() {
  const { flashcards, subjects, drafts } = window.STUD_DATA;
  const [rascunhos, setRascunhos] = React.useState(drafts);
  const [novo, setNovo] = React.useState(false);
  const [filtro, setFiltro] = React.useState("");

  if (novo) {
    return (
      <Canvas tone="lilac">
        <AppNav title="Novo card" />
        <Scroll>
          <Poster size={42}>Novo<br />card</Poster>
          <Select label="Eixo" placeholder="Selecione" options={subjects.map((s) => ({ value: String(s.id), label: subjectPath(s.id, subjects) }))} />
          <Select label="Tipo" options={[{ value: "pergunta_resposta", label: "Pergunta e resposta" }, { value: "resumo", label: "Resumo" }]} />
          <Textarea label="Frente" placeholder="O que você quer se perguntar." />
          <Textarea label="Verso" placeholder="A resposta, curta." />
          <div style={{ display: "flex", gap: "var(--space-2)" }}>
            <Button variant="light" size="lg" block onClick={() => setNovo(false)}>Cancelar</Button>
            <Button size="lg" block onClick={() => setNovo(false)}>Salvar card</Button>
          </div>
        </Scroll>
      </Canvas>
    );
  }

  const lista = filtro ? flashcards.filter((fc) => fc.state === filtro) : flashcards;

  return (
    <Canvas tone="cream">
      <AppNav title="Sua coleção" action={<Button size="sm" onClick={() => setNovo(true)}>Novo card</Button>} />
      <Scroll>
        <Poster size={46}>Flash<br />cards</Poster>

        {rascunhos.length > 0 ? (
          <Card tone="sun" radius="lg" pad="md">
            <Eyebrow>{rascunhos.length} {rascunhos.length === 1 ? "rascunho" : "rascunhos"} para completar</Eyebrow>
            <ul style={{ margin: "var(--space-3) 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {rascunhos.map((d) => (
                <li key={d.local_id} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 800, lineHeight: 1.35 }}>{d.front}</span>
                  <div style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Button size="sm" onClick={() => setNovo(true)}>Completar</Button>
                    <Button variant="ghost" size="sm" onClick={() => setRascunhos(rascunhos.filter((x) => x.local_id !== d.local_id))}>Descartar</Button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}

        <div style={{ display: "flex", gap: "var(--space-2)", overflowX: "auto" }}>
          {[{ v: "", l: "Todos" }, { v: "vencido", l: "Vencidos" }, { v: "aprendizado", l: "Em aprendizado" }, { v: "maduro", l: "Maduros" }].map((o) => (
            <Chip key={o.v} size="sm" selected={filtro === o.v} onClick={() => setFiltro(o.v)}>{o.l}</Chip>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {lista.map((fc) => (
            <Card key={fc.id} tone="surface" radius="lg" pad="md">
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-3)" }}>
                <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.3 }}>{fc.front}</p>
                <Badge tone={fc.state}>{fc.state}</Badge>
              </div>
              <p style={{ margin: "var(--space-3) 0 0", fontFamily: "var(--font-mono)", fontSize: 11.5, opacity: 0.5 }}>
                {fc.kind === "resumo" ? "Resumo" : "Pergunta"} · {subjectPath(fc.subject_id, subjects)}
              </p>
            </Card>
          ))}
          {lista.length === 0 ? (
            <Card tone="soft" radius="lg" pad="lg" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)", textAlign: "center" }}>
              <Face mood="sleepy" size={92} />
              <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 900 }}>Nenhum card nesse estado.</p>
            </Card>
          ) : null}
        </div>
      </Scroll>
    </Canvas>
  );
}
Object.assign(window, { FlashcardsScreen });
