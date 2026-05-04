const FONT_SIZE_MAX = 20;

const FONT_SIZE_MIN = 10;
import {Container, Text} from "pixi.js"

export class WinPanel extends Container{
    #text!: Text;

    constructor (){
        super();
        this.#buildText();
    }

    setText(message: string){
        this.#text.text = message;
    }

    fitToHeight(maxHeight: number):void {
        let fs = FONT_SIZE_MAX;
        for(;fs>= FONT_SIZE_MIN;fs--){
            this.#text.style.fontSize = fs;
            if (this.#text.height <= maxHeight)break;
        }
    }

    #buildText() {
        this.#text = new Text({
        text:"",
        style:{
            fontFamily: "monospace",
            fontSize: FONT_SIZE_MAX,
            fill: 0xffd700,
            align: "center",
            wordWrap: false,
        },
    });
    this.#text.anchor.set(0.5);
    this.addChild(this.#text);
  }
}