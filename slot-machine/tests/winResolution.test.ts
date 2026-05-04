import { describe, it, expect } from "vitest";
import { evaluateWins, totalPayout, formatWinsText } from "../src/winResolution.js";
import { resolveScreen } from "../src/reels.js";
import type { Screen } from "../src/constants.js";

const winsAt = (positions: number[]) => evaluateWins(resolveScreen(positions));

const onLine = (wins: ReturnType<typeof evaluateWins>, id: number) =>
  wins.filter((w) => w.paylineId === id);

describe("evaluateWins", () => {
  describe("no-win cases", () => {
    it("returns no wins for positions [1,16,2,15,0]", () => {
      expect(winsAt([1, 16, 2, 15, 0])).toHaveLength(0);
    });

    it("returns no wins for positions [18,9,2,0,12]", () => {
      expect(winsAt([18, 9, 2, 0, 12])).toHaveLength(0);
    });

    it("returns no wins for positions [1,16,2,15,0] with zero total payout", () => {
      expect(totalPayout(winsAt([1, 16, 2, 15, 0]))).toBe(0);
    });
  });

  describe("payline 2 — middle row", () => {
    const screen: Screen = [
      ["lv1", "lv2", "lv3", "lv4", "lv1"],
      ["hv1", "hv1", "hv1", "hv1", "hv1"],
      ["lv2", "lv3", "lv4", "lv1", "lv2"],
    ];

    it("detects hv1 x5 on payline 2", () => {
      const wins = evaluateWins(screen);
      const l1 = onLine(wins, 2);
      expect(l1).toHaveLength(1);
      expect(l1[0]).toMatchObject({ symbolId: "hv1", count: 5, payout: 50 });
    });
  });

  describe("payline 1 — top row", () => {
    const screen: Screen = [
      ["hv2", "hv2", "hv2", "lv1", "lv2"],
      ["lv3", "lv1", "lv3", "hv1", "lv2"],
      ["lv3", "lv3", "lv4", "lv2", "hv1"],
    ];

    it("detects hv2 x3 on payline 1", () => {
      const l2 = onLine(evaluateWins(screen), 1);
      expect(l2).toHaveLength(1);
      expect(l2[0]).toMatchObject({ symbolId: "hv2", count: 3, payout: 5 });
    });
  });

  describe("payline 3 — bottom row", () => {
    it("detects lv3 x3 on payline 3 for positions [0,0,0,0,0]", () => {
      const wins = winsAt([0, 0, 0, 0, 0]);
      const l3 = onLine(wins, 3);
      expect(l3).toHaveLength(1);
      expect(l3[0]).toMatchObject({ symbolId: "lv3", count: 3, payout: 1 });
    });
  });

  describe("diagonal paylines (4 & 5)", () => {
    it("detects a win on payline 4 when the diagonal matches", () => {
      const screen: Screen = [
        ["hv3", "hv3", "lv1", "lv2", "lv2"],
        ["lv1", "lv1", "hv3", "lv1", "lv1"],
        ["lv2", "lv2", "lv2", "hv3", "hv3"],
      ];
      const l4 = onLine(evaluateWins(screen), 4);
      expect(l4).toHaveLength(1);
      expect(l4[0]).toMatchObject({ symbolId: "hv3", count: 5, payout: 15 });
    });

    it("detects a win on payline 5 when the reverse diagonal matches", () => {
      const screen: Screen = [
        ["lv2", "lv2", "lv1", "hv4", "hv4"],
        ["lv1", "lv1", "hv4", "lv1", "lv1"],
        ["hv4", "hv4", "lv2", "lv2", "lv2"],
      ];
      const l5 = onLine(evaluateWins(screen), 5);
      expect(l5).toHaveLength(1);
      expect(l5[0]).toMatchObject({ symbolId: "hv4", count: 5, payout: 15 });
    });
  });

  describe("W-shape paylines (6 & 7)", () => {
    it("detects lv1 x4 on payline 6 for positions [5,14,9,9,16]", () => {
      const l6 = onLine(winsAt([5, 14, 9, 9, 16]), 6);
      expect(l6).toHaveLength(1);
      expect(l6[0]).toMatchObject({ symbolId: "lv1", count: 4, payout: 5 });
    });

    it("detects a win on payline 7 when the W-bottom pattern matches", () => {
      const screen: Screen = [
        ["lv2", "lv1", "lv3", "lv1", "lv2"],
        ["lv1", "lv3", "lv1", "lv3", "lv1"],
        ["lv3", "lv2", "lv2", "lv2", "lv3"],
      ];
      const l7 = onLine(evaluateWins(screen), 7);
      expect(l7).toHaveLength(1);
      expect(l7[0]).toMatchObject({ symbolId: "lv3", count: 5, payout: 3 });
    });
  });

  describe("multi-payline hits", () => {
    it("positions [0,11,1,10,14] → total 6 across two paylines", () => {
      const wins = winsAt([0, 11, 1, 10, 14]);
      expect(totalPayout(wins)).toBe(6);

      const l1 = onLine(wins, 1);
      expect(l1[0]).toMatchObject({ symbolId: "hv2", count: 3, payout: 5 });

      const l5 = onLine(wins, 5);
      expect(l5[0]).toMatchObject({ symbolId: "lv3", count: 3, payout: 1 });
    });
  });

  describe("minimum match threshold", () => {
    it("does not count a run of 2 as a win", () => {
      const screen: Screen = [
        ["hv1", "hv1", "lv1", "lv2", "lv3"],
        ["lv1", "lv2", "lv3", "lv4", "lv1"],
        ["lv2", "lv3", "lv4", "lv1", "lv2"],
      ];
      const l2 = onLine(evaluateWins(screen), 2);
      expect(l2).toHaveLength(0);
    });
  });
});


describe("totalPayout", () => {
  it("returns 0 for an empty wins array", () => {
    expect(totalPayout([])).toBe(0);
  });

  it("sums a single win correctly", () => {
    const wins = winsAt([0, 0, 0, 0, 0]);
    expect(totalPayout(wins)).toBe(1);
  });

  it("sums multiple wins correctly", () => {
    const wins = winsAt([0, 11, 1, 10, 14]);
    expect(totalPayout(wins)).toBe(6);
  });
});


describe("formatWinsText", () => {
  it("returns 'Total wins: 0' when there are no wins", () => {
    expect(formatWinsText([])).toBe("Total wins: 0");
  });

  it("includes total wins on the first line", () => {
    const wins = winsAt([0, 0, 0, 0, 0]);
    expect(formatWinsText(wins)).toMatch(/^Total wins: 1/);
  });

  it("formats each win as '- payline N, symbolId xC, P'", () => {
    const wins = winsAt([0, 0, 0, 0, 0]);
    expect(formatWinsText(wins)).toContain("- payline 3, lv3 x3, 1");
  });

  it("lists wins in payline order (payline 2 before payline 5)", () => {
    const text = formatWinsText(winsAt([0, 11, 1, 10, 14]));
    const l2pos = text.indexOf("payline 2");
    const l5pos = text.indexOf("payline 5");
    expect(l2pos).toBeGreaterThanOrEqual(-1);
    expect(l5pos).toBeGreaterThan(l2pos);
  });

  it("produces one line per win entry plus the header", () => {
    const wins = winsAt([0, 11, 1, 10, 14]);
    const lines = formatWinsText(wins).split("\n");
    expect(lines).toHaveLength(3);
  });
});