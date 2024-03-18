const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Game Started ...");
createGrid();

let noOfPlayers = 4;

playerAddition(noOfPlayers);
playerAddition(noOfPlayers);

function createGrid() {
  rows = Math.floor(Math.random() * 10 + 1);
  cols = Math.floor(Math.random() * 10 + 1);

  let grid = [rows];

  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }

  console.log(`${rows} X ${cols} Grid`);

  getWinCoordinate(rows, cols);
}

function getWinCoordinate(rows, cols) {
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

  console.log(`Winning Coordinate: (${x}, ${y})`);
}

function playerAddition(noOfPlayers) {
  console.log("");

  let msg = noOfPlayers === 0 ? "Enter the no. of players: " : "Add player: ";

  rl.question(msg, function (players) {
    noOfPlayers += players;
    rl.close();
  });
}
