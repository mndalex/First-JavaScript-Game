import { GAME_STATES } from "./game_states.js";

export default class ImputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", event => {
      // console.log(event.keyCode)
      if (game.gameState === GAME_STATES.RUNNING) {
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
      } else if (game.gameState === GAME_STATES.PAUSED) {
        switch (event.keyCode) {
          case 32:
            game.togglePause();
        }
      }

      if(game.gameState === GAME_STATES.LEVEL_COMPLETED){
        switch(event.keyCode){
          case 32:
            game.loadNextLevel();
        }
      }

      if(game.gameState === GAME_STATES.GAME_OVER){
        switch(event.keyCode){
          case 32:
            game.restart();
        }
      }

      if(game.gameState === GAME_STATES.ALL_LEVEL_COMPLETED){
        switch(event.keyCode){
          case 32:
            game.restart();
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
