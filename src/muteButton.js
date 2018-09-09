function createMuteButton() {
  game.muteButton = game.add.text(904, 50, game.music.mute ? '🕨' : '🕪', game.style);
  game.muteButton.inputEnabled = true;
  game.muteButton.events.onInputUp.add(function () {
    game.music.mute = !game.music.mute;
    game.muteButton.text = game.music.mute ? '🕨' : '🕪';
  });
}