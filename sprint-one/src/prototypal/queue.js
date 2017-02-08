var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var obj = Object.create(queueMethods);
  obj.storage = {};
  obj.queueSize = 0;
  obj.low = 0;
  obj.high = 0;
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
      this.queueSize--;
      return this.storage[this.low++];
    } else {
      return null;
    }
  }
};


