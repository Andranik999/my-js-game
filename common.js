const intervalTime = 10;
const circleSize = 80;
const mushroomSize = 80;

const ball1Keys = {
  leftKey: "ArrowLeft",
  rightKey: "ArrowRight",
  upKey: "ArrowUp",
  downKey: "ArrowDown"
};
const ball2Keys = { leftKey: "a", rightKey: "d", upKey: "w", downKey: "s" };

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let zone = document.getElementById("game-zone");
