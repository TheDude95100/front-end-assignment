import './style.css'
import { Application } from "pixi.js";
import { runPreloader } from "./preloader.js";
import { GameScene } from './gameScene.js';

const app = new Application();
 
await app.init({
  resizeTo: window,
  antialias: true,
  background:0xffffff,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
});
 
document.body.appendChild(app.canvas);
 
await runPreloader(app);

app.stage.addChild(new GameScene(app));