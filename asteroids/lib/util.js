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
