var menuState = {

  create: function () {

    /**
     * Create title and subtitle.
     */
    game.add.text(512, 88, 'Side-scroller', game.style);
    game.add.text(512, 188, 'A basic side-scroller game template', game.style);
    createNewGameButton();
    if (game.level > 1) {
      createContinueButton();
    }
    createMuteButton();

  }

};


