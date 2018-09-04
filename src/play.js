var playState = {

    create: function () {

        /**
         * Set the player.
         */
        game.player = game.add.sprite(924, 288, 'sprites', 'sprite.png');
        game.player.anchor = {x: 0.5, y: 0.5};
        
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

    },

    update: function () {  

        /**
         * Rise the player.
         */
        if (game.input.activePointer.leftButton.isDown) {
            game.player.body.velocity.y = -500;
        }

    }

}
