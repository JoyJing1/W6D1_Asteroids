

Function.prototype.inherits = function(superclass){
  function Surrogate(){}
  Surrogate.prototype = superclass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function MovingObject () {};

MovingObject.prototype.moveLeft = function(){
  console.log("move left");
};

function Ship () {};
Ship.inherits(MovingObject);

function Asteroid () {};
Asteroid.inherits(MovingObject);


let ship = new Ship();
ship.moveLeft();

Ship.prototype.moveRight = function(){
  console.log("move right");
};

let moving = new MovingObject();
moving.moveRight();

let asteroid = new Asteroid();
asteroid.moveLeft();
asteroid.moveRight();
