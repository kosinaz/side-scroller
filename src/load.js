var loadState = {

  preload: function () {

    /**
     * Load the sprites.
     */
    game.load.atlas('sprites', 'assets/sprites.png', 'data/sprites.json');

    /**
     * Load the music.
     */
    game.load.audio('easy', ['assets/easy.ogg', 'assets/easy.m4a']);
    game.load.audio('medium', ['assets/medium.ogg', 'assets/medium.m4a']);
    game.load.audio('hard', ['assets/hard.ogg', 'assets/hard.m4a']);
  },

  create: function () {

    /**
     * Start the music.
     */
    game.music = game.add.audio('easy', 0.3, true).play();

    loadPlayer(function () {
      game.state.start('menu');
    });

  }

};