var playState = {

  create: function () {

    /**
     * Set the physics.
     */
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 300;

    /**
     * Set the player.
     */
    game.player = game.add.sprite(924, 288, 'sprites', 'sprite.png');
    game.player.anchor = {
      x: 0.5,
      y: 0.5
    };
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
    }
    game.player.body.onWorldBounds.add(game.gameOver);
    game.win = function () {
      game.totalScore = game.levelScore;
      game.totalEnemiesKilled += game.levelEnemiesKilled;
      game.totalEnemyPartsKilled += game.levelEnemyPartsKilled;
      game.state.start('win');
    }

    /**
     * Set the enemies.
     */
    game.enemies = game.add.physicsGroup();
    game.enemyParts = game.add.physicsGroup();
    game.enemySpawner = game.time.events.loop(
      300 + 1200 / game.level,
      function () {        
        var enemy = game.enemies.create(
          -50,
          game.rnd.between(0, 476),
          'sprites',
          'sprite.png'
        );
        enemy.body.velocity.x = 500;
        enemy.body.setCircle(50);
        enemy.checkWorldBounds = true;
        enemy.anchor = {
          x: 0.5,
          y: 0.5
        };
        enemy.events.onOutOfBounds.add(function (enemy) {
          enemy.destroy();
        });
      }
    );
    game.time.events.loop(500, function () {
      game.enemies.setAll('body.velocity.y', -100);
    });
    game.levelEnemiesKilled = 0;
    game.levelEnemyPartsKilled = 0;

    /**
     * Spawn a part of a dying enemy.
     * @param {number} x The x coordinate of the dying enemy.
     * @param {number} y The y coordinate of the dying enemy.
     * @param {number} yvelocity The y velocity of the part.
     */
    game.spawnEnemyPart = function (x, y, yvelocity) {
      var enemyPart = game.enemyParts.create(
        x,
        y,
        'sprites',
        'sprite.png'
      );
      enemyPart.scale.set(0.66);
      enemyPart.body.velocity.x = 400;
      enemyPart.body.velocity.y = yvelocity;
      enemyPart.body.setCircle(50);
      enemyPart.anchor = {
        x: 0.5,
        y: 0.5
      };
      enemyPart.checkWorldBounds = true;
      enemyPart.events.onOutOfBounds.add(function (enemyPart) {
        enemyPart.destroy();
      });
    };

    /**
     * Set the bullets.
     */
    game.bullets = game.add.physicsGroup();
    game.bulletSpawner = game.time.events.loop(330, function () {
      var bullet = game.bullets.create(
        game.player.x - 50,
        game.player.y,
        'sprites',
        'sprite.png'
      );
      bullet.scale.set(0.25);
      bullet.body.setCircle(50);
      bullet.body.velocity.x = -1000;
      bullet.anchor = {
        x: 0.5,
        y: 0.5
      };
      bullet.checkWorldBounds = true;
      bullet.events.onOutOfBounds.add(function (bullet) {
        bullet.destroy();
      });
    });

    /**
     * Set the controls.
     */
    game.input.mouse.capture = true;

    /**
     * Set the timer.
     */
    game.timer = game.time.create(false);
    game.timer.add(15000, game.win);
    game.timer.start();

    /**
     * Set the timer text.
     */
    game.timerLabel = game.add.text(20, 20, '0:00', {
      font: 'bold 30pt Arial',
      fill: '#fff'
    });

    /**
     * Set the level text.
     */
    game.add.text(150, 20, 'Level: ' + game.level, {
      font: 'bold 30pt Arial',
      fill: '#fff'
    });

    /**
     * Set the score text.
     */
    game.levelScore = game.totalScore;
    game.levelScoreLabel = game.add.text(350, 20, 'Score: ' + game.levelScore, {
      font: 'bold 30pt Arial',
      fill: '#fff'
    });

    /**
     * Set the mute button.
     */
    game.muteButton = game.add.text(904, 20, '🕪', {
      font: 'bold 30pt Arial',
      fill: '#fff'
    });
    game.muteButton.text = game.music.mute ? '🕨' : '🕪';
    game.muteButton.inputEnabled = true;
    game.muteButton.events.onInputUp.add(function () {
       game.music.mute = !game.music.mute;
       game.muteButton.text = game.music.mute ? '🕨' : '🕪';
    });

  },

  update: function () {

    /**
     * Raise the player.
     */
    if (game.input.activePointer.leftButton.isDown) {
      game.player.body.velocity.y = -200;
    }

    /**
     * Set player collision.
     */
    game.physics.arcade.collide(
      game.player,
      [game.enemies, game.enemyParts],
      function (player, enemy) {
        player.kill();
        enemy.kill();
        game.gameOver();
      }
    );

    /**
     * Set bullet collision.
     */
    game.physics.arcade.collide(
      game.bullets,
      game.enemies,
      function (bullet, enemy) {
        bullet.kill();
        game.spawnEnemyPart(enemy.x, enemy.y, 200);
        game.spawnEnemyPart(enemy.x, enemy.y, -200);
        enemy.kill();
        game.levelEnemiesKilled += 1;
        game.levelScore += 5;
      }
    );
    game.physics.arcade.collide(
      game.bullets,
      game.enemyParts,
      function (bullet, enemyPart) {
        bullet.kill();
        enemyPart.kill();
        game.levelEnemyPartsKilled += 1;
        game.levelScore += 10;
      }
    );

    /**
     * Update the time left.
     */
    var time = Math.ceil(game.timer.duration / 1000);
    game.timerLabel.text = Math.floor(time / 60) + ':' +
      (time % 60 < 10 ? '0' : '') + time % 60;

    /**
     * Update score.
     */
    game.levelScoreLabel.text = 'Score: ' + game.levelScore;

    /**
     * Stop enemy spawning before the end.
     */
    if (time > 1 && time < 4) {
      game.time.events.remove(game.enemySpawner);
    }

  }
}