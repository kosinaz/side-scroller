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
    game.totalScore += 100;
    game.totalEnemiesKilled += game.levelEnemiesKilled;
    game.totalEnemyPartsKilled += game.levelEnemyPartsKilled;
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