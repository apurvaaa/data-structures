var LinkedList = function() {
  var list = {};
  list._head = null;
  list._tail = null;

  list.addToTail = function(value) {
    var node = new Node(value);
    if (list._tail) {
      list._tail.next = node;
      list._tail = list._tail.next;
    } else {
      list._tail = node;
      list._head = node;
    }
  };

  list.removeHead = function() {
    var result = list._head;
    if (list._head !== null) {
      list._head = list._head.next;
    }
    return result.value;
  };

  list.contains = function(target) {
    var node = list._head;
    while (node !== null && target !== node.value) {
      node = node.next;
    }
    if (node === null) {
      return false;
    } else {
      return true;
    }
  };

  list.removeNode = function(value) {
    var current = this._head;
    var previous = null;
    while (current !== null && value !== current.value) {
      previous = current;
      current = current.next;
    }
    if (current === this._head) {
      this.removeHead();
    } else if (current !== null) {
      previous.next = current.next;
    }

  };

  list.forEvery = function(cb) {
    var node = this._head;
    while (node !== null) {
      cb(node.value);
      node = node.next;
    }
  };

  return list;
};

var Node = function(value) {
  var node = {};
  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

/*addToTail: O(1)
removeHead: O(1)
contains: O(n)*/
