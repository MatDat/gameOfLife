import View from "./view.js";
import Model from "./model.js";

export default class Controller {
  constructor() {
    this.boardWidth = 30;
    this.boardHeight = 30;
    this.model = new Model(this.boardWidth, this.boardHeight);
    this.view = new View(this);
    this.isPaused = true;
  }

  init() {
    document
      .getElementById("startButton")
      .addEventListener("click", () => this.startGame());
    document
      .getElementById("toggleButton")
      .addEventListener("click", () => this.toggleGame());
    this.view.boardSetup(this.boardWidth, this.boardHeight);
  }

  startGame() {
    this.isPaused = false;
    this.model.randomizeModel();
    this.view.updateView(this.model.model);
    this.tick();
  }

  tick() {
    if (!this.isPaused) {
      this.model.updateModel();
      this.view.updateView(this.model.model);
      setTimeout(() => this.tick(), 500);
    }
  }

  toggleGame() {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) this.tick();
  }
}

let controller = new Controller();
window.addEventListener("load", () => controller.init()); // Ændret til at kalde init
