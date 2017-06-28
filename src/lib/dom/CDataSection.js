import TextNode from './TextNode';
import Builder from '../Builder';

export default class CDataSection extends TextNode {

  get tagName() {
    return '#cdata';
  }

  [Builder.build](options) {
    return `<![CDATA[${super[Builder.build](options)}]]>`;
  }

}
