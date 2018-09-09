function createNewGameButton() {
  var newGameButton = game.add.text(512, 388, 'New Game', game.style);
  newGameButton.inputEnabled = true;
  newGameButton.events.onInputUp.add(function () {
    game.level = 1;
    game.totalEnemiesKilled = 0;
    game.totalEnemyPartsKilled = 0;
    game.totalScore = 0;
    if (GJAPI.bActive) {
      GJAPI.DataStoreSet(GJAPI.DATA_STORE_USER, 'level', 1);
      GJAPI.DataStoreSet(GJAPI.DATA_STORE_USER, 'totalEnemiesKilled', 0);
      GJAPI.DataStoreSet(GJAPI.DATA_STORE_USER, 'totalEnemyPartsKilled', 0);
    }
    game.state.start('play');
  });
}