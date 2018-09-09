function createContinueButton() {
  var continueButton = game.add.text(512, 488, 'Continue', game.style);
  continueButton.inputEnabled = true;
  continueButton.events.onInputUp.add(function () {
    game.state.start('play');
  });
}