var Tree = function(value) {
  var newTree = {};
  _.extend(newTree, treeMethods);
  newTree.value = value;

  // your code here
  newTree.children = [];

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  this.children.push(new Tree(value));
};

treeMethods.contains = function(target) {
  if (this.value === target) {
    return true;
  } else {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].contains(target)) {
        return true;
      }
    }
    return false;
  }


};


treeMethods.excommunicate = function(value) {
  var excommunicated = false;
  var newChildren = [];
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].value !== value) {
      newChildren.push(this.children[i]);
    } else {
      excommunicated = true;
    }
  }

  if (excommunicated) {
    this.children = newChildren;
  } else {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].excommunicate(value);
    }
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
/*
 addChild: O(1);
 contains: O(n);*/
