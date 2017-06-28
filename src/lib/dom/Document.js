import Node from './Node';
import Element from './Element';
import Builder from './../Builder';

export default class Document extends Node {

  constructor(options) {
    super(options);

    this._processingInstructions = options.processingInstructions || [];
    this._documentElement = options.root;
    this._childNodes = [options.root];

    // Add document element getters

    Element[Element.elementGetters].forEach(name => {
      this[name] = Element.prototype[name].bind(this._documentElement);
    });
  }

  // Additional methods

  get documentElement() {
    return this._documentElement;
  }

  createElement(name) {
    return new Element({ name });
  }

  // Abstract Node methods

  get tagName() {
    return '#document';
  }

  get [Node.info]() {
    return this._processingInstructions
      .reduce((result, { name, body }) => Object.assign(result, { [name]: body }), {});
  }

  // Builder

  [Builder.build](options) {
    const pis = this._processingInstructions
      .map(({ name, body }) => `<?${name} ${body}?>`);

    return `${pis}${options.newline}${this._documentElement[Builder.build](options)}`;
  }

}
