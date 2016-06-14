// MySum
function sum() {
  const args = Array.from(arguments);
  let ourSum = 0;
  args.forEach( el => {
    ourSum += el;
  });
  return ourSum;
}

function sum2(...args) {
  let ourSum = 0;
  args.forEach( el => {
    ourSum += el;
  });
  return ourSum;
}

//MyBind
Function.prototype.myBind = function() {
  let prevArgs = Array.from(arguments).slice(1);
  const obj = arguments[0];
  const that = this;

  return function(sound, person) {
    prevArgs = prevArgs.concat(sound, person);
    that.apply(obj, prevArgs);
  };
};

function Cat(name) {
  this.name = name;
}

Cat.prototype.says = function (sound, person) {
  console.log(this.name + " says " + sound + " to " + person + "!");
  return true;
};

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

markov.says.myBind(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

markov.says.myBind(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

markov.says.myBind(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

const notMarkovSays = markov.says.myBind(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true

function curriedSum(numArgs) {
  let numbers = [];
  return function _curriedSum(num){
    numbers = numbers.concat(num);
    if (numbers.length === numArgs) {
      return numbers.reduce( (newSum, el) => newSum + el );
    } else {
      return _curriedSum;
    }
  };

}

function sum3(...arr){
  let ourSum = 0;
  arr.forEach( el => {
    ourSum += el;
  });
  return ourSum;
}

Function.prototype.curry = function(numArgs){
  let that = this;
  let args = [];
  return function _curried(arg){
    args.push(arg);
    if (args.length === numArgs) {
      return that.apply(null, args);
      // return that(args);
    } else {
      return _curried;
    }
  };
};

console.log(sum3.curry(3)(1)(2)(3));
