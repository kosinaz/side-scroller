var winState = {

  create: function () {

    /**
     * Set the score labels
     */
    game.add.text(512, 88, 'Enemies: ' + game.totalEnemiesKilled + 
      ' * 5 = ' + game.totalEnemiesKilled * 5, game.style);
    game.add.text(512, 188, 'Parts: ' + game.totalEnemyPartsKilled + 
      ' * 10 = ' + game.totalEnemyPartsKilled * 10, game.style);
    game.add.text(512, 288, 'Level: ' + game.level + 
      ' * 100 = ' + game.level * 100, game.style);
    game.totalScore += 100;
    game.add.text(512, 388, 'Total: ' + game.totalScore, game.style);

    /**
     * Set the Continue button
     */
    var startNextLevelButton = game.add.text(512, 488, 'Continue', game.style);
    startNextLevelButton.inputEnabled = true;
    startNextLevelButton.events.onInputUp.add(function () {
      game.level += 1;
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