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
  }

  nextMove(grid, winningPosition) {
    if (this.isCollitionOccurred) {
      return;
    }

    grid[this.xCoordinate][this.yCoordinate] = "_";

    //console.log(`before coordinate ${this.xCoordinate},${this.yCoordinate}`);

    const dx = winningPosition.x - this.xCoordinate;
    const dy = winningPosition.y - this.yCoordinate;

    if (Math.abs(dx) > Math.abs(dy)) {
      this.xCoordinate += Math.sign(dx);
    } else {
      this.yCoordinate += Math.sign(dy);
    }

    //console.log(`after coordinate ${this.xCoordinate},${this.yCoordinate}`);
    //console.log("____________");
    grid[this.xCoordinate][this.yCoordinate] = this.id;
  }
}
