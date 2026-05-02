import {Container, Sprite, Assets } from "pixi.js";
import {NUM_REELS, NUM_ROWS, SYMBOL_SIZE, type Screen} from "./constants.js";

export const GAP = 10;
export class ReelGrid extends Container{
    readonly #sprites: Sprite[][] = [];

    constructor(){
        super();
        this.#buildSprites();
    }
        get naturalWidth(): number {
        return NUM_REELS * SYMBOL_SIZE + (NUM_REELS - 1) * GAP;
    }

    get naturalHeight(): number {
        return NUM_ROWS * SYMBOL_SIZE + (NUM_ROWS - 1) * GAP;
    }
    #buildSprites(): void {
        for (let row = 0; row < NUM_ROWS; row++) {
            this.#sprites[row] = [];
            for (let col = 0; col < NUM_REELS; col++){
                const sprite = new Sprite();
                sprite.width = SYMBOL_SIZE;
                sprite.height = SYMBOL_SIZE;
                sprite.x = col * (SYMBOL_SIZE + GAP /*lil gap */ )
                sprite.y = row * (SYMBOL_SIZE + GAP /*lil gap */ )
                this.addChild(sprite);
                this.#sprites[row][col] = sprite;
            }
        }
    }
    setScreen(screen: Screen): void {
    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_REELS; col++) {
        this.#sprites[row][col].texture = Assets.get(screen[row][col]);
      }
    }
  }
}