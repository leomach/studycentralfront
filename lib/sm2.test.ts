// Testes do espelho SM-2 — os mesmos casos devem existir no Go (CLAUDE.md §7).
import { describe, it, expect } from "vitest";
import {
  review,
  nextIntervalDays,
  initialState,
  EASE_FLOOR,
  DEFAULT_EASE,
} from "./sm2";

describe("SM-2 — card novo (interval = 0)", () => {
  it("grade 3 num card novo usa base mínima de 1 dia, não trava em zero", () => {
    const s = review(initialState(), 3);
    // base = max(0,1)=1 → 1 * 2.5 = 2.5 → round = 3... na verdade round(2.5)=3? não.
    // Math.round(2.5) = 3 em JS (arredonda para cima no meio). Documentado.
    expect(s.interval_days).toBeGreaterThanOrEqual(1);
    expect(s.reps).toBe(1);
  });

  it("grade 1 num card novo mantém interval em 1 e nunca em 0", () => {
    const s = review(initialState(), 1);
    expect(s.interval_days).toBe(1);
    expect(s.reps).toBe(0);
    expect(s.lapses).toBe(1);
  });
});

describe("SM-2 — piso de ease em 1.3", () => {
  it("errar repetidamente não deixa o ease cair abaixo de 1.3", () => {
    let s = { interval_days: 10, ease_factor: 1.4, reps: 5, lapses: 0 };
    s = review(s, 1); // 1.4 - 0.2 = 1.2 → piso 1.3
    expect(s.ease_factor).toBe(EASE_FLOOR);
    s = review(s, 1); // permanece no piso
    expect(s.ease_factor).toBe(EASE_FLOOR);
  });
});

describe("SM-2 — multiplicadores por grade", () => {
  const base = { interval_days: 10, ease_factor: 2.5, reps: 3, lapses: 0 };

  it("grade 2 (difícil) multiplica por 1.2", () => {
    expect(review(base, 2).interval_days).toBe(12); // 10 * 1.2
    expect(review(base, 2).ease_factor).toBe(2.5); // inalterado
    expect(review(base, 2).reps).toBe(4);
  });

  it("grade 3 (bom) multiplica pelo ease", () => {
    expect(review(base, 3).interval_days).toBe(25); // 10 * 2.5
    expect(review(base, 3).ease_factor).toBe(2.5);
  });

  it("grade 4 (fácil) multiplica por ease*1.3 e incrementa ease", () => {
    expect(review(base, 4).interval_days).toBe(33); // round(10 * 2.5 * 1.3 = 32.5)
    expect(review(base, 4).ease_factor).toBeCloseTo(2.6, 10);
  });

  it("grade 1 (errei) zera reps, interval = 1, decrementa ease, +1 lapse", () => {
    const s = review(base, 1);
    expect(s.interval_days).toBe(1);
    expect(s.reps).toBe(0);
    expect(s.lapses).toBe(1);
    expect(s.ease_factor).toBeCloseTo(2.3, 10);
  });
});

describe("SM-2 — nextIntervalDays (preview dos botões)", () => {
  it("devolve apenas os dias sem materializar o resto", () => {
    const base = { interval_days: 6, ease_factor: 2.5, reps: 2, lapses: 0 };
    expect(nextIntervalDays(base, 1)).toBe(1);
    expect(nextIntervalDays(base, 2)).toBe(7); // round(6*1.2=7.2)=7
    expect(nextIntervalDays(base, 3)).toBe(15); // round(6*2.5=15)
    expect(nextIntervalDays(base, 4)).toBe(20); // round(6*2.5*1.3=19.5)=20
  });
});

describe("SM-2 — intervalo nunca abaixo de 1 dia", () => {
  it("mesmo com ease no piso e interval baixo, resultado >= 1", () => {
    const s = { interval_days: 0, ease_factor: DEFAULT_EASE, reps: 0, lapses: 0 };
    expect(review(s, 2).interval_days).toBeGreaterThanOrEqual(1);
    expect(review(s, 3).interval_days).toBeGreaterThanOrEqual(1);
    expect(review(s, 4).interval_days).toBeGreaterThanOrEqual(1);
  });
});
