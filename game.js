class Game {
  constructor() {
    this.ball1 = new Circle(0, 0, "blue", 5, ball1Keys, this);
    this.ball2 = new Circle(0, 200, "orange", 5, ball2Keys, this);
  }

  eatenMushroom = mushroom => {
    if (this.mushroomsTimeoutId) {
      clearTimeout(this.mushroomsTimeoutId);
    }

    if (this.mushroomsTimeoutId2) {
      clearTimeout(this.mushroomsTimeoutId2);
    }
    mushroom.element.remove();
    this.start();
  };

  start = () => {
    this.mushroomsTimeoutId = setTimeout(() => {
      let mash = new Mushroom(
        getRandomInt(innerHeight),
        getRandomInt(innerWidth),
        "yellow"
      );
      this.tellCircleAboutMushroom(mash);

      this.mushroomsTimeoutId2 = setTimeout(() => {
        this.tellCircleAboutMushroom(null);
        mash.element.remove();
        this.start();
      }, 7000);
    }, 1000);
  };

  tellCircleAboutMushroom(mushroom) {
    this.ball1.registerMushroom(mushroom);
    this.ball2.registerMushroom(mushroom);
  }
}

let game = new Game();
game.start();
