class Mushroom {
  constructor(top, left, color) {
    this.element = document.createElement("div");
    document.body.appendChild(this.element);
    this.element.classList.add("mushroom");
    this.element.style.top = top + "px";
    this.element.style.left = left + "px";
    this.element.style.backgroundColor = color;
  }
}
