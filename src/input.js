export default class ImputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", event => {
      // console.log(event.keyCode)
      switch (event.keyCode) {
        case 37:
          paddle.moveLeft();
          break;

        case 39:
          paddle.moveRight();
          break;

        // case 40:
        //   game.ball.speed.x /= 4;
        //   game.ball.speed.y /= 4;
        //   break;

        // case 38:
        //   game.ball.speed.x *= 4;
        //   game.ball.speed.y *= 4;
        //   break;

        case 32:
          game.togglePause();
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          paddle.stop();
          break;

        case 39:
          paddle.stop();
          break;
      }
    });
  }
}
