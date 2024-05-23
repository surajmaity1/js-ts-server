let gameIdGenerator = 1;

export default class Game {
  constructor(rows, cols) {
    this.gameId = gameIdGenerator++;
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill("_"));
    this.players = [];
    this.step = 0;
    this.winningPosition = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    this.grid[this.winningPosition.x][this.winningPosition.y] = "X";
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
    //console.log(`\nGame[${this.gameId}]:\n`);
    //this.displayGrid();
    // console.log(
    //   `Game ${String(this.gameId).padStart(3, "0")} winning coordinate (${
    //     this.winningPosition.x
    //   },${this.winningPosition.y})\n`
    // );
    this.playNextStep();
  }

  playNextStep() {
    this.step++;

    console.log(
      `Game ${String(this.gameId).padStart(3, "0")} Turn ${String(
        this.step
      ).padStart(3, "0")}:\n`
    );

    // console.log(
    //   `Winning loc: [${this.winningPosition.x},${this.winningPosition.y}]`
    // );
    this.players.forEach((player) => {
      player.nextMove(this.grid, this.winningPosition);
    });

    if (this.checkWin()) {
      console.log(`Game ${String(this.gameId).padStart(3, "0")} Over!\n`);
      return;
    }

    if (this.checkCollision()) {
      console.log(`Game ${String(this.gameId).padStart(3, "0")} Over!\n`);
      return;
    }

    this.displayGrid();

    setTimeout(() => {
      this.playNextStep();
    }, "5000");
  }

  checkCollision() {
    const positions = new Map();
    let collisionDetected = false;
    let [firstPlayer, secondPlayer] = ["", ""];

    this.players.forEach((player) => {
      if (player.isCollitionOccurred) {
        return true;
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
          console.log(`Collision Detected!\n`);
          collisionDetected = true;
        }

        players.forEach((player) => {
          player.isCollitionOccurred = true;
          //this.grid[player.xCoordinate][player.yCoordinate] = "_"; // Remove player from grid
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
    let onlyOnePlayerWinCheck = 0;
    let winPlayerId = "";

    for (let player of this.players) {
      if (
        player.xCoordinate === this.winningPosition.x &&
        player.yCoordinate === this.winningPosition.y
      ) {
        onlyOnePlayerWinCheck++;
        winPlayerId = player.id;
      }
    }

    if (onlyOnePlayerWinCheck == 1) {
      this.displayGrid();
      console.log(
        `Player ${winPlayerId} wins the Game ${String(this.gameId).padStart(
          3,
          "0"
        )} at position (${this.winningPosition.x}, ${this.winningPosition.y})\n`
      );
      return true;
    }

    return false;
  }
}
