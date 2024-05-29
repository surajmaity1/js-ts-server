export default class Game {
  static gameId = 1;
  constructor(rows, cols) {
    this.id = Game.gameId++;
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill("_"));
    this.players = [];
    this.step = 0;
    this.xPosition = [0, 0];
    this.xPosition[0] = Math.floor(Math.random() * rows);
    this.xPosition[1] = Math.floor(Math.random() * cols);
    this.grid[this.xPosition[0]][this.xPosition[1]] = "X";
  }

  static create(rows, cols) {
    return new Game(rows, cols);
  }

  addPlayer(player) {
    // if grid's rows and col's length less than 2, don't add players
    if (this.rows < 2 && this.cols < 2) {
      return;
    }

    // if game is full, don't add players
    if (this.players.length >= this.rows + this.cols - 1) {
      return;
    }

    let x, y;

    do {
      x = Math.floor(Math.random() * this.rows);
      y = Math.floor(Math.random() * this.cols);
    } while (this.grid[x][y] !== "_");

    player.setPosition(x, y);
    this.players.push(player);
    this.grid[player.x][player.y] = player.name;
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
      `Game ${String(this.id).padStart(3, "0")} Turn ${String(
        this.step
      ).padStart(3, "0")}:\n`
    );

    // console.log(
    //   `Winning loc: [${this.xPosition[0]},${this.xPosition[1]}]`
    // );
    this.players.forEach((player) => {
      if (player.isCollitionOccurred) {
        return;
      }

      if (player.x === this.xPosition[0] && player.y === this.xPosition[1]) {
        return;
      }
      if (this.grid[player.x][player.y] === player.name) {
        this.grid[player.x][player.y] = "_";
      }

      const [nextX, nextY] = player.nextPosition(
        this.xPosition,
        this.rows,
        this.cols
      );
      player.setPosition(nextX, nextY);
      this.grid[player.x][player.y] = player.name;
    });

    if (this.checkforWin()) {
      console.log(`Game ${String(this.id).padStart(3, "0")} Over!\n`);
      return;
    }

    if (this.checkforCollision()) {
      console.log(`Game ${String(this.id).padStart(3, "0")} Over!\n`);
      return;
    }

    this.displayGrid();

    setTimeout(() => {
      this.playNextStep();
    }, "5000");
  }

  checkforCollision() {
    const positions = new Map();
    let collisionDetected = false;
    let [firstPlayer, secondPlayer] = ["", ""];

    this.players.forEach((player) => {
      if (player.isCollitionOccurred) {
        return true;
      }

      const position = `${player.x},${player.y}`;

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

  checkforWin() {
    let onlyOnePlayerWinCheck = 0;
    let winPlayerId = "";

    for (let player of this.players) {
      if (player.x === this.xPosition[0] && player.y === this.xPosition[1]) {
        onlyOnePlayerWinCheck++;
        winPlayerId = player.name;
      }
    }

    if (onlyOnePlayerWinCheck == 1) {
      this.displayGrid();
      console.log(
        `Player ${winPlayerId} wins the Game ${String(this.id).padStart(
          3,
          "0"
        )} at position (${this.xPosition[0]}, ${this.xPosition[1]})\n`
      );
      return true;
    }

    return false;
  }
}
