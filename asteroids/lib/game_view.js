const Game = require('./game.js');

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
