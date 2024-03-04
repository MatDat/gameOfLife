"use strict";

const boardWidth = 30;
const boardHeight = 30;

window.addEventListener("load", start);

function start() {
  console.log("Javascript is running!");
  boardSetup();
  makeBoardClick();
}

// ------------ VIEW ------------

function boardSetup() {
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

function makeBoardClick() {
  document
    .querySelector("#boardContainer")
    .addEventListener("click", boardClicked);
}

function boardClicked(event) {
  const cell = event.target;

  const rowIndex = parseInt(cell.getAttribute("data-row"));
  const colIndex = parseInt(cell.getAttribute("data-col"));

  console.log(`Cell clicked: (row: ${rowIndex}, col: ${colIndex})`);
  console.log(`Cell value: ` + readFromCell(rowIndex, colIndex));
}

// ------------ MODEL ------------

function updateModel() {
  const nextGen = [];

  for (let i = 0; i < boardWidth; i++) {
    nextGen[i] = [];
    for (let j = 0; j < boardHeight; j++) {
      nextGen[i][j] = applyRules(i, j);
    }
  }

  return nextGen;
}

function applyRules(row, col) {
  const liveNeighbors = countLiveNeighbors(row, col);

  if (model[row][col] === 1) {
    if (liveNeighbors < 2 || liveNeighbors > 3) {
      return 0; // dør af underbefolkning eller overbefolkning
    } else {
      return 1; // overlever
    }
  } else {
    if (liveNeighbors === 3) {
      return 1; // genoplives af netop 3 levende naboer
    } else {
      return 0; // forbliver død
    }
  }
}

function countLiveNeighbors(row, col) {
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0)) {
        const neighborRow = row + i;
        const neighborCol = col + j;

        if (
          neighborRow >= 0 &&
          neighborRow < boardWidth &&
          neighborCol >= 0 &&
          neighborCol < boardHeight
        ) {
          if (model[neighborRow][neighborCol] === 1) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

function randomizeModel() {
  for (let i = 0; i < boardWidth; i++) {
    model[i] = [];
    for (let j = 0; j < boardHeight; j++) {
      model[i][j] = Math.random() < 0.15 ? 1 : 0; // 15% chance for at være levende
    }
  }
}

let model = [];
randomizeModel();

function updateView() {
  const boardContainer = document.querySelector("#boardContainer");

  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
      const cell = document.querySelector(`[data-row="${j}"][data-col="${i}"]`);
      cell.classList.toggle("alive", model[i][j] === 1);
    }
  }
}

function updateAndRender() {
  model = updateModel();
  updateView();
}

// Opdater og render hvert sekund
setInterval(updateAndRender, 1000);
