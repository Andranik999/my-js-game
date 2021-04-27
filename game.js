class Game {
  constructor() {
    this.ball1 = new Circle(100, 500, "blue", 5, ball1Keys, this);
    this.ball2 = new Circle(100, 200, "green", 5, ball2Keys, this);
    this.balls = [this.ball1, this.ball2];
  }

  createMushroom = () => {
    let mash = new Mushroom(
      randomIntFromInterval(0, innerHeight - mushroomSize),
      randomIntFromInterval(0, innerWidth - mushroomSize),
      "red",
      this
    );

    this.tellCircleAboutMushroom(mash);
  };

  start = () => {
    this.createMushroom();
  };

  tellCircleAboutMushroom(mushroom) {
    this.ball1.registerMushroom(mushroom);
    this.ball2.registerMushroom(mushroom);
  }
}

document.getElementById("game-btn").addEventListener("click", () => {
  if (
    document.getElementById("firstPlayer").value != "" &&
    document.getElementById("secondPlayer").value != ""
  ) {
    document.querySelector(".wrap-container").style.display = "none";
    document.querySelector(".players").style.display = "flex";
    document.querySelector(".player1").innerHTML = document.getElementById(
      "firstPlayer"
    ).value;
    document.querySelector(".player2").innerHTML = document.getElementById(
      "secondPlayer"
    ).value;
    let game = new Game();
    game.start();
  } else {
    alert("Please enter valid user names");
  }
});
