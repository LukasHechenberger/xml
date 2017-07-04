'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prettifyXml = require('prettify-xml');

var _prettifyXml2 = _interopRequireDefault(_prettifyXml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const build = Symbol('Builder.build');
const selfClosing = Symbol('Builder.isSelfClosing');

class Builder {

  static get build() {
    return build;
  }
  static get selfClosing() {
    return selfClosing;
  }

  static get defaultIndent() {
    return '  ';
  }

  static get defaultNewline() {
    return '\\n\n';
  }

  constructor(options = {}) {
    this._options = options;

    if (this._options.indent === undefined) {
      this._options.indent = this.constructor.defaultIndent;
    } else if (typeof options.indent === 'number') {
      this._options.indent = ' '.repeat(options.indent);
    }

    if (this._options.newline === undefined) {
      this._options.newline = this.constructor.defaultNewline;
    }
  }

  build(doc) {
    const xml = doc[build](Object.assign({}, this._options, { level: 0 }));

    /* if (this._options) {
      return prettify(xml, this._options);
    } */

    return xml;
  }

}
exports.default = Builder;