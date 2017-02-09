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
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
