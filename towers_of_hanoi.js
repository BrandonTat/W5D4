const readline = require('readline');

const reader = readline.createInterface({
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
    reader.question("Select start tower (0, 1, 2): ", function(start) {
      reader.question("Select end tower: ", function(end) {
        cb(start, end)
          }
      });
    });
  }

  isValidMove(startTower, endTower) {
    if (this.stacks[startTower].length === 0) {
      return false;
    } else if (this.stacks[endTower].length === 0){
      return true;
    } else if (this.stacks[startTower][0] > this.stacks[endTower][0]){
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
    this.promptMove(function(){
      if (that.isValidMove(start, end)) {
        that.move(start, end)
        console.log(that.print());
      }
    });
  completionCallback();
  }
}

const game = new Game();
game.run(function () {
  console.log("Winner, winner, chicken dinner!");
  reader.close();
});

// const game = new Game([[], [1, 2, 3], []]);
// console.log(game.isWon());
//
// const game2 = new Game([[], [], [1, 2, 3]]);
// console.log(game2.isWon());
//
// const game3 = new Game([[], [1, 2], [3]]);
// console.log(game3.isWon());
