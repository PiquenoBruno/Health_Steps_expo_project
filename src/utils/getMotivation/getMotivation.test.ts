import { describe, expect, it } from "vitest";
import { getMotivation } from "./getMotivation";
describe("Motivation", () => {
  it("deve retornar uma string", () => {
    const result = getMotivation(0.3);

    expect(typeof result).toBe("string");
  });

  it("não deve retornar vazio", () => {
    const result = getMotivation(0.9);

    expect(result.length).toBeGreaterThan(0);
  });
});