describe('bloomFilter', function() {
  var bloomFilter;

  beforeEach(function() {
    bloomFilter = new BloomFilter(18, 3);
  });

  it('should have methods named "add", "check", "getIndices", "setBitsOn" and "checkBits"', function() {
    expect(bloomFilter.add).to.be.a('function');
    expect(bloomFilter.check).to.be.a('function');
    expect(bloomFilter._getIndices).to.be.a('function');
    expect(bloomFilter._setBitsOn).to.be.a('function');
    expect(bloomFilter._checkBits).to.be.a('function');
  });

  it('should add values into the bloomFilter', function() {
    bloomFilter.add('hello');
    bloomFilter.add('world');
    expect(bloomFilter.check('hello')).to.equal(true);
    expect(bloomFilter.check('world')).to.equal(true);
    
  });

  it('should add values into the bloomFilter with k > 3, m >18', function() {
    bloomFilter = new BloomFilter(25, 5);

    bloomFilter.add('hello');
    bloomFilter.add('world');
    expect(bloomFilter.check('hello')).to.equal(true);
    expect(bloomFilter.check('world')).to.equal(true);

  });
});