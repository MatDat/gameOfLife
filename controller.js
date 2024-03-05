import View from "./view.js";
import Model from "./model.js";
("use strict");

export default class Controller {
  boardWidth = 30;
  boardHeight = 30;

  model;
  view;
  constructor() {
    this.model = new Model();
    this.view = new View(this);
    console.log("Juupiiii");
  }

  start() {
    console.log("Javascript is running!");
    this.view.boardSetup(this.boardWidth, this.boardHeight);
    this.view.makeBoardClick();
    this.tick();
  }

  tick() {
    // UPDATER LIST, incl view
    setTimeout(this.tick, 500);
  }
}

let controller = new Controller();
window.addEventListener("load", () => controller.start());
