// AKA trie, radix tree
// Each node is a prefixTree
var PrefixTree = function(str) {
  this._letter = str[0];
  this._isWord = false;
  this._children = {};
};

PrefixTree.prototype.addString = function(str) {
  var node = this;
  for (var i = 0; i < str.length; i++) {
    if (!node._children.hasOwnProperty(str[i])) {
      var newNode = new PrefixTree(str[i]);
      node._children[str[i]] = newNode;
    }
    node = node._children[str[i]];
  }
  node._isWord = true;
};

PrefixTree.prototype.checkString = function(str) {
  var node = this;
  for (var i = 0; i < str.length; i++) {
    if (!node._children.hasOwnProperty(str[i])) {
      return false;
    }
    node = node._children[str[i]];
  }
  return node._isWord;
};

PrefixTree.prototype.removeString = function(str) {
  var node = this;
  if (this.checkString(str)) {
    for (var i = 0; i < str.length; i++) {
      node = node._children[str[i]];
    }
    node._isWord = false;
  }
};

