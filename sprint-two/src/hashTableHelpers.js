/*
 ********** NOTE: **********
 * Do not edit this code unless you see a bug!
 */


// This class represents an array with limited functionality and a maximum size.
// It will ensure that you don't accidentally try to use up too much space.
//
// Usage:
//   limitedArray.set(3, 'hi');
//   limitedArray.get(3); // returns 'hi'

var LimitedArray = function(limit) {
  
  var limit = limit;
  var storage = [];
  var count = 0;

  var limitedArray = {};

  limitedArray.get = function(index, key) {
    checkLimit(index);
    
    if (storage[index] === undefined) {
      return undefined;
    } else {
      if (storage[index].contains(key)) {
        return storage[index].retrieveValue(key);
      } else {
        return undefined;
      }
    }
  };
  limitedArray.set = function(index, key, value) {
    checkLimit(index);
    // Remove node
    if (value === undefined) {
      if (storage[index] !== undefined && storage[index].contains(key)) {
        storage[index].remove(key);
        count--;
      }
      return;
    }
    // Add new node
    // If nothing is at the index yet
    if (storage[index] === undefined) {
      storage[index] = new hashTableLinkedList();      
    }  
    storage[index].insert(key, value);
    count++;
  };

  limitedArray.each = function(callback) {
    for (var i = 0; i < storage.length; i++) {
      callback(storage[i], i, storage);
    }
  };
  limitedArray.increaseToDouble = function() {
    limitedArray.rehash(limit * 2);
  };

  limitedArray.rehash = function(newLimit) {
    var newStorage = [];
    // for every index 
    for (var i = 0; i < storage.length; i++) {
      if (storage[i] !== undefined) {
        for (var key in storage[i]) {
          var originalValue = storage[i][key];
          var index = getHash(key, newLimit);
          if (newStorage[index] === undefined) {
            newStorage[index] = {};
          }
          newStorage[index][key] = originalValue;
        }
      }
    }
    limit = newLimit;
    storage = newStorage;
  };

  limitedArray.isAlmostEmpty = function() {
    return (count < Math.floor(limit * 0.25));
  };

  limitedArray.reduceToHalf = function() {
    limitedArray.rehash(Math.floor(limit / 2));
  };

  limitedArray.isAlmostFull = function() {
    return count >= (0.75 * limit);
  };

  var checkLimit = function(index) {
    if (typeof index !== 'number') {
      throw new Error('setter requires a numeric index for its first argument');
    }
    if (limit <= index) {
      throw new Error('Error trying to access an over-the-limit index');
    }
  };

  return limitedArray;
};

// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between the
// numbers 0 and `max`
var getHash = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
