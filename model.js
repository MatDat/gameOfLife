export default class Model {
  constructor(boardHeight, boardWidth) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.model = this.initializeModel();
  }

  initializeModel() {
    let model = [];
    for (let i = 0; i < this.boardHeight; i++) {
      model[i] = [];
      for (let j = 0; j < this.boardWidth; j++) {
        model[i][j] = 0;
      }
    }
    return model;
  }

  randomizeModel() {
    for (let i = 0; i < this.boardHeight; i++) {
      for (let j = 0; j < this.boardWidth; j++) {
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
        return 1; // Celle lever videre
      } else {
        return 0; // Celle dør
      }
    } else {
      // Hvis cellen er død
      if (liveNeighbors === 3) {
        return 1; // Celle lever videre
      } else {
        return 0; // Celle dør
      }
    }
  }

  countLiveNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        // Kigger på den potentielle nabo
        const neighborRow = row + i;
        const neighborCol = col + j;
        // Tjekker om naboen er indenfor brættets grænser
        const isWithinBoard =
          neighborRow >= 0 &&
          neighborRow < this.boardHeight &&
          neighborCol >= 0 &&
          neighborCol < this.boardWidth;
        // Tæller naboen, hvis den er indenfor grænserne og levende
        if (isWithinBoard && this.model[neighborRow][neighborCol] === 1) {
          count++;
        }
      }
    }
    return count;
  }

  updateModel() {
    // Laver et nyt tomt spillebræt
    let nextGen = this.initializeModel();
    for (let i = 0; i < this.boardHeight; i++) {
      for (let j = 0; j < this.boardWidth; j++) {
        // Tjekker og bestemmer hver enkel celle state
        nextGen[i][j] = this.applyRules(i, j);
      }
    }
    // Opdaterer model med den nye gamestate
    this.model = nextGen;
  }

  readFromCell(row, col) {
    return this.model[row][col];
  }
}
