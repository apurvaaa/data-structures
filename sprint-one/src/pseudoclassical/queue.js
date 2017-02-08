var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.queueSize = 0;
  this.low = 0;
  this.high = 0;
  this.storage = {};
};

Queue.prototype.size = function() {
  return this.queueSize;
};

Queue.prototype.enqueue = function(value) {
  this.storage[this.high++] = value;
  this.queueSize++;
};

Queue.prototype.dequeue = function() {
  if (this.queueSize > 0) {
    this.queueSize--;
    return this.storage[this.low++];
  } else {
    return null;
  }

};






