import {Application, Text, Assets} from "pixi.js";
import { ASSET_SYMBOL_PATH } from "./constants";

export async function runPreloader(app:Application): Promise<void> {
    console.log("Preloader started")
    const label = new Text ({
        text: "Loading ... 0%",
        style : {
            fontSize:28,
            fill: 0xffffff,
            fontWeight:"bold",
        }
    });
    
    label.anchor.set(0.5);
    label.x = app.screen.width/2;;
    label.y = app.screen.height/2;
    app.stage.addChild(label);

    const center = (): void => {
    label.x = app.screen.width / 2;
    label.y = app.screen.height / 2;
    };

    app.renderer.on("resize",center);

    await Assets.load(
        ASSET_SYMBOL_PATH.map((a)=> ({alias: a.alias, src: a.symbol})),
        (progress:number)=> {
            label.text = `Loading... ${Math.round(progress * 100)}%`;
        },
    );

    app.renderer.off("resize", center);
    app.stage.removeChild(label);
    label.destroy();
}