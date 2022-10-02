import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersect,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";
let lastRender = 0;
let gameOver = false;
const gameBoard = document.getElementById("game_board");
function main(currentTime) {
  if (gameOver) {
    if (confirm("You Lost. Press ok to restart. ")) {
      window.location = "/snake_game";
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondSinceLastRender = (currentTime - lastRender) / 1000;
  if (secondSinceLastRender < 1 / SNAKE_SPEED) return;

  // console.log("render");
  lastRender = currentTime;

  update();
  draw();
}
window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}
function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersect();
}
