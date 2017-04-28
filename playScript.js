const Game = require('./towers_of_hanoi.js');

const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function playGame(){
  const game = new Game([[1], [2,3], []]);
  game.run(function () {
    console.log("Winner, winner, chicken dinner!");
    reader.question("Play game?", function(answer){
      if (answer === 'yes') {
        playGame();
      } else {
        reader.close();
      }
    });
  });
}

playGame();
