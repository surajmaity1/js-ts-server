let playerIdGenerator = 0;

export default class Player {
  constructor() {
    this.id = String.fromCharCode(65 + playerIdGenerator++);
    this.xCoordinate = 0;
    this.yCoordinate = 0;
    this.isCollitionOccurred = false;
  }

  static create() {
    return new Player();
  }

  placePlayer(rows, cols, grid) {
    let x, y;

    do {
      x = Math.floor(Math.random() * rows);
      y = Math.floor(Math.random() * cols);
    } while (grid[x][y] !== "_");

    this.xCoordinate = x;
    this.yCoordinate = y;

    // console.log(
    //   `Player [${this.id}] added at (${this.xCoordinate},${this.yCoordinate}).`
    // );
  }

  nextMove(grid, winningPosition) {
    if (this.isCollitionOccurred) {
      return;
    }
    if (
      this.xCoordinate === winningPosition.x &&
      this.yCoordinate === winningPosition.y
    ) {
      return;
    }

    if (grid[this.xCoordinate][this.yCoordinate] === this.id) {
      grid[this.xCoordinate][this.yCoordinate] = "_";
    }

    const dx = winningPosition.x - this.xCoordinate;
    const dy = winningPosition.y - this.yCoordinate;

    if (Math.abs(dx) > Math.abs(dy)) {
      this.xCoordinate += Math.sign(dx);
    } else {
      this.yCoordinate += Math.sign(dy);
    }

    //console.log("____________");
    grid[this.xCoordinate][this.yCoordinate] = this.id;
    // console.log(
    //   `In next move, player[${this.id}] moved at [${this.xCoordinate},${this.yCoordinate}]`
    // );
  }
}
