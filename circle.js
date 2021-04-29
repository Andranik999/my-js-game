class Circle {
  constructor(left, top, color, speed, keysObj, game) {
    this.mushroom = null;
    this.game = game;

    this.score = 0;

    this.color = color;

    this.createCircle();

    this.speed = speed;
    this.keysObj = keysObj;
    this.intervalId = null;
  }

  createCircle = () => {
    this.element = document.createElement("div");
    this.element.classList.add("circle");
    let zone = document.getElementById("game-zone");
    zone.appendChild(this.element);
    this.element.style.backgroundColor = this.color;
    this.element.style.height = circleSize + "px";
    this.element.style.width = circleSize + "px";
    this.element.style.top =
      randomIntFromInterval(
        innerHeight - zone.offsetHeight,
        zone.offsetHeight - circleSize
      ) + "px";
    this.element.style.left =
      randomIntFromInterval(
        innerWidth - zone.offsetWidth,
        zone.offsetWidth - circleSize
      ) + "px";

    zone.appendChild(this.element);
    document.body.addEventListener("keydown", this.move);
  };

  destroyCircle() {
    this.element.remove();
    document.body.removeEventListener("keydown", this.move);
  }

  canEat = subject => {
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
      return true;
    }
  };

  afterEat = () => {
    this.element.style.height = this.element.offsetHeight + 10 + "px";
    this.element.style.width = this.element.offsetWidth + 10 + "px";
    this.score++;
    document.querySelector("#score1").innerHTML = this.game.ball1.score;
    document.querySelector("#score2").innerHTML = this.game.ball2.score;
    if (this.speed > 1.5) {
      this.speed -= 0.5;
    }

    this.game.balls.forEach((ball, i) => {
      let player1 = document.getElementById("firstPlayer").value;
      let player2 = document.getElementById("secondPlayer").value;
      if (ball.score === 10) {
        alert("Game over " + [player1, player2][i] + " wins");
        document.location.reload();
      }
    });
  };

  eatingConditions = () => {
    this.eatMushroom();
    this.eatAnother();
  };

  eatMushroom = () => {
    if (this.mushroom && this.canEat(this.mushroom)) {
      this.mushroom.eaten();
      this.afterEat();
    }
  };

  eatAnother = () => {
    let anotherBall = this.game.balls.find(ball => ball !== this);
    if (this.canEat(anotherBall) && this.score > anotherBall.score) {
      anotherBall.eaten();
      // anotherBall.score = 0;
      this.afterEat();
    }
  };

  eaten = () => {
    this.destroyCircle();
    setTimeout(() => {
      this.createCircle();
    }, 1000);
  };

  moveLeft = () => {
    this.intervalId = setInterval(() => {
      const left = this.element.offsetLeft;

      const canMoveLeft = left > 0;
      if (!canMoveLeft) {
        return;
      }

      this.eatingConditions();
      this.element.style.left =
        left - this.speed < 0 ? 0 : left - this.speed + "px";
    }, intervalTime);
  };

  moveRight = () => {
    this.intervalId = setInterval(() => {
      const left = this.element.offsetLeft;
      const canMoveRight = left < zone.offsetWidth - this.element.clientWidth;
      if (!canMoveRight) {
        return;
      }
      this.eatingConditions();

      console.log(zone.offsetWidth);
      this.element.style.left =
        left + this.speed > zone.offsetWidth - this.element.clientWidth
          ? zone.offsetWidth - this.element.clientWidth + "px"
          : left + this.speed + "px";
    }, intervalTime);
  };

  moveDown = () => {
    this.intervalId = setInterval(() => {
      const top = this.element.offsetTop;
      const canMoveDown = top < zone.offsetHeight - this.element.clientHeight;
      if (!canMoveDown) {
        return;
      }
      this.eatingConditions();
      this.element.style.top =
        top + this.speed > zone.offsetHeight - this.element.clientHeight
          ? zone.offsetHeight - this.element.clientHeight + "px"
          : top + this.speed + "px";
    }, intervalTime);
  };

  moveUp = () => {
    this.intervalId = setInterval(() => {
      const top = this.element.offsetTop;
      const canMoveUp = top > 0;
      if (!canMoveUp) {
        return;
      }
      this.eatingConditions();
      this.element.style.top =
        top - this.speed < 0 ? 0 : top - this.speed + "px";
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
