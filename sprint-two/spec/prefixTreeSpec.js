describe('prefixTree', function() {
  var prefixTree;

  beforeEach(function() {
    prefixTree = new PrefixTree('');
  });

  it('should have methods named "addString", "checkString" and "removeString"', function() {
    expect(prefixTree.addString).to.be.a('function');
    expect(prefixTree.checkString).to.be.a('function');
    expect(prefixTree.removeString).to.be.a('function');
  });

  it('should add and check strings to the prefix tree', function() {
    prefixTree.addString('hello');
    prefixTree.addString('world');
    prefixTree.addString('help');
    expect(prefixTree.checkString('hello')).to.equal(true);
    expect(prefixTree.checkString('world')).to.equal(true);
    expect(prefixTree.checkString('help')).to.equal(true);
    expect(prefixTree.checkString('no')).to.equal(false);
  });

  it('should return false for strings not in the prefixTree', function() {
    prefixTree.addString('helpline');
    prefixTree.addString('world');
    expect(prefixTree.checkString('help')).to.equal(false);
  });

  it('should remove a word from the prefic tree', function() {
    prefixTree.addString('helpline');
    prefixTree.addString('world');
    prefixTree.removeString('world');
    expect(prefixTree.checkString('world')).to.equal(false);
  });

});