import Paddle from "./paddle.js";
import Ball from "./ball.js";
import InputHandler from "./input.js";
import { buildLevel, levels } from "./levels.js";
import { GAME_STATE } from "./game_states.js";

export default class Game {
  constructor(gameWidth, gameHeight, brickSize) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.brickSize = brickSize;

    this.gameState = GAME_STATE.RUNNING;
    this.level = 0;
  }

  start() {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);

    this.loadlevel(this.level);

    this.gameObjects = [this.paddle, this.ball];

    new InputHandler(this.paddle, this);
  }

  update(dt) {
    if (this.gameState === GAME_STATE.RUNNING) {
      if (Object.keys(this.bricks).length === 0)
        if (levels.length - 1 > this.level)
          this.gameState = GAME_STATE.LEVEL_COMPLETED;
        else this.gameState = GAME_STATE.ALL_LEVEL_COMPLETED;

      this.gameObjects.forEach(object => object.update(dt));
    }
  }

  draw(ctx) {
    if (this.gameState === GAME_STATE.LEVEL_COMPLETED) {
      this.drawLevelCompleted(ctx);
      return;
    }

    if (this.gameState === GAME_STATE.ALL_LEVEL_COMPLETED) {
      this.drawAllLevelCompleted(ctx);
      return;
    }

    for (let key in this.bricks) {
      this.bricks[key].draw(ctx);
    }

    this.gameObjects.forEach(object => object.draw(ctx));

    if (this.gameState == GAME_STATE.PAUSED) {
      this.drawPauseMenu(ctx);
    }
  }

  togglePause() {
    if (this.gameState === GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
  }

  loadNextLevel() {
    this.loadlevel(++this.level);
    this.resetPaddle();
    this.resetBall();
    this.gameState = GAME_STATE.RUNNING;
  }

  getBrickByPosition(x, y) {
    let brickPosition = {
      x: Math.floor(x / this.brickSize) * this.brickSize + 1,
      y: Math.floor(y / this.brickSize) * this.brickSize + 1
    };

    return this.bricks[brickPosition.x + "-" + brickPosition.y];
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

  loadlevel = function(level) {
    if (levels[level] != null) {
      this.bricks = buildLevel(
        this,
        levels[level],
        this.brickSize
      );
    }
  };

  drawLevelCompleted = function(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      "Level Completed!",
      this.gameWidth / 2,
      this.gameHeight / 2
    );
    ctx.fillText(
      "Press Space to continue.",
      this.gameWidth / 2,
      this.gameHeight / 2 + 35
    );
  };

  drawAllLevelCompleted = function(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      "All Level Completed!",
      this.gameWidth / 2,
      this.gameHeight / 2
    );
  };

  resetPaddle = function() {
    this.paddle.position = {
      x: this.gameWidth / 2 - this.paddle.size.x / 2,
      y: this.gameHeight - this.paddle.size.y - 10
    };
  };

  resetBall = function() {
    this.ball.position = {
      x: this.paddle.position.x + this.paddle.size.x / 2,
      y: this.paddle.position.y
    };
  };
}
