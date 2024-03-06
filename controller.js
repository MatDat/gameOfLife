import View from "./view.js";
import Model from "./model.js";

export default class Controller {
  constructor() {
    this.boardWidth = 30;
    this.boardHeight = 30;
    this.model = new Model(this.boardHeight, this.boardWidth);
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
    document
      .getElementById("killButton")
      .addEventListener("click", () => this.restartGame());
    this.view.boardSetup(this.boardWidth, this.boardHeight);
  }

  startGame() {
    this.isPaused = false;
    this.model.randomizeModel();
    this.view.updateView(this.model.model);
    this.tick();
    console.log("Start button clicked!");
  }

  restartGame() {
    window.location.reload();
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
    console.log("Pause clicked!");
  }
}

let controller = new Controller();
window.addEventListener("load", () => controller.init());
