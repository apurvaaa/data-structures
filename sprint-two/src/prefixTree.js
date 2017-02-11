// AKA trie, radix tree
// Each node is a prefixTree
var PrefixTree = function(str) {
  this.letter = str[0];
  this.isWord = false;
  this.children = {};
};

PrefixTree.prototype.addString = function(str) {
  var node = this;
  for (var i = 0; i < str.length; i++) {
    if (!node.children.hasOwnProperty(str[i])) {
      var newNode = new PrefixTree(str[i]);
      node.children[str[i]] = newNode;
    }
    node = node.children[str[i]];
  }
  node.isWord = true;
};

PrefixTree.prototype.checkString = function(str) {
  var node = this;
  for (var i = 0; i < str.length; i++) {
    if (!node.children.hasOwnProperty(str[i])) {
      return false;
    }
    node = node.children[str[i]];
  }
  return node.isWord;
};

PrefixTree.prototype.removeString = function(str) {
  var node = this;
  if (this.checkString(str)) {
    for (var i = 0; i < str.length; i++) {
      node = node.children[str[i]];
    }
    node.isWord = false;
  }
};

