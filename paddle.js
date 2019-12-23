//this is a class that holds attributes and properties of the
//paddle that the gamer will control.

export default class Paddle {
  constructor(game) {
    this.width = 150;
    this.height = 20;

    this.maxspeed = 5;
    this.speed = 0;
    this.position = {
      x: game.gamewidth / 2 - this.width / 2,
      y: game.gameheight - this.height - 10
    };
  }

  moveleft() {
    this.speed = -this.maxspeed;
  }
  moveright() {
    this.speed = this.maxspeed;
  }
  stop() {
    this.speed = 0;
  }
  draw(ctx) {
    ctx.fillStyle = "#0ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update(deltaTime) {
    this.position.x += this.speed;
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x > 650) {
      this.position.x = 650;
    }
  }
}
