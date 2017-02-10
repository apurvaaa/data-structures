// To do:
// [x] collect keys at insertion
// [x] delete keys at remove
// [ ] reduce size in half

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  if (this._storage.isAlmostFull()) { 
    this._storage.increaseToDouble(); //O(n)
    this._limit *= 2;
  }
  var index = getHash(k, this._limit); //O(L)
  this._storage.set(index, k, v);         // O(1) - O(n)
};

HashTable.prototype.retrieve = function(k) {
  var index = getHash(k, this._limit);
  return this._storage.get(index, k);
};

HashTable.prototype.remove = function(k) {
  var index = getHash(k, this._limit);     //O(L)
  this._storage.set(index, k, undefined);  //O(n) - O(1)
  if (this._storage.isAlmostEmpty()) {     
    this._storage.reduceToHalf(this._keys);  // O(n)
    this._limit = Math.floor(this._limit / 2);
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 */

/*L = length of string
insert: 
worst: O(L) + O(n)
best: O(L) +O(1)

retrieve: 
worst: O(L) + O(n)
best: O(L) + O(1)

remove: 
worst: O(L) + O(n)
best: O(L) + O(1)
*/
