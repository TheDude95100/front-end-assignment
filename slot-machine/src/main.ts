import './style.css'
import { randomPositions, resolveScreen } from './reels'

    for(let i = 0; i<10;i++){
        console.log(resolveScreen(randomPositions()));  
    }