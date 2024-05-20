export default class Game {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill("_"));
    this.players = [];
    this.step = 0;
    this.winningPosition = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    this.grid[this.winningPosition.x][this.winningPosition.y] = "$";
  }

  static create(rows, cols) {
    return new Game(rows, cols);
  }

  addPlayer(player) {
    player.placePlayer(this.rows, this.cols, this.grid);
    this.players.push(player);
    this.grid[player.xCoordinate][player.yCoordinate] = player.id;
  }

  start() {
    this.interval = setInterval(() => this.nextStep(), 1000);
  }

  nextStep() {
    this.step++;

    console.log(`Game Step ${this.step}:\n`);
    this.players.forEach((player) =>
      player.nextMove(this.grid, this.winningPosition, this.rows, this.cols)
    );
    if (this.checkCollision()) {
      clearInterval(this.interval);
    }

    this.displayGrid();

    if (this.checkWin()) {
      clearInterval(this.interval);
    }
  }

  checkCollision() {
    const positions = new Map();

    this.players.forEach((player) => {
      const position = `${player.xCoordinate},${player.yCoordinate}`;
      if (!positions.has(position)) {
        positions.set(position, []);
      }
      positions.get(position).push(player);
    });

    positions.forEach((players) => {
      if (players.length > 1) {
        players.forEach((player) => {
          this.grid[player.xCoordinate][player.yCoordinate] = "#";
          console.log("--- COLLISION OCCURRED ---");
          clearInterval(this.interval);
          return true;
        });
      }
    });
    return false;
  }

  displayGrid() {
    this.grid.forEach((row) => console.log(row.join(" ")));
    console.log("\n");
  }

  checkWin() {
    for (let player of this.players) {
      if (
        player.xCoordinate === this.winningPosition.x &&
        player.yCoordinate === this.winningPosition.y
      ) {
        console.log(`Player ${player.id} wins the Game`);
        return true;
      }
      return false;
    }
  }
}
