function loadPlayer(callback) {
  game.level = 1;
  game.totalEnemiesKilled = 0;
  game.totalEnemyPartsKilled = 0;
  game.totalScore = 0;
  if (!GJAPI.bActive) {
    callback();
    return;
  }
  GJAPI.TrophyFetch(GJAPI.TROPHY_ONLY_ACHIEVED, function (pResponse) {
    var i;
    if (!pResponse.trophies) {
      return;
    }
    for (i = 0; i < pResponse.trophies.length; ++i) {
      if (pResponse.trophies[i].id === '98263') {
        game.bronzeProgress = true;
      }
      if (pResponse.trophies[i].id === '98264') {
        game.silverProgress = true;
      }
      if (pResponse.trophies[i].id === '98265') {
        game.goldProgress = true;
      }
      if (pResponse.trophies[i].id === '98266') {
        game.platinumProgress = true;
      }
    }

  });
  GJAPI.DataStoreFetch(
    GJAPI.DATA_STORE_USER,
    'level',
    function (pResponse) {
      if (pResponse.success) {
        game.level = parseInt(pResponse.data, 10);
        GJAPI.DataStoreFetch(
          GJAPI.DATA_STORE_USER,
          'totalEnemiesKilled',
          function (pResponse) {
            if (pResponse.success) {
              game.totalEnemiesKilled = parseInt(pResponse.data, 10);
              GJAPI.DataStoreFetch(
                GJAPI.DATA_STORE_USER,
                'totalEnemyPartsKilled',
                function (pResponse) {
                  if (pResponse.success) {
                    game.totalEnemyPartsKilled = parseInt(pResponse.data, 10);
                    game.totalScore = (game.level - 1) * 100 + 
                      game.totalEnemiesKilled * 5 + 
                      game.totalEnemyPartsKilled * 10;
                  }
                  callback();
                }
              );
            } else {
              callback();
            }
          }
        );
      } else {
        callback();
      }
    }
  );
}

function createPlayer() {
  game.player = game.add.sprite(924, 288, 'sprites', 'sprite.png');
  game.physics.enable(game.player, Phaser.Physics.ARCADE);
  game.player.body.collideWorldBounds = true;
  game.player.body.onWorldBounds = new Phaser.Signal();
  game.player.body.setCircle(50);
  game.gameOver = function () {
    game.timer.pause();
    game.player.kill();
    game.time.events.remove(game.bulletSpawner);
    game.time.events.remove(game.enemySpawner);
    game.time.events.add(3000, function () {
      game.state.restart();
    });
  };
  game.player.body.onWorldBounds.add(game.gameOver);
  game.win = function () {
    game.totalScore = game.levelScore;
    game.level += 1;
    game.totalScore += 100;
    game.totalEnemiesKilled += game.levelEnemiesKilled;
    game.totalEnemyPartsKilled += game.levelEnemyPartsKilled;
    if (GJAPI.bActive) {
      GJAPI.ScoreAdd(373000, game.totalScore, game.totalScore);
      GJAPI.DataStoreSet(GJAPI.DATA_STORE_USER, 'level', game.level);
      GJAPI.DataStoreSet(
        GJAPI.DATA_STORE_USER,
        'totalEnemiesKilled',
        game.totalEnemiesKilled
      );
      GJAPI.DataStoreSet(
        GJAPI.DATA_STORE_USER,
        'totalEnemyPartsKilled',
        game.totalEnemyPartsKilled
      );
    }
    game.state.start('win');
  };
}

function updatePlayer() {
  if (game.input.activePointer.leftButton.isDown) {
    game.player.body.velocity.y = -200;
  }
  game.physics.arcade.collide(game.player, [game.enemies, game.enemyParts], function (player, enemy) {
    player.kill();
    enemy.kill();
    game.gameOver();
  });
}