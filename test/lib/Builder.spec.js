import Builder from '../../src/lib/Builder';

/** @test {Builder} */
describe('Builder', function() {
  /** @test {Builder#build} */
  describe('#build', function() {
    const builder = (new Builder());

    it('should fail without document', function() {
      return expect(builder.build.bind(builder, null), 'to throw', 'Not a document instance');
    });

    it('should fail with non-document passed', function() {
      return expect(builder.build.bind(builder, {}), 'to throw', 'Not a document instance');
    });
  });
});
