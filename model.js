export default class Model {
  constructor(boardWidth = 30, boardHeight = 30) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.model = this.initializeModel();
  }

  initializeModel() {
    let model = [];
    for (let i = 0; i < this.boardWidth; i++) {
      model[i] = [];
      for (let j = 0; j < this.boardHeight; j++) {
        model[i][j] = 0;
      }
    }
    return model;
  }

  randomizeModel() {
    for (let i = 0; i < this.boardWidth; i++) {
      for (let j = 0; j < this.boardHeight; j++) {
        if (Math.random() < 0.15) {
          this.model[i][j] = 1;
        } else {
          this.model[i][j] = 0;
        }
      }
    }
  }

  applyRules(row, col) {
    const liveNeighbors = this.countLiveNeighbors(row, col);

    // Hvis cellen er levende
    if (this.model[row][col] === 1) {
      if (liveNeighbors === 2 || liveNeighbors === 3) {
        return 1; // Celle forbliver levende
      } else {
        return 0; // Celle bliver død
      }
    } else {
      // Hvis cellen er død
      if (liveNeighbors === 3) {
        return 1; // Celle bliver levende
      } else {
        return 0; // Celle forbliver død
      }
    }
  }

  countLiveNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const x = row + i,
          y = col + j;
        if (x >= 0 && x < this.boardWidth && y >= 0 && y < this.boardHeight) {
          count += this.model[x][y];
        }
      }
    }
    return count;
  }

  updateModel() {
    let nextGen = this.initializeModel();
    for (let i = 0; i < this.boardWidth; i++) {
      for (let j = 0; j < this.boardHeight; j++) {
        nextGen[i][j] = this.applyRules(i, j);
      }
    }
    this.model = nextGen;
  }

  toggleCell(row, col) {
    this.model[row][col] = this.model[row][col] === 1 ? 0 : 1;
  }

  readFromCell(row, col) {
    return this.model[row][col];
  }
}
