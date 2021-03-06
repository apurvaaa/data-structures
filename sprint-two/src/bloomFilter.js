var BloomFilter = function(_m, _k) {
  
  // _m = 18, _k = 3
  this._bitVector = _.range(0, _m).map(function(item) { return 0; });
  this._m = _m;  // max = 18
  this._k = _k;  // _k = 3 
  this._seed = 7919;
  this._hashFunctions = [this._hash1.bind(this), this._hash2.bind(this), this._hash3.bind(this)];
  var bv = this;
  if (_k > 3) {
    for (i = 3; i < _k; i++) {
      //hashi(x, _m) = (hasha(x) + i × hashb(x)) mod _m
      this._hashFunctions.push(this.newHashFunction(i).bind(this));
    }
  }


};

BloomFilter.prototype.newHashFunction = function(i) {
  return function(str) {
    return (this._hashFunctions[0](str) + i * this._hashFunctions[1](str, this._seed)) % this._m;
  };
};

BloomFilter.prototype.add = function(str) {
  var indices = this._getIndices(str);
  this._setBitsOn(indices);
};

BloomFilter.prototype.check = function(str) {
  var indices = this._getIndices(str);
  return this._checkBits(indices);
};

BloomFilter.prototype._getIndices = function(str) {
  var indices = [];
  for (i = 0; i < this._k; i++) {
    indices.push(this._hashFunctions[i](str, this._seed));

  }
  return indices;
};

BloomFilter.prototype._setBitsOn = function(indices) {
  for (var i = 0; i < indices.length; i++) {
    this._bitVector[indices[i]] = 1;
  }
};

BloomFilter.prototype._checkBits = function(indices) {
  for (var i = 0; i < indices.length; i++) {
    if (this._bitVector[indices[i]] === 0) {
      return false;
    }
  }
  return true;
};

BloomFilter.prototype._hash1 = function(str) {
  var hash = 0;

  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % this._m;
};


BloomFilter.prototype._hash2 = function(str, _seed) {

  var l = str.length;
  var h = _seed ^ l;
  var i = 0;
  var _k;
  
  while (l >= 4) {
    _k = 
      ((str.charCodeAt(i) & 0xff)) |
      ((str.charCodeAt(++i) & 0xff) << 8) |
      ((str.charCodeAt(++i) & 0xff) << 16) |
      ((str.charCodeAt(++i) & 0xff) << 24);
    
    _k = (((_k & 0xffff) * 0x5bd1e995) + ((((_k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
    _k ^= _k >>> 24;
    _k = (((_k & 0xffff) * 0x5bd1e995) + ((((_k >>> 16) * 0x5bd1e995) & 0xffff) << 16));

    h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ _k;

    l -= 4;
    ++i;
  }
  
  switch (l) {
  case 3: h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
  case 2: h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
  case 1: h ^= (str.charCodeAt(i) & 0xff);
    h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
  }

  h ^= h >>> 13;
  h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
  h ^= h >>> 15;

  return (h >>> 0) % this._m;

};

BloomFilter.prototype._hash3 = function(key, _seed) {

  var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;
  
  remainder = key.length & 3; // key.length % 4
  bytes = key.length - remainder;
  h1 = _seed;
  c1 = 0xcc9e2d51;
  c2 = 0x1b873593;
  i = 0;
  
  while (i < bytes) {
    k1 = 
    ((key.charCodeAt(i) & 0xff)) |
    ((key.charCodeAt(++i) & 0xff) << 8) |
    ((key.charCodeAt(++i) & 0xff) << 16) |
    ((key.charCodeAt(++i) & 0xff) << 24);
    ++i;
    
    k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
    h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
    h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
  }
  
  k1 = 0;
  
  switch (remainder) {
  case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
  case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
  case 1: k1 ^= (key.charCodeAt(i) & 0xff);
    
    k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
    h1 ^= k1;
  }
  
  h1 ^= key.length;

  h1 ^= h1 >>> 16;
  h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
  h1 ^= h1 >>> 16;

  return (h1 >>> 0) % this._m;
};

