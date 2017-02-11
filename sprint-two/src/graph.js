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
  return this.nodes[node] !== undefined;
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
  var hasNodes = this.contains(fromNode) && this.contains(toNode);
  return hasNodes ? (this.nodes[toNode].edges[fromNode] !== undefined &&
    this.nodes[fromNode].edges[toNode] !== undefined) : false;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  if (this.contains(fromNode) && this.contains(toNode)) {
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

Graph.prototype.isConnected = function(fromNode, toNode) {

  // push fromNode to toVisit queue
  // loop : while toVisit has nodes in it and toNode hasnt been found
      // pop from toVisit 
          // check if it is toNode , return true
          // if not - push to Visited
      // for each nieghbours (found from edges of node )
          // if not in visisted
              // push to  toVisit
  // loop ended - return false


  var toVisit = [];
  var visited = [];
  toVisit.push(fromNode);

  while (toVisit.length !== 0) {
    var node = toVisit.shift();
    if (node === toNode) {
      return true;
    }
    visited.push(node);
    for (var n in this.nodes[node].edges) {
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
 forEachNode: O(n) * complexity of callback function*/

