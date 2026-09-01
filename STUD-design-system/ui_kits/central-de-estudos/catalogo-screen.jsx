function CatalogoScreen({ onBack }) {
  const { subjects, bancas, exams } = window.STUD_DATA;
  const byParent = new Map();
  subjects.forEach((s) => { if (!byParent.has(s.parent_id)) byParent.set(s.parent_id, []); byParent.get(s.parent_id).push(s); });
  const TONES = ["lilac", "sun", "spring", "sky", "bubblegum", "clay"];

  return (
    <Canvas tone="cream">
      <AppNav title="Estrutura do seu concurso" action={onBack ? <Button variant="outline" size="sm" onClick={onBack}>Voltar</Button> : null} />
      <Scroll>
        <Poster size={46}>Catálogo</Poster>

        <div>
          <Eyebrow>eixos temáticos</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginTop: "var(--space-3)" }}>
            {(byParent.get(null) || []).map((root, i) => (
              <Card key={root.id} tone={TONES[i % TONES.length]} radius="lg" pad="md">
                <span style={{ display: "block", fontFamily: "var(--font-poster)", fontSize: 26, lineHeight: 1, letterSpacing: "-0.035em", textTransform: "uppercase" }}>{root.name}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
                  {(byParent.get(root.id) || []).map((child) => (
                    <Badge key={child.id} tone="light">{child.name}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card tone="surface" radius="lg" pad="md">
          <Eyebrow>novo eixo</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginTop: "var(--space-3)" }}>
            <Input label="Nome" placeholder="Ex.: Direito Penal" />
            <Select label="Dentro de" placeholder="Raiz" options={subjects.map((s) => ({ value: String(s.id), label: s.name }))} />
            <Button size="lg" block>Adicionar eixo</Button>
          </div>
        </Card>

        <div>
          <Eyebrow>bancas</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
            {bancas.map((b) => <Chip key={b.id} size="sm">{b.name}</Chip>)}
          </div>
        </div>

        <div>
          <Eyebrow>concursos</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginTop: "var(--space-3)" }}>
            {exams.map((e) => (
              <Card key={e.id} tone="surface" radius="md" pad="md">
                <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 900, letterSpacing: "-0.02em" }}>{e.name}</p>
                <p style={{ margin: "6px 0 0", fontFamily: "var(--font-mono)", fontSize: 11.5, opacity: 0.5 }}>
                  {bancas.find((b) => b.id === e.banca_id)?.name} · {e.year}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Scroll>
    </Canvas>
  );
}
Object.assign(window, { CatalogoScreen });
