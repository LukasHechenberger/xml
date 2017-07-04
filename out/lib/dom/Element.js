'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Node2 = require('./Node');

var _Node3 = _interopRequireDefault(_Node2);

var _TextNode = require('./TextNode');

var _TextNode2 = _interopRequireDefault(_TextNode);

var _Builder = require('../Builder');

var _Builder2 = _interopRequireDefault(_Builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var recursiveChildElements = Symbol('Element.recursiveChildElements');
var elementGetters = Symbol('Element.elementGetters');

var ClassList = exports.ClassList = function () {
  function ClassList(element) {
    _classCallCheck(this, ClassList);

    this._classes = element.className.split(' ').map(function (n) {
      return n.trim();
    }).filter(function (n) {
      return n.length !== 0;
    });

    this._element = element;
  }

  _createClass(ClassList, [{
    key: 'item',
    value: function item(index) {
      return this._classes[index];
    }
  }, {
    key: 'contains',
    value: function contains(className) {
      return this._classes.includes(className.trim());
    }
  }, {
    key: 'add',
    value: function add() {
      var _this = this;

      for (var _len = arguments.length, classNames = Array(_len), _key = 0; _key < _len; _key++) {
        classNames[_key] = arguments[_key];
      }

      classNames.forEach(function (name) {
        if (!_this.contains(name)) {
          _this._classes.push(name.trim());
        }
      });

      this._updateClassName();
    }
  }, {
    key: '_updateClassName',
    value: function _updateClassName() {
      this._element.setAttribute('class', this._classes.join(' '));
    }
  }]);

  return ClassList;
}();

var Element = function (_Node) {
  _inherits(Element, _Node);

  _createClass(Element, null, [{
    key: 'recursiveChildElements',


    // Symbols

    get: function get() {
      return recursiveChildElements;
    }
  }, {
    key: 'elementGetters',
    get: function get() {
      return elementGetters;
    }
  }]);

  function Element(options) {
    _classCallCheck(this, Element);

    var _this2 = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this, options));

    _this2._tagName = options.name;
    _this2._attributes = options.attributes || {};

    // this._childNodes = [];
    return _this2;
  }

  // Additional methods

  _createClass(Element, [{
    key: recursiveChildElements,
    value: regeneratorRuntime.mark(function value() {
      var c, i, child;
      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              c = this.children;

              if (!(c.length === 0)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return');

            case 3:
              i = 0;

            case 4:
              if (!(i < c.length)) {
                _context.next = 13;
                break;
              }

              child = c[i];
              _context.next = 8;
              return child;

            case 8:
              if (!child.children.length) {
                _context.next = 10;
                break;
              }

              return _context.delegateYield(child[recursiveChildElements](), 't0', 10);

            case 10:
              i++;
              _context.next = 4;
              break;

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, value, this);
    })

    // - Child elements

  }, {
    key: 'appendChild',
    value: function appendChild(elm) {
      if (elm.parentNode) {
        elm.parentNode.removeChild(elm);
      }

      elm._parent = this;
      this._childNodes.push(elm);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(elm) {
      if (this._childNodes.includes(elm)) {
        elm._parent = null;
        this._childNodes = this._childNodes.filter(function (n) {
          return n !== elm;
        });
      }

      return elm;
    }

    // - Attributes

  }, {
    key: 'getAttribute',
    value: function getAttribute(name) {
      return this._attributes[name] || null;
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(name, value) {
      return this._attributes[name] = value;
    }
  }, {
    key: 'getElementById',
    value: function getElementById(id) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this[recursiveChildElements]()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;

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
  }, {
    key: 'getElementsByTagName',
    value: function getElementsByTagName(tagName) {
      var result = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this[recursiveChildElements]()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var node = _step2.value;

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
  }, {
    key: 'getElementsByClassName',
    value: function getElementsByClassName(className) {
      var result = [];
      var name = className.trim();

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this[recursiveChildElements]()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var node = _step3.value;

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

  }, {
    key: _Builder2.default.build,
    value: function value(options) {
      var _this3 = this;

      var tagAttributes = Object.keys(this._attributes).map(function (key) {
        return key + '="' + _this3._attributes[key] + '"';
      }).join(' ');

      var tagContent = '' + this.tagName + (tagAttributes.length ? ' ' + tagAttributes : '');

      var indent = options.indent.repeat(options.level);

      if (this[_Builder2.default.selfClosing]) {
        return indent + '<' + tagContent + ' />';
      }

      var childOptions = Object.assign({}, options, {
        level: options.level + 1
      });

      return indent + '<' + tagContent + '>' + this._childNodes.map(function (node, index, array) {
        var str = node[_Builder2.default.build](childOptions);
        var isTextNode = node instanceof _TextNode2.default;

        if (isTextNode) {
          return str;
        }

        if (index === 0) {
          str = '' + options.newline + str;
        }

        if (index > 0 && array[index - 1] instanceof _TextNode2.default) {
          str = str.replace(/^\s*/, '');
        }

        if (index < array.length - 1 && array[index - 1] instanceof _TextNode2.default) {
          return str;
        }

        if (index === array.length - 1) {
          return '' + str + options.newline + indent;
        }

        return '' + str + options.newline;
      }).join('') + '</' + this.tagName + '>';
    }
  }, {
    key: 'children',
    get: function get() {
      return this._childNodes.filter(function (n) {
        return n instanceof Element;
      });
    }
  }, {
    key: 'attributes',
    get: function get() {
      return this._attributes;
    }
  }, {
    key: 'className',
    get: function get() {
      return this._attributes.class || '';
    },
    set: function set(className) {
      return this._attributes.class = className;
    }
  }, {
    key: 'classList',
    get: function get() {
      return new ClassList(this);
    }

    // - Getters

  }, {
    key: 'tagName',
    get: function get() {
      return this._tagName;
    }
  }, {
    key: _Node3.default.tagInfo,
    get: function get() {
      var result = '';

      if (this._attributes.id) {
        result += '#' + this._attributes.id;
      }

      if (this._attributes.class) {
        result += '.' + this._attributes.class;
      }

      return result;
    }
  }, {
    key: _Node3.default.info,
    get: function get() {
      var _this4 = this;

      return Object.keys(this._attributes).filter(function (n) {
        return n !== 'class' && n !== 'id';
      }).reduce(function (result, n) {
        return Object.assign(result, _defineProperty({}, n, _this4._attributes[n]));
      }, {});
    }

    // Builder

  }, {
    key: _Builder2.default.selfClosing,
    get: function get() {
      return this._childNodes.length === 0;
    }
  }], [{
    key: elementGetters,
    get: function get() {
      return ['getElementById', 'getElementsByTagName', 'getElementsByClassName'];
    }
  }]);

  return Element;
}(_Node3.default);

exports.default = Element;