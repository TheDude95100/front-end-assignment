import { describe, it, expect } from "vitest";
import { resolveScreen, randomPositions } from "../src/reels.js";
import { REELSET, NUM_REELS } from "../src/constants.js";

describe("resolveScreen", () => {
  describe("assignment examples", () => {
    it("positions [0,0,0,0,0] produces the correct top row", () => {
      const screen = resolveScreen([0, 0, 0, 0, 0]);
      expect(screen[0]).toEqual(["hv2", "hv1", "lv1", "hv2", "lv3"]);
    });

    it("positions [0,0,0,0,0] produces the correct middle row", () => {
      const screen = resolveScreen([0, 0, 0, 0, 0]);
      expect(screen[1]).toEqual(["lv3", "lv2", "hv2", "lv2", "lv4"]);
    });

    it("positions [0,0,0,0,0] produces the correct bottom row", () => {
      const screen = resolveScreen([0, 0, 0, 0, 0]);
      expect(screen[2]).toEqual(["lv3", "lv3", "lv3", "hv3", "hv2"]);
    });

    it("positions [18,9,2,0,12] produces the correct screen", () => {
      const screen = resolveScreen([18, 9, 2, 0, 12]);
      expect(screen).toEqual([
        ["lv3", "hv4", "lv3", "hv2", "lv2"],
        ["hv2", "lv3", "lv4", "lv2", "hv4"],
        ["hv2", "hv2", "hv3", "hv3", "hv1"],
      ]);
    });
  });
});

describe("randomPositions", () => {
  it("returns exactly NUM_REELS positions", () => {
    expect(randomPositions()).toHaveLength(NUM_REELS);
  });

  it("every position is within its band's valid range", () => {
    for (let i = 0; i < 20; i++) {
      const positions = randomPositions();
      positions.forEach((pos, col) => {
        expect(pos).toBeGreaterThanOrEqual(0);
        expect(pos).toBeLessThan(REELSET[col].length);
      });
    }
  });
  it("produces integer values only", () => {
    randomPositions().forEach((pos) => expect(Number.isInteger(pos)).toBe(true));
  });
});