import { Application, Container } from "pixi.js";
import { resolveScreen, randomPositions} from "./reels.js";
import { ReelGrid }   from "./reelGrid.js";
import { SpinButton } from "./spinButton.js";

const PADDING = 24;
const BTN_MARGIN_TOP = 24;
export class GameScene extends Container {
    readonly #app: Application;
    readonly #reelGrid: ReelGrid;
    readonly #spinButton: SpinButton;

    #positions: number[] = [0,0,0,0,0];

    readonly #onResize: () => void;

    constructor(app: Application){
        super();
        this.#app = app;

        this.#reelGrid = new ReelGrid();
        this.#spinButton = new SpinButton();

        this.#buildChildren();
        this.#showInitialState();

        this.#onResize = () => this.#layout();
        app.renderer.on("resize", this.#onResize);
        this.#layout();
    }

    #buildChildren(): void {
        this.addChild(this.#reelGrid);

        this.#spinButton.on("spin", () => this.#onSpin());
        this.addChild(this.#spinButton);
    }
    
    #showInitialState(): void {
        this.#reelGrid.setScreen(resolveScreen(this.#positions));
    }
    override destroy(...args: Parameters<typeof Container.prototype.destroy>): void {
        this.#app.renderer.off("resize", this.#onResize);
        super.destroy(...args);
    }

    #layout(): void {
        const viewW   = this.#app.screen.width;
        const viewH   = this.#app.screen.height;
        const gridW   = this.#reelGrid.naturalWidth;
        const gridH   = this.#reelGrid.naturalHeight;
        const btnSize = this.#spinButton.size;
    
        const naturalH = gridH + PADDING + BTN_MARGIN_TOP + btnSize + 80;
    
        const scaleX = (viewW - PADDING * 2) / gridW;
        const scaleY = (viewH - PADDING * 2) / naturalH;
        const scale  = Math.min(scaleX, scaleY, 1.0);
    
        this.scale.set(scale);
    
        this.x = (viewW - gridW * scale) / 2;
        this.y = (viewH - gridH * scale) / 2;
    
        this.#reelGrid.x = 0;
        this.#reelGrid.y = 0;

        this.#spinButton.x = gridW / 2;
        this.#spinButton.y = gridH + BTN_MARGIN_TOP + btnSize / 2;
    }
    #onSpin(): void {
        this.#spinButton.setEnabled(false);
    
        this.#positions     = randomPositions();
        const screen        = resolveScreen(this.#positions);
    
        this.#reelGrid.setScreen(screen);
    
        this.#layout();
        this.#spinButton.setEnabled(true);
    }
}