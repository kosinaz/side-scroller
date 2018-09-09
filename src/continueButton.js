function createContinueButton() {
  var continueButton = game.add.text(512, 488, 'Continue', game.style);
  continueButton.inputEnabled = true;
  continueButton.events.onInputUp.add(function () {
    game.level += 1;
    game.state.start('play');
  });
}