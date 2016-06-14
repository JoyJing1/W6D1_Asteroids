const Util = require('./util');

function MovingObject(options) {
  this.pos = options['pos'];
  this.vel = options['vel'];
  this.radius = options['radius'];
  this.color = options['color'];
  this.game = options['game'];
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  return this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  return Util.distance(this.pos, otherObject.pos) < (this.radius + otherObject.radius);
}

MovingObject.prototype.equals = function(otherAsteroid) {
  return this.pos[0] === otherAsteroid.pos[0]
    && this.pos[1] === otherAsteroid.pos[1]
    && this.vel[0] === otherAsteroid.vel[0];
}

module.exports = MovingObject;
