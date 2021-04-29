class Mushroom {
  constructor(top, left, color, game) {
    this.element = document.createElement("div");
    zone.appendChild(this.element);
    this.element.classList.add("mushroom");
    this.element.style.top = top + "px";
    this.element.style.left = left + "px";
    this.element.style.backgroundColor = color;

    this.game = game;

    this.onMushroomCreate();
  }

  onMushroomCreate = () => {
    this.timeoutId = setTimeout(() => {
      this.element.remove();
      setTimeout(() => this.game.createMushroom(), 1000);
    }, 7000);
  };

  eaten = () => {
    this.element.remove();
    this.game.createMushroom();

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  };
}
