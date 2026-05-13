import { describe, expect, it } from "vitest";
import { getProgressLevel } from "./progress";

describe("Progress Level", () => {
  it("start quando 0", () => {
    expect(getProgressLevel(0)).toBe("start");
  });

  it("low quando menor que 0.5", () => {
    expect(getProgressLevel(0.3)).toBe("low");
  });

  it("medium quando menor que 0.8", () => {
    expect(getProgressLevel(0.6)).toBe("medium");
  });

  it("high quando menor que 1", () => {
    expect(getProgressLevel(0.9)).toBe("high");
  });

  it("done quando >= 1", () => {
    expect(getProgressLevel(1)).toBe("done");
  });
});
