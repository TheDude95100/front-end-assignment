import './style.css'
import { randomPositions, resolveScreen } from './reels'
import { evaluateWins, formatWinsText } from './winResolution';

    for(let i = 0; i<1000;i++){
        console.log(formatWinsText(evaluateWins(resolveScreen(randomPositions()))));  
    }