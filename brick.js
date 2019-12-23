import { detectCollision } from "/src/detectcollision";
export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");

    this.position = position;

    this.game = game;

    this.width = 50;
    this.height = 20;
    this.markedfordelete = false;
  }
  update() {
    if (detectCollision(this.game.ball, this) === true) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedfordelete = true;
    }
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
