let Util = require('./util.js');
let MovingObject = require('./moving_object.js');

function Asteroid(options) {
  Asteroid.RADIUS = 10;
  Asteroid.COLOR = "#A52A2A";

  MovingObject.call(this, options);
  this.radius = Asteroid.RADIUS;
  this.color = Asteroid.COLOR;
  this.vel = Util.randomVec(2);
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
