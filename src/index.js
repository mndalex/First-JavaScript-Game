import Game from "./game.js";

let canvas = document.getElementById("game-screen");
let fpsCounter = document.getElementById("fps-counter");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
const BRICKS_SIZE = 50;

let game = new Game(GAME_WIDTH, GAME_HEIGHT, BRICKS_SIZE);

game.start();

let lastTime = 0;
let lastFPSCalc = 0;

function gameLoop(timestamp) {
  let dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  if (timestamp - lastFPSCalc > 150) {
    let fps = Math.round(1 / dt);
    fpsCounter.innerHTML = fps;
    lastFPSCalc = timestamp;
  }

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(dt);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
