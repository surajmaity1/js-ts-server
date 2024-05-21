let gameIdGenerator = 1;

export default class Game {
  constructor(rows, cols) {
    this.id = gameIdGenerator++;
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
    this.interval = setInterval(() => this.playNextStep(), 1000);
  }

  playNextStep() {
    this.step++;

    console.log(`Game[${this.id}] Step ${this.step}:\n`);

    this.players.forEach((player) =>
      player.nextMove(this.grid, this.winningPosition)
    );

    if (this.checkCollision()) {
      clearInterval(this.interval);
      return;
    }

    this.displayGrid();

    if (this.checkWin()) {
      clearInterval(this.interval);
    }
  }

  checkCollision() {
    const positions = new Map();
    let collisionDetected = false;

    this.players.forEach((player) => {
      if (player.isCollitionOccurred) {
        return;
      }

      const position = `${player.xCoordinate},${player.yCoordinate}`;

      if (!positions.has(position)) {
        positions.set(position, []);
      }

      positions.get(position).push(player);
    });

    positions.forEach((players) => {
      if (players.length > 1) {
        if (!collisionDetected) {
          console.log(`#--- COLLISION OCCURRED AT GAME[${this.id}]---#\n`);
          collisionDetected = true;
        }

        players.forEach((player) => {
          player.isCollitionOccurred = true;
          this.grid[player.xCoordinate][player.yCoordinate] = "_"; // Remove player from grid
        });
      }
    });

    return collisionDetected;
  }

  displayGrid() {
    //this.grid.forEach((row) => console.log(row.join(" ")));
    //console.log("\n");
    for (let i = 0; i < this.rows; i++) {
      let rowString = "";
      for (let j = 0; j < this.cols; j++) {
        rowString += this.grid[i][j] + " ";
      }
      console.log(rowString.trim());
    }
    console.log("\n");
  }

  checkWin() {
    for (let player of this.players) {
      if (
        player.xCoordinate === this.winningPosition.x &&
        player.yCoordinate === this.winningPosition.y
      ) {
        console.log(
          `Player ${player.id} wins the Game[${this.id}] at position (${this.winningPosition.x}, ${this.winningPosition.y})\n`
        );
        return true;
      }
      return false;
    }
  }
}
