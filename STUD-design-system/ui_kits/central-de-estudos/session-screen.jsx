function SessionScreen({ queue, minutes, onFinish }) {
  const [index, setIndex] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const stats = React.useRef({ questionsAnswered: 0, questionsCorrect: 0, cardsReviewed: 0, elapsedSeconds: 0, subjects: [] });
  const { subjects, bancas } = window.STUD_DATA;

  React.useEffect(() => {
    if (done) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [done]);

  const finish = () => { stats.current.elapsedSeconds = elapsed; setDone(true); };
  const note = (subject_id) => {
    const name = subjectPath(subject_id, subjects).split(" › ").pop();
    if (!stats.current.subjects.includes(name)) stats.current.subjects.push(name);
  };
  const advance = () => setIndex((i) => (i + 1 >= queue.length ? (finish(), i) : i + 1));

  if (done) return <SessionSummary stats={stats.current} onFinish={onFinish} />;

  const item = queue[index];
  const isCard = item.kind === "flashcard";
  const meta = isCard
    ? `${item.flashcard.kind === "resumo" ? "Resumo" : "Pergunta"} · ${subjectPath(item.flashcard.subject_id, subjects)}`
    : [bancas.find((b) => b.id === item.question.banca_id)?.name, item.question.exam_year, subjectPath(item.question.subject_id, subjects)].filter(Boolean).join(" · ");

  return (
    <Canvas tone={isCard ? "lilac" : "cream"}>
      <SessionHeader index={index} total={queue.length} secondsLeft={minutes > 0 ? Math.max(0, minutes * 60 - elapsed) : null} elapsed={elapsed} onExit={finish} />
      <div style={{ flex: 1, minHeight: 0 }}>
        {isCard ? (
          <FlashcardItem
            key={"f" + index}
            flashcard={item.flashcard}
            meta={meta}
            reasons={item.reasons}
            intervals={item.flashcard.intervals}
            onGrade={() => { note(item.flashcard.subject_id); stats.current.cardsReviewed += 1; advance(); }}
          />
        ) : (
          <QuestionItem
            key={"q" + index}
            question={item.question}
            meta={meta}
            reasons={item.reasons}
            onAnswer={(given) => {
              note(item.question.subject_id);
              const ok = given === item.question.correct_answer;
              stats.current.questionsAnswered += 1;
              if (ok) stats.current.questionsCorrect += 1;
              return { is_correct: ok, correct_answer: item.question.correct_answer };
            }}
            onNext={advance}
          />
        )}
      </div>
    </Canvas>
  );
}
Object.assign(window, { SessionScreen });
