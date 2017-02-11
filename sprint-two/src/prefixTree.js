// AKA trie, radix tree
// Each node is a prefixTree
var PrefixTree = function(str) {
  this.letter = str[0];
  this.children = {};
};