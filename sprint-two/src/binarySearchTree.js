var BinarySearchTree = function(value) {
  var BST = Object.create(BSTmethods);
  BST._value = value;
  BST._left = null;
  BST._right = null;
  return BST;
};

var BSTmethods = {
  insert: function(value) {
    var node;
    if (value < this._value) {
      if (this._left === null) {
        node = BinarySearchTree(value);
        this._left = node;
      } else {
        this._left.insert(value);
      }
    } else {
      if (this._right === null) {
        node = BinarySearchTree(value);
        this._right = node;
      } else {
        this._right.insert(value);
      }
    }
  },
  contains: function(value) {
    if (this._value === value) {
      return true;
    } else if (this._value < value && this._right !== null) {
      return this._right.contains(value);
    } else if (this._value > value && this._left !== null) {
      return this._left.contains(value);
    } else {
      return false;
    }
  },
  depthFirstLog: function(cb) {
    cb(this._value);
    if (this._left !== null) {
      this._left.depthFirstLog(cb);
    } 
    if (this._right !== null) {
      this._right.depthFirstLog(cb);
    }
  },
  remove: function(value) {
    var currentNode = this;
    var previousNode = null;

    
    // Finding the node with the _value
    while (currentNode._value !== value) { // We want to remove this node
      if (currentNode._value < value ) {
        if (currentNode._left === null) {
          return;
        } else {
          previousNode = currentNode;
          currentNode = currentNode._right;
        }
      } else if (currentNode._value > value) {
        if (currentNode._left === null) {
          return;  
        }
        previousNode = currentNode;
        currentNode = currentNode._left;
      } 
    }
    // Case with no children
    if (currentNode._left === null && currentNode._right === null) {
      if (previousNode._value > currentNode._value) {
        previousNode._left = null;
      } else {
        previousNode._right = null;
      }
      return;
    }

    // Case with one child
    if (currentNode._left === null && currentNode._right !== null) {
      if (previousNode._value > currentNode._value) {
        previousNode._left = currentNode._right;
      } else {
        previousNode._right = currentNode._right;
      }
    } else if (currentNode._left !== null && currentNode._right === null) {
      if (previousNode._value > currentNode._value) {
        previousNode._left = currentNode._left;
      } else {
        previousNode._right = currentNode._left;
      }
      return;
    }

    // Case where node has two children
    var minimalValue = currentNode._right._findMinimalValueInTree();
    currentNode._value = minimalValue;
    currentNode._right.remove(value);  // Removes minimal _value in _right subtree
  },
  _findMinimalValueInTree: function() {
    if (this._left !== null) {
      return this._left._findMinimalValueInTree();
    } else {
      return this._value;
    }
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

/*insert: O(log n)  if unbalanced, then O(n)
contains: O(log n)  if unbalanced, then O(n)
depthFirstLog: O(n * complexity of cb)
remove: O(lg n)
findMinimalValue: O(lg n) where n is the number of nodes in the subtree
*/