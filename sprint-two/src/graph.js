var GraphNode = function(id) {
  this.id = id;
  this.edges = {};
};

// Instantiate a new graph
var Graph = function() {
  this.nodes = {};
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this.nodes[node] = new GraphNode(node);
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  for (var key in this.nodes) {
    if (this.nodes[key].id === node) {
      return true;
    }
  }
  return false;
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  delete this.nodes[node];
  for (var key in this.nodes) {
    if (this.nodes[key].edges[node] !== undefined) {
      delete this.nodes[key].edges[node];
    }
  }
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  var hasNodes = this.hasNode(fromNode) && this.hasNode(toNode);
  return hasNodes ? (this.nodes[toNode].edges[fromNode] !== undefined &&
    this.nodes[fromNode].edges[toNode] !== undefined) : false;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  if (this.hasNode(fromNode) && this.hasNode(toNode)) {
    this.nodes[fromNode].edges[toNode] = true;
    this.nodes[toNode].edges[fromNode] = true;
  }
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  delete this.nodes[fromNode].edges[toNode];
  delete this.nodes[toNode].edges[fromNode];
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (var key in this.nodes) {
    cb(this.nodes[key].id);
  }
};

Graph.prototype.hasNode = function(node) {
  return this.nodes[node] !== undefined;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
 /* n is the number of nodes in the list
 addNode: O(1)
 contains: O(n)
 removeNode: O(n)
 addEdge: O(1)
 hasEdge: O(1)
 removeEdge: O(1)
 forEachNode: O(n) * complexity of callback function*/

