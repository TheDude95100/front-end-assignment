import { Application, Container } from "pixi.js";
import { resolveScreen, randomPositions} from "./reels.js";
import { ReelGrid }   from "./reelGrid.js";
import { SpinButton } from "./spinButton.js";
import { WinPanel } from "./winPanel.js";
import { evaluateWins,formatWinsText } from "./winResolution.js";

const PADDING = 24;
const BTN_MARGIN_TOP = 24;
const WIN_PANEL_MARGIN_TOP = 20;
export class GameScene extends Container {
    readonly #app: Application;
    readonly #reelGrid: ReelGrid;
    readonly #spinButton: SpinButton;
    readonly #winPanel: WinPanel;

    #positions: number[] = [0,0,0,0,0];

    readonly #onResize: () => void;

    constructor(app: Application){
        super();
        this.#app = app;

        this.#reelGrid = new ReelGrid();
        this.#spinButton = new SpinButton();
        this.#winPanel = new WinPanel();

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

        this.addChild(this.#winPanel);
    }
    
    #showInitialState(): void {
        this.#reelGrid.setScreen(resolveScreen(this.#positions));
        this.#winPanel.setText("SPIN TO WIN ('til you die 'Til the light dies in your eyes)")
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

        this.#winPanel.x = gridW / 2;
        this.#winPanel.y = this.#spinButton.y + btnSize / 2 + WIN_PANEL_MARGIN_TOP;
    }
    #onSpin(): void {
        this.#spinButton.setEnabled(false);
    
        this.#positions     = randomPositions();
        const screen        = resolveScreen(this.#positions);
    
        this.#reelGrid.setScreen(screen);
        this.#winPanel.setText(formatWinsText(evaluateWins(screen)));
    
        this.#layout();
        this.#spinButton.setEnabled(true);
    }
}