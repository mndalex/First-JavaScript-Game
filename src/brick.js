export default class Brick {
  constructor(game, position) {
    this.img = document.getElementById("brick-img");

    this.game = game;

    this.position = position;

    this.size = game.brickSize;

    this.destroyed = false;
  }

  update(dt) {}

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }
}
