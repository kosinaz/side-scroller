function createBullets() {
  game.bullets = game.add.physicsGroup();
  game.bulletSpawner = game.time.events.loop(330, function () {
    var bullet = game.bullets.create(game.player.x - 50, game.player.y, 'sprites', 'sprite.png');
    bullet.scale.set(0.25);
    bullet.body.setCircle(50);
    bullet.body.velocity.x = -1000;
    bullet.checkWorldBounds = true;
    bullet.events.onOutOfBounds.add(function (bullet) {
      bullet.destroy();
    });
  });
}

function updateBullets() {
  game.physics.arcade.collide(game.bullets, game.enemies, function (bullet, enemy) {
    bullet.kill();
    createEnemyPart(enemy.x, enemy.y, 200);
    createEnemyPart(enemy.x, enemy.y, -200);
    enemy.kill();
    game.levelEnemiesKilled += 1;
    game.levelScore += 5;
  });
  game.physics.arcade.collide(game.bullets, game.enemyParts, function (bullet, enemyPart) {
    bullet.kill();
    enemyPart.kill();
    game.levelEnemyPartsKilled += 1;
    game.levelScore += 10;
  });
}