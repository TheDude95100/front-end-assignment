import {Container, Sprite, Assets} from "pixi.js";

const BUTTON_SIZE = 150;
const ALPHA_NORMAL   = 1.0;
const ALPHA_HOVER    = 0.7;
const ALPHA_DISABLED = 0.5;

export class SpinButton extends Container {
    readonly #sprite: Sprite;
    #enabled = true;
    constructor(){
        super();
        this.#sprite = this.#buildSprite();
    }
    setEnabled(enabled: boolean): void {
        this.#enabled            = enabled;
        this.#sprite.interactive = enabled;
        this.#sprite.alpha       = enabled ? ALPHA_NORMAL : ALPHA_DISABLED;
    }
    get size(): number {
        return BUTTON_SIZE;
    }
    #buildSprite(): Sprite {
        const sprite = new Sprite(Assets.get("spin_button"));
        sprite.width  = BUTTON_SIZE;
        sprite.height = BUTTON_SIZE;
        sprite.anchor.set(0.5);
        sprite.interactive = true;
        sprite.cursor = "pointer";

        sprite.on("pointerdown", () => {
        if (this.#enabled) this.emit("spin");
        });
        sprite.on("pointerover", () => {
        if (this.#enabled) sprite.alpha = ALPHA_HOVER;
        });
        sprite.on("pointerout", () => {
        if (this.#enabled) sprite.alpha = ALPHA_NORMAL;
        });
    
        this.addChild(sprite);
        return sprite;
    }
}
