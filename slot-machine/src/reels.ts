import { REELSET,NUM_REELS,NUM_ROWS, type Screen, type SymbolId } from "./constants";

export function randomPositions(): number[] {
  return REELSET.map((band) => Math.floor(Math.random() * band.length));
}

export function resolveScreen(positions: readonly number[]): Screen {
  const screen = [] as unknown as Screen;
 
  for (let row = 0; row < NUM_ROWS; row++) {
    screen[row] = [] as unknown as Screen[number];
    for (let col = 0; col < NUM_REELS; col++) {
      const band = REELSET[col];
      const index = (positions[col] + row) % band.length;
      (screen[row] as SymbolId[])[col] = band[index];
    }
  }
 
  return screen;
}