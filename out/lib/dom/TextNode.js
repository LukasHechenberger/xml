'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

var _Builder = require('../Builder');

var _Builder2 = _interopRequireDefault(_Builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextNode extends _Node2.default {

  constructor(options) {
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

  [_Builder2.default.build](options) {
    return this._text.replace(/\r?\n/, options.newline);
  }

}
exports.default = TextNode;