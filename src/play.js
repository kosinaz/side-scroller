var playState = {

    create: function () {

        /**
         * Set the physics.
         */
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1000;

        /**
         * Set the player.
         */
        game.player = game.add.sprite(924, 288, 'sprites', 'sprite.png');
        game.player.anchor = {x: 0.5, y: 0.5};
        game.physics.enable(game.player, Phaser.Physics.ARCADE);
        game.player.body.collideWorldBounds = true;
        game.player.body.onWorldBounds = new Phaser.Signal();
        game.gameOver = function () {
            game.player.kill();
            game.time.events.remove(game.bulletSpawner);
            game.time.events.remove(game.enemySpawner);
            game.time.events.add(3000, function () {
                game.state.restart();
            });
        }
        game.player.body.onWorldBounds.add(game.gameOver);

        /**
         * Set the enemies.
         */
        game.enemies = game.add.physicsGroup();
        game.enemyParts = game.add.physicsGroup();

        /**
         * Set the bullets.
         */
        game.bullets = game.add.physicsGroup();

        /**
         * Set the controls.
         */
        game.input.mouse.capture = true;

        /**
         * Set the enemy spawner.
         */        
        game.enemySpawner = game.time.events.loop(500, function () {
            var enemy = game.enemies.create(
                -100, 
                game.rnd.between(0, 476),
                'sprites', 
                'sprite.png'
            );
            enemy.body.velocity.x = 500;
            enemy.body.allowGravity = false;
            enemy.body.immovable = true;
            enemy.checkWorldBounds = true;
            enemy.events.onOutOfBounds.add(function (enemy) {
                enemy.destroy();
            });
        });

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
            enemyPart.body.allowGravity = false;
            enemyPart.body.immovable = true;
            enemyPart.checkWorldBounds = true;
            enemyPart.events.onOutOfBounds.add(function (enemyPart) {
                enemyPart.destroy();
            });
        };

        /**
         * Set the bullet spawner.
         */
        game.bulletSpawner = game.time.events.loop(330, function () {
            var bullet = game.bullets.create(
                game.player.x - 50,
                game.player.y,
                'sprites',
                'sprite.png'
            );
            bullet.scale.set(0.25);
            bullet.body.velocity.x = -1000;
            bullet.anchor = {x: 0.5, y: 0.5};
            bullet.body.allowGravity = false;
            bullet.checkWorldBounds = true;
            bullet.events.onOutOfBounds.add(function (bullet) {
                bullet.destroy();
            });
        });

    },

    update: function () {  

        /**
         * Rise the player.
         */
        if (game.input.activePointer.leftButton.isDown) {
            game.player.body.velocity.y = -330;
        }        

        /**
         * Set player collision.
         */
        game.physics.arcade.collide(
            game.player, 
            [game.enemies, game.enemyParts], 
            game.gameOver
        );

        /**
         * Set bullet collision.
         */
        game.physics.arcade.collide(
            game.bullets,
            game.enemies,
            function (bullet, enemy) {
                bullet.kill();
                game.spawnEnemyPart(enemy.x, enemy.y, 50);
                game.spawnEnemyPart(enemy.x, enemy.y, -50);
                enemy.kill();
            }
        );
        game.physics.arcade.collide(
            game.bullets,
            game.enemyParts,
            function (bullet, enemyPart) {
                bullet.kill();
                enemyPart.kill();
            }
        );

    }

}
