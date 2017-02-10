var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var node = new Node(value);
    if (list.tail) {
      list.tail.next = node;
      list.tail = list.tail.next;
    } else {
      list.tail = node;
      list.head = node;
    }
  };

  list.removeHead = function() {
    var result = list.head;
    if (list.head !== null) {
      list.head = list.head.next;
    }
    return result.value;
  };

  list.contains = function(target) {
    var node = list.head;
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
    var current = this.head;
    var previous = null;
    while (current !== null && value !== current.value) {
      previous = current;
      current = current.next;
    }
    if (current === this.head) {
      this.removeHead();
    } else if (current !== null) {
      previous.next = current.next;
    }

  };

  list.forEvery = function(cb) {
    var node = this.head;
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
