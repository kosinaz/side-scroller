/**
 * Create the game with a 1024*576 screen size.
 */ 
var game = new Phaser.Game(1024, 576, Phaser.AUTO, '');

/**
 * Create the game states.
 */ 
game.state.add('load', loadState, true);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

/**
 * Set the global settings.
 */
PIXI.Sprite.defaultAnchor = {
  x: 0.5,
  y: 0.5
}
game.style = {
  font: 'bold 30pt Arial',
  fill: 'white'
}