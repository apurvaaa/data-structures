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
  
  var _limit = limit;
  var _storage = [];
  var _count = 0;

  var limitedArray = {};

  limitedArray.get = function(index, key) {
    _checkLimit(index);
    
    if (_storage[index] === undefined) {
      return undefined;
    } else {
      if (_storage[index].contains(key)) {
        return _storage[index].retrieveValue(key);
      } else {
        return undefined;
      }
    }
  };
  limitedArray.set = function(index, key, value) {
    _checkLimit(index);
    // Remove node
    if (value === undefined) {
      if (_storage[index] !== undefined && _storage[index].contains(key)) {
        _storage[index].remove(key);
        _count--;
      }
      return;
    }
    // Add new node
    // If nothing is at the index yet
    if (_storage[index] === undefined) {
      _storage[index] = new hashTableLinkedList();      
    }  
    _storage[index].insert(key, value);
    _count++;
  };

  limitedArray.each = function(callback) {
    for (var i = 0; i < _storage.length; i++) {
      callback(_storage[i], i, _storage);
    }
  };
  limitedArray.increaseToDouble = function() {
    limitedArray._rehash(limit * 2);
  };

  limitedArray._rehash = function(newLimit) {
    var newStorage = [];
    for (var i = 0; i < _storage.length; i++) {
      if (_storage[i] !== undefined) {
        _storage[i].forEvery(function(key, value) {
          //get the new index
          var newIndex = getHash(key, newLimit);
          
          //insert to hew _storage at new index
          if (newStorage[newIndex] === undefined) {
            newStorage[newIndex] = new hashTableLinkedList();
          } 
          newStorage[newIndex].insert(key, value);
        });
      }
    }

    _limit = newLimit;
    _storage = newStorage;
  };

  limitedArray.isAlmostEmpty = function() {
    return (_count < Math.floor(_limit * 0.25));
  };

  limitedArray.reduceToHalf = function() {
    limitedArray._rehash(Math.floor(_limit / 2));
  };

  limitedArray.isAlmostFull = function() {
    return _count >= (0.75 * _limit);
  };

  var _checkLimit = function(index) {
    if (typeof index !== 'number') {
      throw new Error('setter requires a numeric index for its first argument');
    }
    if (_limit <= index) {
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
