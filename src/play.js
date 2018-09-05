var playState = {

    create: function () {

        /**
         * Set the player.
         */
        game.player = game.add.sprite(924, 288, 'sprites', 'sprite.png');
        game.player.anchor = {x: 0.5, y: 0.5};

        /**
         * Set the enemies.
         */
        game.enemies = game.add.physicsGroup();

        /**
         * Set the bullets.
         */
        game.bullets = game.add.physicsGroup();
        
        /**
         * Set the gravity.
         */
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1000;
        game.physics.enable(game.player, Phaser.Physics.ARCADE);
        game.player.body.collideWorldBounds = true;

        /**
         * Set the controls.
         */
        game.input.mouse.capture = true;

        /**
         * Set the enemy spawner.
         */
        game.enemyspawner = game.time.events.loop(500, function () {
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
        }, this);

        /**
         * Set the bullet spawner.
         */
        game.bulletspawner = game.time.events.loop(330, function () {
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
        }, this);

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
            game.enemies, 
            function (player) {
                player.kill();
                game.time.events.remove(game.bulletspawner);
                game.time.events.remove(game.enemyspawner);
                game.time.events.add(3000, function () {
                    game.state.restart();
                });
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
                enemy.kill();
            }
        );

    }

}
