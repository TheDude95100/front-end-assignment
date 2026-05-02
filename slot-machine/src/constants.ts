export type SymbolId = | "hv1" | "hv2" | "hv3" | "hv4" | "lv1" | "lv2" | "lv3" | "lv4";

export type Screen = [ 
  [SymbolId, SymbolId, SymbolId, SymbolId, SymbolId],
  [SymbolId, SymbolId, SymbolId, SymbolId, SymbolId],
  [SymbolId, SymbolId, SymbolId, SymbolId, SymbolId],
];

export const REELSET: ReadonlyArray<ReadonlyArray<SymbolId>> =
[
    ["hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"],
    ["hv1", "lv2", "lv3", "lv2", "lv1", "lv1", "lv4", "lv1", "lv1", "hv4", "lv3", "hv2", "lv1", "lv3", "hv1", "lv1", "lv2", "lv4", "lv3", "lv2"],
    ["lv1", "hv2", "lv3", "lv4", "hv3", "hv2", "lv2", "hv2", "hv2", "lv1", "hv3", "lv1", "hv1", "lv2", "hv3", "hv2", "hv4", "hv1", "lv2", "lv4"],
    ["hv2", "lv2", "hv3", "lv2", "lv4", "lv4", "hv3", "lv2", "lv4", "hv1", "lv1", "hv1", "lv2", "hv3", "lv2", "lv3", "hv2", "lv1", "hv3", "lv2"],
    ["lv3", "lv4", "hv2", "hv3", "hv4", "hv1", "hv3", "hv2", "hv2", "hv4", "hv4", "hv2", "lv2", "hv4", "hv1", "lv2", "hv1", "lv2", "hv4", "lv4"]
];

export type SymbolPayouts = readonly [number, number, number];
export const PAYTABLES: Readonly<Record<SymbolId,SymbolPayouts>> =
{
    hv1 : [10,20,50],
    hv2 : [5,10,20],
    hv3 : [5,10,15],
    hv4 : [5,10,15],
    lv1 : [2,5,10],
    lv2 : [1,2,5],
    lv3 : [1,2,3],
    lv4 : [1,2,3]
};

export interface Payline {
  readonly id: number;
  readonly rows: readonly [number, number, number, number, number];
}
 
export const PAYLINES: ReadonlyArray<Payline> = 
[
    {id:1, rows:[0,0,0,0,0]},
    {id:2, rows:[1,1,1,1,1]},
    {id:3, rows:[2,2,2,2,2]},
    {id:4, rows:[0,0,1,2,2]},
    {id:5, rows:[2,2,1,0,0]},
    {id:6, rows:[0,1,2,1,0]},
    {id:7, rows:[2,1,0,1,2]},
];
export interface AssetEntry {
  readonly alias: string;
  readonly symbol: string;
}
export const ASSET_SYMBOL_PATH: ReadonlyArray<AssetEntry> =
[
    {alias : "hav1", symbol:"assets/hv1_symbol.png"},
    {alias : "hav2", symbol:"assets/hv2_symbol.png"},
    {alias : "hav3", symbol:"assets/hv3_symbol.png"},
    {alias : "hav4", symbol:"assets/hv4_symbol.png"},
    {alias : "lv1", symbol:"assets/lv1_symbol.png"},
    {alias : "lv2", symbol:"assets/lv2_symbol.png"},
    {alias : "lv3", symbol:"assets/lv3_symbol.png"},
    {alias : "lv4", symbol:"assets/lv4_symbol.png"},
    {alias : "spin_button", symbol:"assets/spin_button.png"},
];

export const NUM_ROWS = 3 as const;
export const NUM_REELS = 5 as const;