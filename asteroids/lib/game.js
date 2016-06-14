let Asteroid = require("./asteroid.js");

const DIM_X = 1400;
const DIM_Y = 700;
const NUM_ASTEROIDS = 5;

function Game(dimX = DIM_X, dimY = DIM_Y, numAsteroids = NUM_ASTEROIDS) {
  this.dimX = dimX;
  this.dimY = dimY;
  this.numAsteroids = numAsteroids;
  this.asteroids = [];

  for(let i = 0; i < this.numAsteroids; i++){
    this.addAsteroids();
  }
}

Game.randomPosition = function() {
  let x = Math.floor(Math.random() * DIM_X);
  let y = Math.floor(Math.random() * DIM_Y);
  return [x, y];
};

Game.prototype.addAsteroids = function() {
  let newAsteroid = new Asteroid( {pos: Game.randomPosition(), game: this} );
  this.asteroids.push(newAsteroid);
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.dimX, this.dimY);
  this.asteroids.forEach(asteroid => asteroid.draw(ctx));
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach( asteroid => {
    asteroid.move();
  });
};

Game.prototype.wrap = function(pos) {
  pos[0] = pos[0] % DIM_X;
  pos[1] = pos[1] % DIM_Y;

  pos[0] = (pos[0] < 0 ? pos[0] + DIM_X : pos[0]);
  pos[1] = (pos[1] < 0 ? pos[1] + DIM_Y : pos[1]);

  return pos;
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.checkCollisions = function() {
  this.asteroids.forEach( myAsteroid => {
    myAsteroid.game.asteroids.forEach( otherAsteroid => {
      if (myAsteroid.isCollidedWith(otherAsteroid)
          && !myAsteroid.equals(otherAsteroid) ) {
            window.alert("COLLISION");
      }
    });
  });
};

module.exports = Game;
