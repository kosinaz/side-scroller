function createNewGameButton() {
  var newGameButton = game.add.text(512, 388, 'New Game', game.style);
  newGameButton.inputEnabled = true;
  newGameButton.events.onInputUp.add(function () {
    game.totalEnemiesKilled = 0;
    game.totalEnemyPartsKilled = 0;
    game.level = 1;
    game.totalScore = 0;
    game.state.start('play');
  });
}