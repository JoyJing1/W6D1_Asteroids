/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(5);

	document.addEventListener("DOMContentLoaded", function(){

	  const canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.height = window.innerHeight;
	  canvasEl.width = window.innerWidth;
	  const ctx = canvasEl.getContext("2d");

	  const game = new Game();
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	let Asteroid = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	let Util = __webpack_require__(3);
	let MovingObject = __webpack_require__(4);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  inherits () {
	  }
	};

	Util.inherits = function(ChildClass, ParentClass) {
	  function Surrogate(){}
	  Surrogate.prototype = ParentClass.prototype;
	  ChildClass.prototype = new Surrogate();
	  ChildClass.prototype.constructor = ChildClass;
	};

	Util.randomVec = function(length){
	  let b = Math.random() * (length);
	  let a = Math.sqrt( Math.pow(length, 2) - Math.pow(b, 2) );
	  const sign = [1, -1];
	  a *= sign[Math.floor(Math.random()*2)];
	  b *= sign[Math.floor(Math.random()*2)];
	  return [a, b];
	};

	Util.distance = function(pos1, pos2) {
	  return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
	}

	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);

	function GameView(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	  this.start();
	}

	GameView.prototype.start = function(){
	  const that = this;
	  setInterval( () => {
	    that.game.draw(that.ctx);
	    that.game.step();
	  }, 20);
	};

	module.exports = GameView;


/***/ }
/******/ ]);