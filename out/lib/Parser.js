'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var parsed = function parsed(originalClass) {
  return function (_originalClass) {
    _inherits(_class, _originalClass);

    function _class(nodeOptions, parser) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, nodeOptions));

      _this._position = parser.currentPosition;
      return _this;
    }

    _createClass(_class, [{
      key: _Node2.default.info,
      get: function get() {
        return Object.assign(this._position, _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), _Node2.default.info, this));
      }
    }]);

    return _class;
  }(originalClass);
};

var ParsedElement = parsed(_Element2.default);
var ParsedTextNode = parsed(_TextNode2.default);
var ParsedCDataSection = parsed(_CDataSection2.default);

var Parser = function () {
  function Parser() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Parser);

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

  _createClass(Parser, [{
    key: 'parse',
    value: function parse(string) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2._parser.onerror = function (err) {
          return reject(err);
        };

        _this2._parser.write(string);
        _this2._parser.close();

        resolve(new _Document2.default({
          root: _this2._rootElement,
          processingInstructions: _this2._processingInstructions
        }));
      });
    }
  }, {
    key: 'onProcessingInstruction',
    value: function onProcessingInstruction(pi) {
      this._processingInstructions.push(pi);
      console.log('<?' + pi.name, pi.body, '?>');
    }
  }, {
    key: 'onText',
    value: function onText(text) {
      if (text.trim().length > 0) {
        if (!this._currentElement) {
          throw new Error('Found text node outside an element');
        }

        this._currentElement.appendChild(new ParsedTextNode({
          parent: this._currentElement,
          text: text
        }, this));

        console.log('  '.repeat(this._indent) + '#text');
      }
      // console.log('TEXT', text);
    }
  }, {
    key: 'onOpenTag',
    value: function onOpenTag(tag) {
      var elm = new ParsedElement(Object.assign(tag, {
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
      console.log('  '.repeat(this._indent++) + '<' + tag.name + '>');
    }
  }, {
    key: 'onCloseTag',
    value: function onCloseTag(tag) {
      this._currentElement = this._currentElement.parentNode;
      console.log('  '.repeat(--this._indent) + '</' + tag + '>');
    }
  }, {
    key: 'onCData',
    value: function onCData(cdata) {
      this._currentElement.appendChild(new ParsedCDataSection({
        parent: this._currentElement,
        text: cdata
      }, this));
      console.log('  '.repeat(this._indent) + '#cdata', cdata);
    }
  }, {
    key: 'currentPosition',
    get: function get() {
      return {
        line: this._parser.line,
        column: this._parser.column,
        position: this._parser.position
      };
    }
  }]);

  return Parser;
}();

exports.default = Parser;