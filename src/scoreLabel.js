function createScoreLabel() {
  game.levelScore = game.totalScore;
  game.levelScoreLabel = game.add.text(512, 50, 'Score: ' + game.levelScore, game.style);
}
function updateScoreLabel() {
  game.levelScoreLabel.text = 'Score: ' + game.levelScore;
}