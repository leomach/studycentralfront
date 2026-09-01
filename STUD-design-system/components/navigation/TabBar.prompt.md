The app's persistent navigation — always visible except during a study session.

```jsx
<TabBar active={route} onNavigate={setRoute} items={[
  {href:"/",label:"Início"},{href:"/questoes",label:"Questões"},
  {href:"/flashcards",label:"Cards"},{href:"/desempenho",label:"Progresso"}]} />
```

**Four destinations maximum**, one short word each. Anything else — catalogue,
settings, account — belongs behind the profile button in `AppNav`, not in the bar.
Text labels only: the product has no icon set.
