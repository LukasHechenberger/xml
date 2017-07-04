'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassList = undefined;

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

var _TextNode = require('./TextNode');

var _TextNode2 = _interopRequireDefault(_TextNode);

var _Builder = require('../Builder');

var _Builder2 = _interopRequireDefault(_Builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const recursiveChildElements = Symbol('Element.recursiveChildElements');
const elementGetters = Symbol('Element.elementGetters');

class ClassList {

  constructor(element) {
    this._classes = element.className.split(' ').map(n => n.trim()).filter(n => n.length !== 0);

    this._element = element;
  }

  item(index) {
    return this._classes[index];
  }

  contains(className) {
    return this._classes.includes(className.trim());
  }

  add(...classNames) {
    classNames.forEach(name => {
      if (!this.contains(name)) {
        this._classes.push(name.trim());
      }
    });

    this._updateClassName();
  }

  _updateClassName() {
    this._element.setAttribute('class', this._classes.join(' '));
  }

}

exports.ClassList = ClassList;
class Element extends _Node2.default {

  // Symbols

  static get recursiveChildElements() {
    return recursiveChildElements;
  }
  static get elementGetters() {
    return elementGetters;
  }

  constructor(options) {
    super(options);

    this._tagName = options.name;
    this._attributes = options.attributes || {};

    // this._childNodes = [];
  }

  // Additional methods

  *[recursiveChildElements]() {
    const c = this.children;

    if (c.length === 0) {
      return;
    }

    for (let i = 0; i < c.length; i++) {
      const child = c[i];

      yield child;

      if (child.children.length) {
        yield* child[recursiveChildElements]();
      }
    }
  }

  // - Child elements

  get children() {
    return this._childNodes.filter(n => n instanceof Element);
  }

  appendChild(elm) {
    if (elm.parentNode) {
      elm.parentNode.removeChild(elm);
    }

    elm._parent = this;
    this._childNodes.push(elm);
  }

  removeChild(elm) {
    if (this._childNodes.includes(elm)) {
      elm._parent = null;
      this._childNodes = this._childNodes.filter(n => n !== elm);
    }

    return elm;
  }

  // - Attributes

  get attributes() {
    return this._attributes;
  }

  getAttribute(name) {
    return this._attributes[name] || null;
  }

  setAttribute(name, value) {
    return this._attributes[name] = value;
  }

  get className() {
    return this._attributes.class || '';
  }

  set className(className) {
    return this._attributes.class = className;
  }

  get classList() {
    return new ClassList(this);
  }

  // - Getters

  static get [elementGetters]() {
    return ['getElementById', 'getElementsByTagName', 'getElementsByClassName'];
  }

  getElementById(id) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this[recursiveChildElements]()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const node = _step.value;

        if (node.getAttribute('id') === id) {
          return node;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return null;
  }

  getElementsByTagName(tagName) {
    const result = [];

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = this[recursiveChildElements]()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        const node = _step2.value;

        if (node.tagName === tagName) {
          result.push(node);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return result;
  }

  getElementsByClassName(className) {
    const result = [];
    const name = className.trim();

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = this[recursiveChildElements]()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        const node = _step3.value;

        if (node.classList.contains(name)) {
          result.push(node);
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return result;
  }

  // Abstract node methods

  get tagName() {
    return this._tagName;
  }

  get [_Node2.default.tagInfo]() {
    let result = '';

    if (this._attributes.id) {
      result += `#${this._attributes.id}`;
    }

    if (this._attributes.class) {
      result += `.${this._attributes.class}`;
    }

    return result;
  }

  get [_Node2.default.info]() {
    return Object.keys(this._attributes).filter(n => n !== 'class' && n !== 'id').reduce((result, n) => Object.assign(result, { [n]: this._attributes[n] }), {});
  }

  // Builder

  get [_Builder2.default.selfClosing]() {
    return this._childNodes.length === 0;
  }

  [_Builder2.default.build](options) {
    const tagAttributes = Object.keys(this._attributes).map(key => `${key}="${this._attributes[key]}"`).join(' ');

    const tagContent = `${this.tagName}${tagAttributes.length ? ` ${tagAttributes}` : ''}`;

    const indent = options.indent.repeat(options.level);

    if (this[_Builder2.default.selfClosing]) {
      return `${indent}<${tagContent} />`;
    }

    const childOptions = Object.assign({}, options, {
      level: options.level + 1
    });

    return `${indent}<${tagContent}>${this._childNodes.map((node, index, array) => {
      let str = node[_Builder2.default.build](childOptions);
      const isTextNode = node instanceof _TextNode2.default;

      if (isTextNode) {
        return str;
      }

      if (index === 0) {
        str = `${options.newline}${str}`;
      }

      if (index > 0 && array[index - 1] instanceof _TextNode2.default) {
        str = str.replace(/^\s*/, '');
      }

      if (index < array.length - 1 && array[index - 1] instanceof _TextNode2.default) {
        return str;
      }

      if (index === array.length - 1) {
        return `${str}${options.newline}${indent}`;
      }

      return `${str}${options.newline}`;
    }).join('')}</${this.tagName}>`;
  }

}
exports.default = Element;