import Paddle from "./paddle.js";
import Ball from "./ball.js";
import InputHandler from "./input.js";
import { buildLevel, levels } from "./levels.js";

const GAME_STATE = {
  RUNNING: 1,
  PAUSED: 2,
  GAME_OVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight, brickSize) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.brickSize = brickSize;

    this.gameState = GAME_STATE.RUNNING;
  }

  start() {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);

    this.bricks = buildLevel(this, levels[1], this.brickSize);

    this.gameObjects = [this.paddle, this.ball];

    new InputHandler(this.paddle, this);
  }

  update(dt) {
    if (this.gameState == GAME_STATE.PAUSED) return;

    this.gameObjects.forEach(object => object.update(dt));
  }

  draw(ctx) {
    for (let key in this.bricks) {
      this.bricks[key].draw(ctx);
    }

    this.gameObjects.forEach(object => object.draw(ctx));

    if (this.gameState == GAME_STATE.PAUSED) {
      this.drawPauseMenu(ctx);
    }
  }

  togglePause() {
    if (this.gameState == GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
  }

  getBrickByPosition(x, y) {
    let brickPosition = {
      x:
        Math.floor(x / this.brickSize) * this.brickSize + 1,
      y: Math.floor(y / this.brickSize) * this.brickSize + 1
    };

    return this.bricks[
      brickPosition.x + "-" + brickPosition.y
    ];
  }

  deleteBrickByPosition(position) {
    delete this.bricks[position.x + "-" + position.y];
  }

  drawPauseMenu = function(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      "Paused!",
      this.gameWidth / 2,
      this.gameHeight / 2
    );
  };
}
