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
      return null;
    } else {
      if (storage[index][key] !== undefined) {
        return storage[index][key];
      } else {
        return null;
      }
    }
    
    return null;
  };
  limitedArray.set = function(index, key, value) {
    checkLimit(index);
    // If nothing is at the index yet
    if (storage[index] === undefined) {
      storage[index] = {};
      storage[index][key] = value;
      count++;
    } else {  // Else, 
      storage[index][key] = value;
    }
    
  };
  limitedArray.each = function(callback) {
    for (var i = 0; i < storage.length; i++) {
      callback(storage[i], i, storage);
    }
  };
  limitedArray.doubleLimit = function() {
    limit *= 2;
  };

  limitedArray.isHalfFull = function() {
    return (count === limit / 2);
  };

  limitedArray.reduceToHalf = function(keys) {
    var newStorage = [];
    keys.forEvery(function(k) {
      var newHashKey = getHash(k, limit / 2);
      var oldHashKey = getHash(k, limit);
      newStorage[newHashKey] = storage[oldHashKey]; 
    });
    limit /= 2;
    storage = newStorage;
  };

  limitedArray.isFull = function() {
    var emptySpaces = 0;
    limitedArray.each(function(item) {
      if (item === undefined) {
        emptySpaces++;
      }
    });
    return emptySpaces === 0;
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
