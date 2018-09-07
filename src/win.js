var winState = {

  create: function () {

    /**
     * Set the Start Next Level button
     */
    var startNextLevelButton = game.add.text(512, 288, 'Start Next Level', {
      font: 'bold 30pt Arial',
      fill: '#fff'
    });
    startNextLevelButton.inputEnabled = true;
    startNextLevelButton.events.onInputUp.add(function () {
      game.level += 1;
      game.state.start('play');
    }, this);
    startNextLevelButton.anchor.set(0.5, 0.5);
  }

};