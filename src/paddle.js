export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.size = { x: 150, y: 20 };

    this.maxSpeed = 500;
    this.speed = 0;

    this.position = {
      x: game.gameWidth / 2 - this.size.x / 2,
      y: game.gameHeight - this.size.y - 10
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#0ff";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );
  }

  update(dt) {
    this.position.x += this.speed * dt;

    if (this.position.x < 1) this.position.x = 1;

    if (this.position.x + this.size.x > this.gameWidth)
      this.position.x = this.gameWidth - this.size.x;
  }
}
