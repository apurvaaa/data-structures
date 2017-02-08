var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var obj = {};
  _.extend(obj, stackMethods);
  obj.stackSize = 0;
  obj.storage = {};
  return obj;

};


var stackMethods = {
  size: function() {
    return this.stackSize;
  },
  push: function(value) {
    this.storage[this.stackSize] = value;
    this.stackSize++;
  },
  pop: function() {
    if (this.stackSize > 0) {
      this.stackSize--;
      return this.storage[this.stackSize];
    } else {
      return null;
    }
  }
};


