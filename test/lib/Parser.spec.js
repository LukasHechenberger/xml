import Parser from '../../src/lib/Parser';

/** @test {Parser} */
describe('Parser', function() {
  /** @test {Parser#parse} */
  describe('#parse', function() {
    it('should fail without document element', function() {
      return expect((new Parser()).parse(null), 'to be rejected with', 'No document element');
    });

    it('should forward parser errors', function() {
      return expect((new Parser()).parse('asdf'), 'to be rejected with',
        /Non-whitespace before first tag/);
    });

    it('should fail with second root element', function() {
      return expect((new Parser()).parse('<root></root><another></another>'), 'to be rejected with',
        /second root element/);
    });

    it('should return document instance if everything worked', function() {
      return expect((new Parser()).parse('<root><tag>content</tag></root>'), 'to be fulfilled');
    });
  });
});
