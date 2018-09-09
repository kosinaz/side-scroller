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
    game.add.text(512, 388, 'Total: ' + game.totalScore, game.style);

    createContinueButton();
    createMuteButton();
    
  }

};