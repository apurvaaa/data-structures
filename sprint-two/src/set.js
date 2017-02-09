var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = new HashTable();
  return set;
};

var setPrototype = {};

setPrototype.add = function(item) {
  this._storage.insert(item, item);
};

setPrototype.contains = function(item) {
  return this._storage.retrieve(item) !== undefined;
};

setPrototype.remove = function(item) {
  this._storage.remove(item);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
/*add: O(1) 
contains: O(1)
remove: O(1)*/