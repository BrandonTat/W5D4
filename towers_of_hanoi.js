const readline = require('readline');

const reader1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Game {
  constructor(arr = [[1, 2, 3], [], []] ) {
    this.stacks = arr;
  }

  promptMove(cb) {
    console.log(this.stacks);
    let that = this;
    reader1.question("Select start tower (0, 1, 2): ", function(start) {
      reader1.question("Select end tower: ", function(end) {
        cb(start, end);
      });
    });
  }

  isValidMove(startTower, endTower) {
    if (this.stacks[startTower].length === 0) {
      return false;
    } else if (this.stacks[endTower].length === 0){
      return true;
    } else if (this.stacks[startTower][0] < this.stacks[endTower][0]){
      return true;
    } else {
      return false;
    }
  }

  move(startTower, endTower){
    let disc = this.stacks[startTower].shift();
    this.stacks[endTower].unshift(disc);
  }

  print() {
    return JSON.stringify(this.stacks);
  }

  isWon() {
    if (this.stacks[1].length === 3 || this.stacks[2].length === 3) {
      return true;
    } else {
      return false;
    }
  }

  run(completionCallback) {
    this.promptMove( (start, end) => {
      if (this.isValidMove(start, end)) {
        this.move(start, end);
        console.log(this.print());
      } else {
        console.log("Invalid move.");
      }
      if (!this.isWon()){
        this.run(completionCallback);
      } else {
        completionCallback();
      }
    });
  }
}


module.exports = Game;
