var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = LinkedList();
  return set;
};

var setPrototype = {};

setPrototype.add = function(item) {
  this._storage.addToTail(item);
};

setPrototype.contains = function(item) {
  return this._storage.contains(item);
};

setPrototype.remove = function(item) {
  this._storage.removeNode(item);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
