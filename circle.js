class Circle {
  constructor(left, top, color, speed, keysObj, game) {
    this.mushroom = null;
    this.game = game;
    this.element = document.createElement("div");
    document.body.appendChild(this.element);
    this.element.classList.add("circle");
    this.element.style.top = top + "px";
    this.element.style.left = left + "px";
    this.element.style.backgroundColor = color;
    this.speed = speed;
    this.keysObj = keysObj;
    this.intervalId = null;
    this.element.style.height = circleSize + "px";
    this.element.style.width = circleSize + "px";
    document.body.addEventListener("keydown", this.move);
  }

  shouldEat = (subject, methodName) => {
    if (!this.element || !subject || !subject.element) {
      return false;
    }

    const ballTop = this.element.offsetTop;
    const ballLeft = this.element.offsetLeft;
    const mushTop = subject.element.offsetTop;
    const mushLeft = subject.element.offsetLeft;
    const ballWidth = this.element.offsetWidth;
    const ballHeight = this.element.offsetHeight;
    const mushWidth = subject.element.offsetWidth;
    const mushHeight = subject.element.offsetHeight;

    if (
      mushLeft + mushWidth >= ballLeft &&
      mushLeft <= ballLeft + ballWidth &&
      mushTop + mushHeight >= ballTop &&
      mushTop <= ballTop + ballHeight
    ) {
      this.game[methodName](subject);

      this.element.style.height = ballHeight + 10 + "px";
      this.element.style.width = ballWidth + 10 + "px";

      if (this.speed > 1.5) {
        this.speed -= 0.5;
      }

      return true;
    }
  };

  moveLeft = () => {
    this.intervalId = setInterval(() => {
      const left = this.element.offsetLeft;

      const canMoveLeft = left > 0;
      if (!canMoveLeft) {
        return;
      }

      this.element.style.left = left - this.speed + "px";
      this.shouldEat(this.mushroom, "eatenMushroom");
    }, intervalTime);
  };

  moveRight = () => {
    this.intervalId = setInterval(() => {
      const left = this.element.offsetLeft;

      const canMoveRight = left < window.innerWidth - this.element.clientWidth;
      if (!canMoveRight) {
        return;
      }

      this.element.style.left = left + this.speed + "px";
      this.shouldEat(this.mushroom, "eatenMushroom");
    }, intervalTime);
  };

  moveDown = () => {
    this.intervalId = setInterval(() => {
      const top = this.element.offsetTop;

      const canMoveDown = top < window.innerHeight - this.element.clientHeight;
      if (!canMoveDown) {
        return;
      }

      this.element.style.top = top + this.speed + "px";
      this.shouldEat(this.mushroom, "eatenMushroom");
    }, intervalTime);
  };

  moveUp = () => {
    this.intervalId = setInterval(() => {
      const top = this.element.offsetTop;

      const canMoveUp = top > 0;
      if (!canMoveUp) {
        return;
      }

      this.element.style.top = top - this.speed + "px";
      this.shouldEat(this.mushroom, "eatenMushroom");
    }, intervalTime);
  };

  move = () => {
    const { leftKey, rightKey, downKey, upKey } = this.keysObj;

    switch (event.key) {
      case leftKey:
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
        this.moveLeft();
        break;
      case rightKey:
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
        this.moveRight();
        break;
      case downKey:
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
        this.moveDown();
        break;
      case upKey:
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
        this.moveUp();
        break;
      default:
        return;
    }
  };

  registerMushroom(mushroom) {
    this.mushroom = mushroom;
  }
}
