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
  contains: function() {
  
  },
  depthFirstLog: function() {
  
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
