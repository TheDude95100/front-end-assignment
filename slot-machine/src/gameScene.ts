import { Application, Container } from "pixi.js";
import { resolveScreen} from "./reels.js";
import { ReelGrid }   from "./reelGrid.js";

export class GameScene extends Container {
    readonly #app: Application;
    readonly #reelGrid: ReelGrid;

    #positions: number[] = [0,0,0,0,0];

    readonly #onResize: () => void;

    constructor(app: Application){
        super();
        this.#app = app;

        this.#reelGrid = new ReelGrid();

        this.#buildChildren();
        this.#showInitialState();

        this.#onResize = () => this.#layout();
        app.renderer.on("resize", this.#onResize);
        this.#layout();
    }

    #buildChildren(): void {
        this.addChild(this.#reelGrid);
    }
    
    #showInitialState(): void {
        this.#reelGrid.setScreen(resolveScreen(this.#positions));
    }

    #layout(): void {
        const viewW   = this.#app.screen.width;
        const viewH   = this.#app.screen.height;
        const gridW   = this.#reelGrid.naturalWidth;
        const gridH   = this.#reelGrid.naturalHeight;
    
        const naturalH = gridH + 24;
    
        const scaleX = (viewW - 20 * 2) / gridW;
        const scaleY = (viewH - 20 * 2) / naturalH;
        const scale  = Math.min(scaleX, scaleY, 1.0);
    
        this.scale.set(scale);
    
        this.x = (viewW - gridW * scale) / 2;
        this.y = (viewH - gridH * scale) / 2;
    
        this.#reelGrid.x = 0;
        this.#reelGrid.y = 0;
  }
}