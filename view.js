export default class View {
  constructor(controller) {
    this.controller = controller;
  }

  boardSetup(boardWidth, boardHeight) {
    let boardContainer = document.querySelector("#boardContainer");
    boardContainer.innerHTML = "";
    // Overfører variablerne til CSS
    boardContainer.style.setProperty("--boardWidth", boardWidth);
    boardContainer.style.setProperty("--boardHeight", boardHeight);

    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-row", i);
        cell.setAttribute("data-col", j);
        boardContainer.appendChild(cell);
      }
    }
  }

  updateView(model) {
    for (let i = 0; i < model.length; i++) {
      for (let j = 0; j < model[i].length; j++) {
        const cell = document.querySelector(
          `[data-row="${i}"][data-col="${j}"]`
        );
        if (model[i][j] === 1) {
          cell.classList.add("alive");
        } else {
          cell.classList.remove("alive");
        }
      }
    }
  }
}
