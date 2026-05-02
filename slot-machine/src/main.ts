import './style.css'
import { Application } from "pixi.js";
import { runPreloader } from "./preloader.js";

const app = new Application();
 
await app.init({
  resizeTo: window,
  antialias: true,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
});
 
document.body.appendChild(app.canvas);
 
await runPreloader(app);