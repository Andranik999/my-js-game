const intervalTime = 10;
const circleSize = 80;

const getRandomInt = arg => {
  return Math.round(Math.random() * arg);
};

const ball1Keys = {
  leftKey: "ArrowLeft",
  rightKey: "ArrowRight",
  upKey: "ArrowUp",
  downKey: "ArrowDown"
};
const ball2Keys = { leftKey: "a", rightKey: "d", upKey: "w", downKey: "s" };
