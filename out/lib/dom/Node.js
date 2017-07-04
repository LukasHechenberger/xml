'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('util');

var _Builder = require('../Builder');

var _Builder2 = _interopRequireDefault(_Builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tagInfo = Symbol('Node.tagInfo');
var info = Symbol('Node.info');
var recursiveChildNodes = Symbol('Node.recursiveChildNodes');

var Node = function () {
  _createClass(Node, null, [{
    key: 'tagInfo',


    // Symbols

    get: function get() {
      return tagInfo;
    }
  }, {
    key: 'info',
    get: function get() {
      return info;
    }
  }, {
    key: 'recursiveChildNodes',
    get: function get() {
      return recursiveChildNodes;
    }
  }]);

  function Node(options) {
    _classCallCheck(this, Node);

    this._parent = options.parent;
    this._childNodes = [];
  }

  _createClass(Node, [{
    key: recursiveChildNodes,
    value: regeneratorRuntime.mark(function value() {
      var i, child;
      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this._childNodes) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              i = 0;

            case 3:
              if (!(i < this._childNodes.length)) {
                _context.next = 12;
                break;
              }

              child = this._childNodes[i];
              _context.next = 7;
              return child;

            case 7:
              if (!child._childNodes.length) {
                _context.next = 9;
                break;
              }

              return _context.delegateYield(child[recursiveChildNodes](), 't0', 9);

            case 9:
              i++;
              _context.next = 3;
              break;

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, value, this);
    })

    // Abstract

  }, {
    key: _Builder2.default.build,


    // Builder

    value: function value() {
      throw new Error('Must be implemented by all subclasses');
    }

    // Inspect

  }, {
    key: _util.inspect.custom,
    value: function value(depth, options) {
      var start = '' + options.stylize(this.tagName, 'special') + options.stylize(this[tagInfo], 'date') + ' ' + (0, _util.inspect)(this[info], {
        breakLength: Infinity,
        colors: options.colors
      });

      if (depth === null || depth >= 0) {
        var newOptions = Object.assign({}, options, {
          depth: options.depth === null ? null : options.depth - 1
        });

        var c = this._childNodes.map(function (n) {
          return (0, _util.inspect)(n, newOptions);
        }).join('\n');

        return '' + start + (c ? ('\n' + c).replace(/\n/g, '\n  ') : '');
      }

      return start;
    }
  }, {
    key: 'parentNode',
    get: function get() {
      return this._parent;
    }
  }, {
    key: 'tagName',
    get: function get() {
      throw new Error('Must be implemented by all subclasses');
    }
  }, {
    key: tagInfo,
    get: function get() {
      return '';
    }
  }, {
    key: info,
    get: function get() {
      return {};
    }
  }]);

  return Node;
}();

exports.default = Node;