function createTimer () { 
  game.timer = game.time.create(false);
  game.timer.add(15000, game.win);
  game.timer.start();
  game.timerLabel = game.add.text(100, 50, '0:00', game.style);
}
function updateTimer() {
  var time = Math.ceil(game.timer.duration / 1000);
  game.timerLabel.text = Math.floor(time / 60) + ':' +
    (time % 60 < 10 ? '0' : '') + time % 60;
  if (time > 1 && time < 4) {
    game.time.events.remove(game.enemySpawner);
  }
}