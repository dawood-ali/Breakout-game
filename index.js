import Game from "/src/game";
let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
//Note that everytime we draw a new object
//it will have the same fill style as specified.

//note that whatever was on the canvas will stay there unless
//you tell the canvas to clear itself repeatedly.
//this is important if you want to create a moving game.

//now we will create a class to handle the player paddle.

//once we have done that, we need to establish a game loop, this will deal with
//updating all chunks and refreshes the game based on the flow of the game.

//the best way to do this to accomodate for all computer speeds, is to use functions
let lastTime = 0;

function gameloop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameloop);
}
requestAnimationFrame(gameloop);
