export default class Game {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
  }

  static create(rows, cols) {
    Game.createGrid(rows, cols);
    Game.getWinCoordinate(rows - 1, cols - 1);

    return new Game(rows, cols);
  }

  addPlayer(player) {
    Game.placePlayer(this.rows - 1, this.cols - 1);
  }

  start() {}

  static createGrid(rows, cols) {
    let grid = [];

    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = 0;
      }
    }
  }

  static getWinCoordinate(rows, cols) {
    const [x, y] = Game.generateRandomNumbers(rows, cols);

    console.log(`Winning Coordinate: (${x}, ${y})`);
  }

  static placePlayer(rows, cols) {
    const [x, y] = Game.generateRandomNumbers(rows, cols);
    console.log(`Player placed at: (${x}, ${y})`);
  }

  static generateRandomNumbers(rows, cols) {
    let minX = rows / 2;
    let minY = cols / 2;

    if (minX === 0) {
      minX = 1;
    }

    if (minY === 0) {
      minY = 1;
    }

    const x = Math.floor(Math.random() * (rows - minX + 1) + minX);
    const y = Math.floor(Math.random() * (cols - minY + 1) + minY);

    return [x, y];
  }
}
