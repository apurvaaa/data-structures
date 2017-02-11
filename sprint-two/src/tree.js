var Tree = function(value) {
  var newTree = {};
  _.extend(newTree, treeMethods);
  newTree._value = value;

  // your code here
  newTree._children = [];

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  this._children.push(new Tree(value));
};

treeMethods.contains = function(target) {
  if (this._value === target) {
    return true;
  } else {
    for (var i = 0; i < this._children.length; i++) {
      if (this._children[i].contains(target)) {
        return true;
      }
    }
    return false;
  }
};

treeMethods.excommunicate = function(value) {
  var excommunicated = false;
  var newChildren = [];
  for (var i = 0; i < this._children.length; i++) {
    if (this._children[i]._value !== value) {
      newChildren.push(this._children[i]);
    } else {
      excommunicated = true;
    }
  }

  if (excommunicated) {
    this._children = newChildren;
  } else {
    for (var i = 0; i < this._children.length; i++) {
      this._children[i].excommunicate(value);
    }
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
/*
 addChild: O(1);
 contains: O(n);
 excommunicate: O(n)*/
