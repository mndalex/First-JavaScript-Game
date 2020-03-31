export default class Ball {
  constructor(game) {
    this.img = document.getElementById("ball-img");

    this.game = game;

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.size = { x: 20, y: 20 };

    this.position = {
      x: this.game.paddle.position.x,
      y: this.game.paddle.position.y
    };

    this.speed = { x: 200, y: 200 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );
  }

  update(dt) {
    this.position.x += this.speed.x * dt;
    this.position.y += this.speed.y * dt;

    this.detectCollisionWithWall();
    this.detectCollisionWithPaddle();
    this.detectCollisionWithBricks();
  }

  detectCollisionWithWall = function() {
    if (this.position.x + this.size.x >= this.gameWidth) {
      this.speed.x = -this.speed.x;
      this.position.x = this.gameWidth - this.size.x;
    }
    if (this.position.x <= 0) {
      this.speed.x = -this.speed.x;
      this.position.x = 0;
    }

    if (this.position.y + this.size.y >= this.gameHeight) {
      this.speed.y = -this.speed.y;
      this.position.y = this.gameHeight - this.size.y;
    }
    if (this.position.y <= 0) {
      this.speed.y = -this.speed.y;
      this.position.y = 0;
    }
  };

  detectCollisionWithPaddle = function() {
    let bottomOfBall = this.position.y + this.size.y;
    let rightSideOfBall = this.position.x + this.size.x;
    let leftSideOfBall = this.position.x;

    let topOfPaddle = this.game.paddle.position.y;
    let rightSideOfPaddle =
      this.game.paddle.position.x + this.game.paddle.size.x;
    let leftSideOfPaddle = this.game.paddle.position.x;

    if (
      bottomOfBall >= topOfPaddle &&
      leftSideOfBall >= leftSideOfPaddle &&
      rightSideOfBall <= rightSideOfPaddle
    ) {
      if (this.speed.x * this.game.paddle.speed < 0)
        this.speed.x = -this.speed.x;
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size.y;
    }
  };

  detectCollisionWithBricks = function() {
    let bricks = this.collectHittedBricks();

    bricks.forEach(brick => {
      if (brick && !brick.destroyed) {
        let topOfBrick = brick.position.y;
        let bottomOfBrick = brick.position.y + brick.size;
        let leftSideOfBrick = brick.position.x;
        let rightSideOfBrick = brick.position.x + brick.size;

        brick.destroyed = true;
        this.game.deleteBrickByPosition(brick.position);

        let topOfBall = this.position.y;
        let bottomOfBall = this.position.y + this.size.y;
        let leftSideOfBall = this.position.x;
        let rightSideOfBall = this.position.x + this.size.x;

        let deltaTop = Math.abs(topOfBrick - bottomOfBall);
        let deltaBottom = Math.abs(bottomOfBrick - topOfBall);
        let deltaLeftSide = Math.abs(
          leftSideOfBrick - rightSideOfBall
        );
        let deltaRightSide = Math.abs(
          rightSideOfBrick - leftSideOfBall
        );

        let minDelta = Math.min(
          deltaTop,
          deltaBottom,
          deltaLeftSide,
          deltaRightSide
        );

        if (deltaTop == minDelta) {
          // console.log("top");
          this.position.y -= deltaTop;
          this.speed.y = -Math.abs(this.speed.y);
        }
        if (deltaBottom == minDelta) {
          // console.log("bottom:");
          this.position.y += deltaBottom;
          this.speed.y = Math.abs(this.speed.y);
        }
        if (deltaLeftSide == minDelta) {
          // console.log("left");
          this.position.x -= deltaLeftSide;
          this.speed.x = -Math.abs(this.speed.x);
        }
        if (deltaRightSide == minDelta) {
          // console.log("right");
          this.position.x += deltaRightSide;
          this.speed.x = Math.abs(this.speed.x);
        }
      }
    });
  };

  collectHittedBricks = function() {
    let bricks = [];

    //top left direction
    if (this.speed.x < 0 && this.speed.y < 0) {
      //ball top left corner
      bricks.push(
        this.game.getBrickByPosition(
          this.position.x,
          this.position.y
        )
      );
      //ball top right corner
      bricks.push(
        this.game.getBrickByPosition(
          this.position.x + this.size.x,
          this.position.y
        )
      );
      //ball bottom left corner
      bricks.push(
        this.game.getBrickByPosition(
          this.position.x,
          this.position.y + this.size.y
        )
      );
    }

    //top right direction
    else if (this.speed.x > 0 && this.speed.y < 0) {
      //ball top right corner
      bricks.push(
        this.game.getBrickByPosition(
          this.position.x + this.size.x,
          this.position.y
        )
      );
      //ball top left corner
      bricks.push(
        this.game.getBrickByPosition(
          this.position.x,
          this.position.y
        )
      );
      //ball bottom right corner
      bricks.push(
        this.game.getBrickByPosition(
          this.position.x + this.size.x,
          this.position.y + this.size.y
        )
      );
    }

    //bottom right direction
    else if (this.speed.x > 0 && this.speed.y > 0) {
      //ball bottom right corner
      bricks.push(
        this.game.getBrickByPosition(
          this.position.x + this.size.x,
          this.position.y + this.size.y
        )
      );
      //ball top right corner
      bricks.push(
        this.game.getBrickByPosition(
          this.position.x + this.size.x,
          this.position.y
        )
      );
      //ball bottom left corner
      bricks.push(
        this.game.getBrickByPosition(
          this.position.x,
          this.position.y + this.size.y
        )
      );
    }

    //bottom left direction
    else if (this.speed.x < 0 && this.speed.y > 0) {
      //ball bottom left corner
      bricks.push(
        this.game.getBrickByPosition(
          this.position.x,
          this.position.y + this.size.y
        )
      );
      //ball top left corner
      bricks.push(
        this.game.getBrickByPosition(
          this.position.x,
          this.position.y
        )
      );
      //ball bottom right corner
      bricks.push(
        this.game.getBrickByPosition(
          this.position.x + this.size.x,
          this.position.y + this.size.y
        )
      );
    }

    return bricks;
  };
}
