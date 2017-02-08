var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0;
  // Implement the methods below
  var low = 0;
  var high = 0;

  someInstance.enqueue = function(value) {
    storage[high] = value;
    high++;
    size++;
  };

  someInstance.dequeue = function() {
    if (size > 0) {
      var result = storage[low];
      low++;
      size--;
      return result;
    } else {
      return null;
    }
  };

  someInstance.size = function() {
    return size;
  };

  return someInstance;
};
