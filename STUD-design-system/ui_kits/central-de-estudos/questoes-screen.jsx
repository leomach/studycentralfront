function QuestoesScreen({ onStudy }) {
  const { questions, bancas, subjects, exams } = window.STUD_DATA;
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const STATUS = [
    { value: "", label: "Todas" },
    { value: "nunca_respondida", label: "Nunca respondidas" },
    { value: "errei", label: "Que eu errei" },
    { value: "acertei_chute", label: "Acertei no chute" },
  ];
  const lista = status === "errei" ? questions.slice(0, 3) : status === "nunca_respondida" ? questions.slice(1, 4) : questions;
  const TONES = ["lilac", "sun", "spring", "sky", "bubblegum"];

  return (
    <Canvas tone="cream">
      <AppNav title="Banco de questões" action={<Button variant="ink" size="sm" onClick={() => setOpen(true)}>Filtros{status ? " (1)" : ""}</Button>} />
      <Scroll>
        <Poster size={46}>Questões</Poster>

        <div style={{ display: "flex", gap: "var(--space-2)", overflowX: "auto", paddingBottom: 2 }}>
          {STATUS.map((s) => (
            <Chip key={s.value} size="sm" selected={status === s.value} onClick={() => setStatus(s.value)}>{s.label}</Chip>
          ))}
        </div>

        <Button size="lg" block trailing="→" onClick={() => onStudy(lista)}>
          Estudar estas {lista.length} {lista.length === 1 ? "questão" : "questões"}
        </Button>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {lista.map((q, i) => (
            <Card key={q.id} tone="surface" radius="lg" pad="md">
              <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
                <Badge tone="neutral">{q.format === "certo_errado" ? "certo/errado" : "múltipla escolha"}</Badge>
                <Badge tone={i % 3 === 0 ? "vencido" : "aprendizado"}>{bancas.find((b) => b.id === q.banca_id)?.name}</Badge>
              </div>
              <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 800, lineHeight: 1.35, letterSpacing: "-0.015em", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{q.statement}</p>
              <p style={{ margin: "var(--space-3) 0 0", fontFamily: "var(--font-mono)", fontSize: 11.5, opacity: 0.5 }}>
                {[q.exam_year, subjectPath(q.subject_id, subjects)].filter(Boolean).join(" · ")}
              </p>
            </Card>
          ))}
        </div>

        <div>
          <Eyebrow>eixos com mais questões</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
            {subjects.filter((s) => s.parent_id).slice(0, 4).map((s, i) => (
              <ColorRow key={s.id} tone={TONES[i % TONES.length]} title={s.name} meta={`${12 + i * 7} questões`} />
            ))}
          </div>
        </div>
      </Scroll>

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title="Filtros"
        footer={<div style={{ display: "flex", gap: "var(--space-2)" }}><Button variant="outline" size="lg" block onClick={() => setStatus("")}>Limpar</Button><Button size="lg" block onClick={() => setOpen(false)}>Aplicar</Button></div>}
      >
        <Select label="Eixo temático" placeholder="Todos" options={subjects.map((s) => ({ value: String(s.id), label: subjectPath(s.id, subjects) }))} />
        <Select label="Banca" placeholder="Todas" options={bancas.map((b) => ({ value: String(b.id), label: b.name }))} />
        <Select label="Concurso" placeholder="Todos" options={exams.map((e) => ({ value: String(e.id), label: `${e.name} (${e.year})` }))} />
        <Select label="Formato" options={[{ value: "", label: "Qualquer formato" }, { value: "certo_errado", label: "Certo/Errado" }, { value: "multipla_escolha", label: "Múltipla escolha" }]} />
        <Select label="Histórico" options={STATUS} value={status} onChange={(e) => setStatus(e.target.value)} />
      </Sheet>
    </Canvas>
  );
}
Object.assign(window, { QuestoesScreen });
