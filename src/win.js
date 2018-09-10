var winState = {

  create: function () {

    /**
     * Set the score labels
     */
    game.add.text(512, 88, 'Enemies: ' + game.totalEnemiesKilled + 
      ' * 5 = ' + game.totalEnemiesKilled * 5, game.style);
    game.add.text(512, 188, 'Parts: ' + game.totalEnemyPartsKilled + 
      ' * 10 = ' + game.totalEnemyPartsKilled * 10, game.style);
    game.add.text(512, 288, 'Level: ' + (game.level - 1) + 
      ' * 100 = ' + (game.level - 1) * 100, game.style);
    game.add.text(512, 388, 'Total: ' + game.totalScore, game.style);

    if (game.level > 5 && !game.bronzeProgress) {
      game.add.text(512, 338, 'Achieved: Bronze progress trophy', game.style);
      game.bronzeProgress = true;
      GJAPI.TrophyAchieve(98263);
    }
    if (game.level > 10 && !game.silverProgress) {
      game.add.text(512, 338, 'Achieved: Silver progress trophy', game.style);
      game.silverProgress = true;
      GJAPI.TrophyAchieve(98264);
    }
    if (game.level > 15 && !game.goldProgress) {
      game.add.text(512, 338, 'Achieved: Gold progress trophy', game.style);
      game.goldProgress = true;
      GJAPI.TrophyAchieve(98265);
    }
    if (game.level > 20 && !game.platinumProgress) {
      game.add.text(512, 338, 'Achieved: Platinum progress trophy', game.style);
      game.platinumProgress = true;
      GJAPI.TrophyAchieve(98266);
    }

    createContinueButton();
    createMuteButton();
    
  }

};