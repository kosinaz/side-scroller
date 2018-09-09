function createEnemies() {
  game.enemies = game.add.physicsGroup();
  game.enemyParts = game.add.physicsGroup();
  game.enemySpawner = game.time.events.loop(100 + 1400 / game.level, function () {
    var enemy = game.enemies.create(-50, game.rnd.between(0, 476), 'sprites', 'sprite.png');
    enemy.body.velocity.x = 500;
    enemy.body.setCircle(50);
    enemy.checkWorldBounds = true;
    enemy.events.onOutOfBounds.add(function (enemy) {
      enemy.destroy();
    });
  });
  game.time.events.loop(500, function () {
    game.enemies.setAll('body.velocity.y', -100);
  });
  game.levelEnemiesKilled = 0;
  game.levelEnemyPartsKilled = 0;
}