import Node from '../../../src/lib/dom/Node';
import TextNode from '../../../src/lib/dom/TextNode';

/** @test {Node} */
describe('Node', function() {
  /** @test {Node#cloneNode} */
  describe('#cloneNode', function() {
    it('should result in a node', function() {
      const n = new Node({});

      expect(n.cloneNode(), 'to be a', Node);
    });

    it('should not inherit parent', function() {
      const n = new Node({});

      expect(n.cloneNode().parentNode, 'to be', null);
    });
  });

  /** @test {Node#textContent} */
  describe('#textContent', function() {
    it('should return empty string for empty node', function() {
      expect((new Node()).textContent, 'to be', '');
    });

    it('should return child nodes\' text content', function() {
      const n = new Node();

      n.appendChild(new TextNode({ text: 'test' }));

      expect(n.textContent, 'to equal', 'test');
    });
  });
});
