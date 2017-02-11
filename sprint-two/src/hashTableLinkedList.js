var hashTableLinkedList = function() {
  var list = {};
  list._head = null;
  list._tail = null;

  list.insert = function(key, value) {
    
    // Check if key already is in linked list
    // If it is, replace the value
    var current = this._head;
    var previous = null;
    while (current !== null && key !== current.key) {
      previous = current;
      current = current.next;
    }

    if (current === null) { // Key was not found
      // Add node at tail of linked list
      var node = new hashNode(key, value);
      if (list._tail) {
        list._tail.next = node;
        list._tail = list._tail.next;
      } else {
        list._tail = node;
        list._head = node;
      }
    } else if (current !== null) {  // key was found
      current.value = value;
    }

  };

  list.contains = function(key) {
    var node = list._head;
    while (node !== null && (key !== node.key)) {
      node = node.next;
    }
    if (node === null) {
      return false;
    } else {
      return true;
    }
  };

  list.forEvery = function(cb) {
    var node = this._head;
    while (node !== null) {
      cb(node.key, node.value);
      node = node.next;
    }
  };

  list.retrieveValue = function(key) {
    var node = list._head;
    while (node !== null && (key !== node.key)) {
      node = node.next;
    }
    if (node === null) {
      return undefined;
    } else {
      return node.value;
    }
  };

  list.remove = function(key) {
    var current = this._head;
    var previous = null;
    while (current !== null && key !== current.key) {
      previous = current;
      current = current.next;
    }
    if (current === this._head) {
      this._head = this._head.next;
    } else if (current !== null) {
      previous.next = current.next;
    }
  };

  return list;
};

var hashNode = function(key, value) {
  var node = {};
  node.key = key;
  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

/*insert: O(1)
contains: O(n)
remove: O(n) */