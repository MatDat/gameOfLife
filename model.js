export default class Model {
  model;
  constructor() {
    this.model = [[]];
  }

  //   updateModel(boardWidth, boardHeight) {
  //     const nextGen = [];

  //     for (let i = 0; i < boardWidth; i++) {
  //       nextGen[i] = [];
  //       for (let j = 0; j < boardHeight; j++) {
  //         console.log(i, j);
  //         nextGen[i][j] = this.applyRules(i, j);
  //       }
  //     }

  //     return nextGen;
  //   }

  applyRules(row, col) {
    const liveNeighbors = this.countLiveNeighbors(row, col);

    if (this.model[row][col] === 1) {
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

  countLiveNeighbors(row, col) {
    let count = 0;
    const boardWidth = this.model.length;
    const boardHeight = this.model[0].length;

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
            if (this.model[neighborRow][neighborCol] === 1) {
              count++;
            }
          }
        }
      }
    }

    return count;
  }

  randomizeModel() {
    for (let i = 0; i < boardWidth; i++) {
      model[i] = [];
      for (let j = 0; j < boardHeight; j++) {
        model[i][j] = Math.random() < 0.15 ? 1 : 0; // 15% chance for at være levende
      }
    }
  }

  updateView() {
    const boardContainer = document.querySelector("#boardContainer");

    for (let i = 0; i < boardWidth; i++) {
      for (let j = 0; j < boardHeight; j++) {
        const cell = document.querySelector(
          `[data-row="${j}"][data-col="${i}"]`
        );
        cell.classList.toggle("alive", model[i][j] === 1);
      }
    }
  }

  updateAndRender() {
    model = updateModel();
    updateView();
  }
}
