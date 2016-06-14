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

	function Game(dimX = 300, dimY = 300, numAsteroids = 10) {
	  this.DIM_X = dimX;
	  this.DIM_Y = dimY;
	  this.NUM_ASTEROIDS = numAsteroids;
	  this.asteroids = [];

	  this.addAsteroids(Game.NUM_ASTEROIDS);
	}

	Game.prototype.randomPosition = function() {
	  let x = Math.random() * Game.DIM_X;
	  let y = Math.random() * Game.DIM_Y;
	  return {pos: [x, y]};
	};

	Game.prototype.addAsteroids = function(num=1) {
	  for(let i = 0; i < num; i++){
	    let newAsteroid = new Asteroid(this.randomPosition);
	    this.asteroids.push(newAsteroid);
	  }
	};

	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	  this.asteroids.forEach(asteroid => asteroid.draw());
	};

	Game.prototype.moveObjects = function() {
	  this.asteroids.forEach( asteroid => {
	    asteroid.move();
	  });
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	let Util = __webpack_require__(3);
	let MovingObject = __webpack_require__(4);

	function Asteroid(options) {
	  Asteroid.RADIUS = 2;
	  Asteroid.COLOR = "brown";

	  MovingObject.call(options);
	  this.radius = Asteroid.RADIUS;
	  this.color = Asteroid.COLOR;
	  this.vel = Util.randomVec(length);
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
	  a *= sign[Math.floor(Math.random()*2)]
	  b *= sign[Math.floor(Math.random()*2)]
	  return [a, b];
	};

	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function MovingObject(options) {
	  this.pos = options['pos'];
	  this.vel = options['vel'];
	  this.radius = options['radius'];
	  this.color = options['color'];
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
	};


	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);

	function GameView(game, ctx) {
	  // const canvasEl = document.getElementsByTagName("canvas")[0];
	  // this.canvasEl.height = window.innerHeight;
	  // this.canvasEl.width = window.innerWidth;

	  this.game = game;
	  this.ctx = ctx;

	  // new Game(
	  //   canvasEl.width,
	  //   canvasEl.height
	  // );
	  this.game.start();
	}

	GameView.prototype.start = function(){
	  // const ctx = canvasEl.getContext("2d");
	  const that = this;
	  setInterval( () => {
	    that.game.moveObjects();
	    that.game.draw();
	  }, 20);
	};


/***/ }
/******/ ]);