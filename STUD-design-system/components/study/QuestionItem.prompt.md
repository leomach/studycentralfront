The session's question screen. Fills its container height; the footer holds all actions.

```jsx
<QuestionItem question={q} meta="Cebraspe · 2024 · Direitos Fundamentais" reasons={["Errou há 3 dias"]} onNext={next} />
```

Without `onAnswer` it grades locally against `correct_answer`, which is enough for mocks.
