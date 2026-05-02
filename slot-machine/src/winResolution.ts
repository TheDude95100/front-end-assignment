import { PAYLINES, PAYTABLES,NUM_REELS, type Screen, type SymbolId } from "./constants";

export interface WinResult{
    readonly paylineId: number;
    readonly symbolId: SymbolId;
    readonly count:number;
    readonly payout: number;
}

export function evaluateWins (screen:Screen): WinResult [] {
    const wins: WinResult[]=[];

    for (const payline of PAYLINES) {
        const anchorSymbol: SymbolId = screen[payline.rows[0]][0];
        let matchCount = 1;

        for(let col=1; col<NUM_REELS; col++){
            if(screen[payline.rows[col]][col] === anchorSymbol){
                matchCount++;
            }
            else 
            {
                break;
            }
        }
        if (matchCount >= 3){
            const payout = PAYTABLES[anchorSymbol][matchCount-3];
            wins.push({paylineId: payline.id, symbolId:anchorSymbol, count: matchCount, payout});
        }
    }
    return wins;
}

export function totalPayout(wins:WinResult[]):number{
    return wins.reduce((sum,w)=>sum + w.payout,0)
}

export function formatWinsText(wins:WinResult[]):string{
    const total = totalPayout(wins);
    console.log("TOTAL PAYOUT:" + total);

    if (wins.length === 0){
        return "Total wins: 0";
    }

    const lines = [`Total wins: ${total}`];
    for (const win of wins){
        lines.push(`- payline ${win.paylineId}, ${win.symbolId}, ${win.symbolId} x${win.count}, ${win.payout}`);
    }
    return lines.join("\n");
}