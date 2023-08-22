import { ContextReplacementPlugin } from "webpack";
import { Camera } from "./engine/camera";
import { Mouse } from "./engine/mouse";
import { Game } from "./game";

const canvas: HTMLCanvasElement = document.createElement("canvas");
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

const mouse: Mouse = { x: 0, y: 0 };
const game = new Game(new Camera());

export const WIDTH = 800;
export const HEIGHT = 600;

canvas.id = "game";
canvas.width = 800;
canvas.height = 600;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// let ratio = 1;
// let x = 0;
// let y = 0;

// const resize = () => {
//   ratio = Math.min(window.innerWidth / WIDTH, window.innerHeight / HEIGHT);
//   canvas.style.transformOrigin = "top left";
//   x = (window.innerWidth - WIDTH * ratio) * 0.5;
//   y = (window.innerHeight - HEIGHT * ratio) * 0.5;
//   canvas.style.transform = `translate(${x}px,${y}px) scale(${ratio})`;
// };

// resize();
// window.onresize = resize;

let isFull = false;
document.onfullscreenchange = () => isFull = !isFull;

document.onmousemove = (e: MouseEvent) => {
  mouse.x = isFull ? (e.x / window.innerWidth * 800) : e.offsetX;
  mouse.y = isFull ? (e.y / window.innerHeight * 600) : e.offsetY;
};

document.onkeydown = (e: KeyboardEvent) => {
  // game.audio.prepare();
  if(e.key == 'f') {
    canvas.requestFullscreen();
  }
  // if(e.key == 'n') {
  //   game.nextLevel();
  //   // game.life += 100;
  // }
  // if(e.key == 'p') {
  //   level.level++;
  //   game.picker.create(1, 1);
  // }
  // if(e.key == 'c') {
  //   game.picker.rewards = 1;
  //   game.picker.create(1, 0);
  // }
}

// document.ontouchstart = (e: TouchEvent) => {
//   game.click((e.touches[0].clientX - x) / ratio, (e.touches[0].clientY - y) / ratio);
// };

document.onmousedown = (e: MouseEvent) => {
  // game.audio.play();
  if(e.button == 0) mouse.pressing = true;
  if(e.button > 0) mouse.right = true;
};

document.oncontextmenu = (e: MouseEvent) => e.preventDefault();

document.onmouseup = (e: MouseEvent) => {
  if(e.button == 0) mouse.pressing = false;
  if(e.button > 0) mouse.right = false;
};

const tick = (t: number) => {
  game.update(t, mouse);
  game.draw(ctx);
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);