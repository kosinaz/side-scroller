var menuState = {

  create: function () {

    /**
     * Set the Start New Game button
     */
    var startGameButton = game.add.text(512, 288, 'Start Game', game.style);
    startGameButton.inputEnabled = true;
    startGameButton.events.onInputUp.add(function () {
      game.totalEnemiesKilled = 0;
      game.totalEnemyPartsKilled = 0;
      game.level = 1;
      game.totalScore = 0;
      game.state.start('play');
    });

    /**
     * Set the mute button.
     */
    game.muteButton = game.add.text(904, 50, '🕪', game.style);
    game.muteButton.text = game.music.mute ? '🕨' : '🕪';
    game.muteButton.inputEnabled = true;
    game.muteButton.events.onInputUp.add(function () {
      game.music.mute = !game.music.mute;
      game.muteButton.text = game.music.mute ? '🕨' : '🕪';
    });
    
  }

};