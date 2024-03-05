export default class View {
  controller;

  constructor(controller) {
    this.controller = controller;
  }

  boardSetup(boardWidth, boardHeight) {
    let boardContainer = document.querySelector("#boardContainer");
    boardContainer.style.setProperty("--boardWidth", boardWidth);

    for (let i = 0; i < boardWidth; i++) {
      let row = document.createElement("div");
      row.classList.add("row");

      for (let j = 0; j < boardHeight; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");

        cell.setAttribute("data-row", j);
        cell.setAttribute("data-col", i);

        row.appendChild(cell);
      }
      boardContainer.appendChild(row);
    }
  }

  makeBoardClick() {
    document
      .querySelector("#boardContainer")
      .addEventListener("click", this.boardClicked.bind(this));
  }

  boardClicked(event) {
    const cell = event.target;

    const rowIndex = parseInt(cell.getAttribute("data-row"));
    const colIndex = parseInt(cell.getAttribute("data-col"));

    console.log(`Cell clicked: (row: ${rowIndex}, col: ${colIndex})`);
    console.log(
      `Cell value: ` + this.controller.model.readFromCell(rowIndex, colIndex)
    );
  }

  updateView(boardState) {
    const boardContainer = document.querySelector("#boardContainer");

    for (let i = 0; i < boardState.length; i++) {
      for (let j = 0; j < boardState[0].length; j++) {
        const cell = document.querySelector(
          `[data-row="${j}"][data-col="${i}"]`
        );
        cell.classList.toggle("alive", boardState[i][j] === 1);
      }
    }
  }
}
