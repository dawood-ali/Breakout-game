import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import Brick from "/src/brick";
import { build_levels, level1, level2 } from "/src/level";
const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};
export default class Game {
  constructor(gamewidth, gameheight) {
    this.gamewidth = gamewidth;
    this.gameheight = gameheight;
    this.gamestate = GAMESTATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;
    this.levels = [level1, level2];
    this.currentlevel = 0;
    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU ||
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;
    this.bricks = build_levels(this, this.levels[this.currentlevel]);
    this.game.ball.reset();
    this.gameObjects = [this.ball, this.paddle];
    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gamestate = GAMESTATE.GAMEOVER;
    }
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;
    if (this.bricks.length === 0) {
      this.currentlevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }
    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.update(deltaTime)
    );
    this.bricks = this.bricks.filter(object => !object.markedfordelete);
  }
  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, 800, 600);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gamewidth / 2, this.gameheight / 2);
    }
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, 800, 600);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press space bar to begin",
        this.gamewidth / 2,
        this.gameheight / 2
      );
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, 800, 600);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAMEOVER", this.gamewidth / 2, this.gameheight / 2);
    }
  }
  togglepause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
