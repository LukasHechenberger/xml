'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

var _Element = require('./Element');

var _Element2 = _interopRequireDefault(_Element);

var _Builder = require('./../Builder');

var _Builder2 = _interopRequireDefault(_Builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Document extends _Node2.default {

  constructor(options) {
    super(options);

    this._processingInstructions = options.processingInstructions || [];
    this._documentElement = options.root;
    this._childNodes = [options.root];

    // Add document element getters

    _Element2.default[_Element2.default.elementGetters].forEach(name => {
      this[name] = _Element2.default.prototype[name].bind(this._documentElement);
    });
  }

  // Additional methods

  get documentElement() {
    return this._documentElement;
  }

  createElement(name) {
    return new _Element2.default({ name });
  }

  // Abstract Node methods

  get tagName() {
    return '#document';
  }

  get [_Node2.default.info]() {
    return this._processingInstructions.reduce((result, { name, body }) => Object.assign(result, { [name]: body }), {});
  }

  // Builder

  [_Builder2.default.build](options) {
    const pis = this._processingInstructions.map(({ name, body }) => `<?${name} ${body}?>`);

    return `${pis}${options.newline}${this._documentElement[_Builder2.default.build](options)}`;
  }

}
exports.default = Document;