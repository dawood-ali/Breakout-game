import { detectCollision } from "/src/detectcollision";
export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");
    this.speed = {
      x: 4,
      y: -3
    };
    this.position = {
      x: 10,
      y: 400
    };
    this.gameWIDTH = game.gamewidth;
    this.gameHEIGHT = game.gameheight;
    this.game = game;
  }
  reset() {
    this.position.x = 10;
    this.position.y = 400;
    this.speed.x = 4;
    this.speed.y = -3;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, 16, 16);
  }
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    if (this.position.x < 0 || this.position.x + 16 > 800) {
      this.speed.x = -this.speed.x;
    }
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    if (this.position.y + 16 > 600) {
      this.game.lives--;
      this.reset();
    }

    if (detectCollision(this, this.game.paddle) === true) {
      this.speed.y = -this.speed.y;
    }
  }
}
