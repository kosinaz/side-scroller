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
         * Set the gravity.
         */
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1000;
        game.physics.enable(game.player, Phaser.Physics.ARCADE);
        game.player.body.collideWorldBounds = true;
        game.player.body.immovable = true;

        /**
         * Set the controls.
         */
        game.input.mouse.capture = true;

    },

    update: function () {  

        /**
         * Rise the player.
         */
        if (game.input.activePointer.leftButton.isDown) {
            game.player.body.velocity.y = -330;
        }

        /**
         * Spawn an enemy.
         */
        if (!game.rnd.between(0, 99)) {
            var enemy = game.enemies.create(
                -100, 
                game.rnd.between(100, 476), 
                'sprites', 
                'sprite.png'
            );
            enemy.body.velocity.x = 500;
            enemy.body.allowGravity = false;
        }

        /**
         * Set collision.
         */
        game.physics.arcade.collide(
            game.player, 
            game.enemies, 
            function (player, enemy) {
                //player.body.velocity.x = 0;
                enemy.kill();
            }
        );

    }

}
