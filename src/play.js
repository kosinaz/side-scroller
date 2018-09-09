var playState = {

  create: function () {

    createPhysics();
    createPlayer();
    createEnemies();
    createBullets();    
    createTimer();
    createLevelLabel();
    createScoreLabel();
    createMuteButton();

  },

  update: function () {

    updatePlayer();
    updateBullets();
    updateTimer();
    updateScoreLabel();

  }
}