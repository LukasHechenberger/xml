import Node from '../../../src/lib/dom/Node';

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
});
