import Document from '../../../src/lib/dom/Document';

/** @test {Document} */
describe('Document', function() {
  /** @test {Document#textContent} */
  describe('#textContent', function() {
    it('should return null', function() {
      expect((new Document()).textContent, 'to be', null);
    });
  });
});
