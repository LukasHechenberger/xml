'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _Builder = require('../Builder');

var _Builder2 = _interopRequireDefault(_Builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tagInfo = Symbol('Node.tagInfo');
const info = Symbol('Node.info');
const recursiveChildNodes = Symbol('Node.recursiveChildNodes');

class Node {

  // Symbols

  static get tagInfo() {
    return tagInfo;
  }
  static get info() {
    return info;
  }
  static get recursiveChildNodes() {
    return recursiveChildNodes;
  }

  constructor(options) {
    this._parent = options.parent;
    this._childNodes = [];
  }

  get parentNode() {
    return this._parent;
  }

  cloneNode() {
    return Object.assign(Object.create(this), this, {
      _parent: null
    });
  }

  *[recursiveChildNodes]() {
    if (!this._childNodes) {
      return;
    }

    for (let i = 0; i < this._childNodes.length; i++) {
      const child = this._childNodes[i];
      yield child;

      if (child._childNodes.length) {
        yield* child[recursiveChildNodes]();
      }
    }
  }

  // Abstract

  get tagName() {
    throw new Error('Must be implemented by all subclasses');
  }

  get [tagInfo]() {
    return '';
  }

  get [info]() {
    return {};
  }

  // Builder

  [_Builder2.default.build]() {
    throw new Error('Must be implemented by all subclasses');
  }

  // Inspect

  [_util.inspect.custom](depth, options) {
    const start = `${options.stylize(this.tagName, 'special')}${options.stylize(this[tagInfo], 'date')} ${(0, _util.inspect)(this[info], {
      breakLength: Infinity,
      colors: options.colors
    })}`;

    if (depth === null || depth >= 0) {
      const newOptions = Object.assign({}, options, {
        depth: options.depth === null ? null : options.depth - 1
      });

      const c = this._childNodes.map(n => (0, _util.inspect)(n, newOptions)).join('\n');

      return `${start}${c ? `\n${c}`.replace(/\n/g, '\n  ') : ''}`;
    }

    return start;
  }

}
exports.default = Node;