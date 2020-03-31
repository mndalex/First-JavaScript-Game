import { GAME_STATE } from "./game_states.js";

export default class ImputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", event => {
      // console.log(event.keyCode)
      if (game.gameState === GAME_STATE.RUNNING) {
        switch (event.keyCode) {
          case 37:
            paddle.moveLeft();
            break;

          case 39:
            paddle.moveRight();
            break;

          case 32:
            game.togglePause();
        }
      } else if (game.gameState === GAME_STATE.PAUSED) {
        switch (event.keyCode) {
          case 32:
            game.togglePause();
        }
      }

      if(game.gameState === GAME_STATE.LEVEL_COMPLETED){
        switch(event.keyCode){
          case 32:
            game.loadNextLevel();
        }
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
