export default class InputHandler {
  constructor(paddle, game) {
    this.game = game;
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          paddle.moveleft();

          break;

        case 39:
          paddle.moveright();

          break;
      }
    });
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (paddle.speed < 0) {
            paddle.stop();
          }
          break;

        case 39:
          if (paddle.speed > 0) {
            paddle.stop();
          }
          break;
        case 27:
          this.game.togglepause();
          break;
        case 32:
          this.game.start();
          break;
      }
    });
  }
}
