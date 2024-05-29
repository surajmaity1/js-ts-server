let playerIdGenerator = 0;

export default class Player {
  static nextPlayerName = "A";

  constructor() {
    this.name = Player.generateNextPlayerName();
    this.x = 0;
    this.y = 0;
    this.isCollitionOccurred = false;
  }

  static create() {
    return new Player();
  }
  static generateNextPlayerName() {
    let name = Player.nextPlayerName;
    Player.nextPlayerName = Player.incrementName(name);
    return name;
  }

  static incrementName(name) {
    let carry = true;
    let nameArray = name.split("").reverse();

    for (let i = 0; i < nameArray.length; i++) {
      if (carry) {
        if (nameArray[i] === "Z") {
          nameArray[i] = "A";
        } else {
          nameArray[i] = String.fromCharCode(nameArray[i].charCodeAt(0) + 1);
          carry = false;
        }
      }
    }

    if (carry) {
      nameArray.push("A");
    }

    return nameArray.reverse().join("");
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;

    // console.log(`Player [${this.name}] added at (${this.x},${this.y}).`);
  }

  nextPosition(winningPosition, rows, cols) {
    const [targetX, targetY] = winningPosition;
    let nextX = this.x;
    let nextY = this.y;

    // Move towards the target if not already at the target position
    if (this.x < targetX) {
      nextX = this.x + 1;
    } else if (this.x > targetX) {
      nextX = this.x - 1;
    }

    if (this.y < targetY) {
      nextY = this.y + 1;
    } else if (this.y > targetY) {
      nextY = this.y - 1;
    }

    // Ensure the new position does not go out of bounds
    nextX = Math.max(0, Math.min(nextX, rows - 1));
    nextY = Math.max(0, Math.min(nextY, cols - 1));

    // console.log("____________");
    return [nextX, nextY];
    // console.log(
    //   `In next move, player[${this.id}] moved at [${this.xCoordinate},${this.yCoordinate}]`
    // );
  }
}
