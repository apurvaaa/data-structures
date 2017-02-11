var GraphNode = function(id) {
  this._id = id;
  this._edges = {};
};

// Instantiate a new graph
var Graph = function() {
  this._nodes = {};
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this._nodes[node] = new GraphNode(node);
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return this._nodes[node] !== undefined;
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  delete this._nodes[node];
  for (var key in this._nodes) {
    if (this._nodes[key]._edges[node] !== undefined) {
      delete this._nodes[key]._edges[node];
    }
  }
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  var hasNodes = this.contains(fromNode) && this.contains(toNode);
  return hasNodes ? (this._nodes[toNode]._edges[fromNode] !== undefined &&
    this._nodes[fromNode]._edges[toNode] !== undefined) : false;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  if (this.contains(fromNode) && this.contains(toNode)) {
    this._nodes[fromNode]._edges[toNode] = true;
    this._nodes[toNode]._edges[fromNode] = true;
  }
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  delete this._nodes[fromNode]._edges[toNode];
  delete this._nodes[toNode]._edges[fromNode];
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (var key in this._nodes) {
    cb(this._nodes[key]._id);
  }
};

Graph.prototype.isConnected = function(fromNode, toNode) {

  var toVisit = [];
  var visited = [];
  toVisit.push(fromNode);

  while (toVisit.length !== 0) {
    var node = toVisit.shift();
    if (node === toNode) {
      return true;
    }
    visited.push(node);
    for (var n in this._nodes[node]._edges) {
      if (!visited.includes(parseInt(n))) {
        toVisit.push(parseInt(n));
      }
    }
  }
  return false;
  
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
 forEachNode: O(n) * complexity of callback function
 isConnected: O(n)*/

