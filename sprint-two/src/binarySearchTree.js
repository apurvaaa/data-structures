var BinarySearchTree = function(value) {
  var BST = Object.create(BSTmethods);
  BST.value = value;
  BST.left = null;
  BST.right = null;
  return BST;
};

var BSTmethods = {
  insert: function(value) {
    var node;
    if (value < this.value) {
      if (this.left === null) {
        node = BinarySearchTree(value);
        this.left = node;
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        node = BinarySearchTree(value);
        this.right = node;
      } else {
        this.right.insert(value);
      }
    }
  },
  contains: function(value) {
    if (this.value === value) {
      return true;
    } else if (this.value < value && this.right !== null) {
      return this.right.contains(value);
    } else if (this.value > value && this.left !== null) {
      return this.left.contains(value);
    } else {
      return false;
    }
  },
  depthFirstLog: function(cb) {
    cb(this.value);
    if (this.left !== null) {
      this.left.depthFirstLog(cb);
    } 
    if (this.right !== null) {
      this.right.depthFirstLog(cb);
    }
  },
  remove: function(value) {
    var currentNode = this;
    var previousNode = null;

    
    // Finding the node with the value
    while (currentNode.value !== value) { // We want to remove this node
      if (currentNode.value < value ) {
        if (currentNode.left === null) {
          return;
        } else {
          previousNode = currentNode;
          currentNode = currentNode.right;
        }
      } else if (currentNode.value > value) {
        if (currentNode.left === null) {
          return;  
        }
        previousNode = currentNode;
        currentNode = currentNode.left;
      } 
    }
    // Case with no children
    if (currentNode.left === null && currentNode.right === null) {
      if (previousNode.value > currentNode.value) {
        previousNode.left = null;
      } else {
        previousNode.right = null;
      }
      return;
    }

    // Case with one child
    if (currentNode.left === null && currentNode.right !== null) {
      if (previousNode.value > currentNode.value) {
        previousNode.left = currentNode.right;
      } else {
        previousNode.right = currentNode.right;
      }
    } else if (currentNode.left !== null && currentNode.right === null) {
      if (previousNode.value > currentNode.value) {
        previousNode.left = currentNode.left;
      } else {
        previousNode.right = currentNode.left;
      }
      return;
    }

    // Case where node has two children
    var minimalValue = currentNode.right.findMinimalValueInTree();
    currentNode.value = minimalValue;
    currentNode.right.remove(value);  // Removes minimal value in right subtree
  },
  findMinimalValueInTree: function() {
    if (this.left !== null) {
      return this.left.findMinimalValueInTree();
    } else {
      return this.value;
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