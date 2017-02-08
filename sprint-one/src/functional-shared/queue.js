var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var obj = {};
  obj.queueSize = 0;
  obj.storage = {};
  obj.low = 0;
  obj.high = 0;
  _.extend(obj, queueMethods);
  return obj;
};

var queueMethods = {
  size: function() {
    return this.queueSize;
  },
  enqueue: function(value) {
    this.storage[this.high++] = value;
    this.queueSize++;
  },
  dequeue: function() {
    if (this.queueSize > 0) {
      var result = this.storage[this.low++];
      this.queueSize--;
      return result;
    } else {
      return null;
    }
  }
};


