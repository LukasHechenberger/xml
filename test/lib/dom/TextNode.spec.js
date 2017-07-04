import TextNode from '../../../src/lib/dom/TextNode';

/** @test {TextNode} */
describe('TextNode', function() {
  /** @test {TextNode#textContent} */
  describe('#textContent', function() {
    it('should return text content', function() {
      expect((new TextNode({ text: 'test' })).textContent, 'to equal', 'test');
    });
  });
});
