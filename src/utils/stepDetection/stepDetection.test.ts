import { describe, expect, it } from "vitest";
import { detectStep } from "./stepDetection";

describe("Step Detection", () => {
  it("deve detectar um passo válido", () => {
    const result = detectStep({
      magnitude: 1.6,
      previousMagnitude: 0.1,
      lastStepTime: 0,
      now: 1000,
    });

    expect(result.detected).toBe(true);
  });

  it("não deve detectar movimento fraco (abaixo do limite)", () => {
    const result = detectStep({
      magnitude: 1.15, // filtered = 0.15
      previousMagnitude: 0,
      lastStepTime: 0,
      now: 1000,
    });

    expect(result.detected).toBe(false);
  });

  it("não deve detectar exatamente no limite do filtro (0.2)", () => {
    const result = detectStep({
      magnitude: 1.2, // filtered = 0.2
      previousMagnitude: 0,
      lastStepTime: 0,
      now: 1000,
    });

    expect(result.detected).toBe(false);
  });

  it("não deve detectar passos muito rápidos (400ms limite)", () => {
    const result = detectStep({
      magnitude: 1.6,
      previousMagnitude: 0,
      lastStepTime: 600,
      now: 1000, // diferença = 400
    });

    expect(result.detected).toBe(false);
  });

  it("deve detectar se passou do tempo mínimo", () => {
    const result = detectStep({
      magnitude: 1.6,
      previousMagnitude: 0,
      lastStepTime: 500,
      now: 1000, // 500ms
    });

    expect(result.detected).toBe(true);
  });

  it("não deve detectar se o valor anterior já era alto", () => {
    const result = detectStep({
      magnitude: 1.6,
      previousMagnitude: 0.5,
      lastStepTime: 0,
      now: 1000,
    });

    expect(result.detected).toBe(false);
  });

  it("deve retornar filtered corretamente", () => {
    const result = detectStep({
      magnitude: 1.8,
      previousMagnitude: 0,
      lastStepTime: 0,
      now: 1000,
    });

    expect(result.filtered).toBeCloseTo(0.8);
  });
});