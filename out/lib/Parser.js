'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sax = require('sax');

var _Node = require('./dom/Node');

var _Node2 = _interopRequireDefault(_Node);

var _Document = require('./dom/Document');

var _Document2 = _interopRequireDefault(_Document);

var _Element = require('./dom/Element');

var _Element2 = _interopRequireDefault(_Element);

var _TextNode = require('./dom/TextNode');

var _TextNode2 = _interopRequireDefault(_TextNode);

var _CDataSection = require('./dom/CDataSection');

var _CDataSection2 = _interopRequireDefault(_CDataSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parsed = originalClass => class extends originalClass {

  constructor(nodeOptions, parser) {
    super(nodeOptions);

    this._position = parser.currentPosition;
  }

  get [_Node2.default.info]() {
    return Object.assign(this._position, super[_Node2.default.info]);
  }

};

const ParsedElement = parsed(_Element2.default);
const ParsedTextNode = parsed(_TextNode2.default);
const ParsedCDataSection = parsed(_CDataSection2.default);

class Parser {

  static get defaultOptions() {
    return {
      strict: true
    };
  }

  constructor(options = {}) {
    this._options = Object.assign({}, Parser.defaultOptions, options);
    this._parser = (0, _sax.parser)(this._options);

    this._parser.onprocessinginstruction = this.onProcessingInstruction.bind(this);
    this._parser.ontext = this.onText.bind(this);
    this._parser.onopentag = this.onOpenTag.bind(this);
    this._parser.onclosetag = this.onCloseTag.bind(this);
    this._parser.oncdata = this.onCData.bind(this);

    this._processingInstructions = [];
    this._currentElement = null;
    this._rootElement = null;

    // TODO: Remove
    this._indent = 0;
  }

  parse(string) {
    return new Promise((resolve, reject) => {
      this._parser.onerror = err => reject(err);

      this._parser.write(string);
      this._parser.close();

      if (this._rootElement === null) {
        reject(new Error('No document element'));
      }

      resolve(new _Document2.default({
        root: this._rootElement,
        processingInstructions: this._processingInstructions
      }));
    });
  }

  get currentPosition() {
    return {
      line: this._parser.line,
      column: this._parser.column,
      position: this._parser.position
    };
  }

  onProcessingInstruction(pi) {
    this._processingInstructions.push(pi);
  }

  onText(text) {
    if (text.trim().length > 0) {
      if (!this._currentElement) {
        throw new Error('Found text node outside an element');
      }

      this._currentElement.appendChild(new ParsedTextNode({
        parent: this._currentElement,
        text
      }, this));
    }
  }

  onOpenTag(tag) {
    const elm = new ParsedElement(Object.assign(tag, {
      parent: this._currentElement
    }), this);

    if (this._currentElement) {
      this._currentElement.appendChild(elm);
    } else {
      if (this._rootElement) {
        throw new Error('Found second root element');
      }

      this._rootElement = elm;
    }

    this._currentElement = elm;
  }

  onCloseTag() {
    this._currentElement = this._currentElement.parentNode;
  }

  onCData(cdata) {
    this._currentElement.appendChild(new ParsedCDataSection({
      parent: this._currentElement,
      text: cdata
    }, this));
  }

}
exports.default = Parser;