/**
 * Create a part of a dying enemy.
 * @param {number} x The x coordinate of the dying enemy.
 * @param {number} y The y coordinate of the dying enemy.
 * @param {number} yvelocity The y velocity of the part.
 */
function createEnemyPart(x, y, yvelocity) {
  var enemyPart = game.enemyParts.create(
    x,
    y,
    'sprites',
    'sprite.png'
  );
  enemyPart.scale.set(0.66);
  enemyPart.body.velocity.x = 400;
  enemyPart.body.velocity.y = yvelocity;
  enemyPart.body.setCircle(50);
  enemyPart.checkWorldBounds = true;
  enemyPart.events.onOutOfBounds.add(function (enemyPart) {
    enemyPart.destroy();
  });
};