

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  if (this._storage.isFull()) {
    this._storage.doubleLimit();
    this._limit *= 2;
  }
  var index = getHash(k, this._limit);
  this._storage.set(index, v);
};

HashTable.prototype.retrieve = function(k) {
  var index = getHash(k, this._limit);
  return this._storage.get(index);
};

HashTable.prototype.remove = function(k) {
  var index = getHash(k, this._limit);
  this._storage.set(index, undefined);
  if (this._storage.isHalfFull()) {
    this._storage.reduceToHalf();
    this._limit /= 2;
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 */

/*L = length of string
insert: O(L)
retrieve: O(L)
remove: O(L)*/
