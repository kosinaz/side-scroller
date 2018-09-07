var menuState = {

  create: function () {

    /**
     * Set the Start New Game button
     */
    var startNewGameButton = game.add.text(512, 288, 'Start New Game', {
      font: 'bold 30pt Arial',
      fill: '#fff'
    });
    startNewGameButton.inputEnabled = true;
    startNewGameButton.events.onInputUp.add(function () {
      game.level = 1;
      game.state.start('play');
    }, this);
    startNewGameButton.anchor.set(0.5, 0.5);
  }

};