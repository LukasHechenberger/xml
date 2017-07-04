import Node from './Node';
import Builder from '../Builder';

export default class TextNode extends Node {

  constructor(options = {}) {
    super(options);

    this._text = options.text;
  }

  // TODO: Remove
  get textContent() {
    return this._text;
  }

  // Abstract node methods

  get tagName() {
    return '#text';
  }

  // Builder

  [Builder.build](options) {
    return this._text.replace(/\r?\n/, options.newline);
  }

}
