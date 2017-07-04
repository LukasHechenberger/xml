'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Node2 = require('./Node');

var _Node3 = _interopRequireDefault(_Node2);

var _Element = require('./Element');

var _Element2 = _interopRequireDefault(_Element);

var _Builder = require('./../Builder');

var _Builder2 = _interopRequireDefault(_Builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_Node) {
  _inherits(Document, _Node);

  function Document(options) {
    _classCallCheck(this, Document);

    var _this = _possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).call(this, options));

    _this._processingInstructions = options.processingInstructions || [];
    _this._documentElement = options.root;
    _this._childNodes = [options.root];

    // Add document element getters

    _Element2.default[_Element2.default.elementGetters].forEach(function (name) {
      _this[name] = _Element2.default.prototype[name].bind(_this._documentElement);
    });
    return _this;
  }

  // Additional methods

  _createClass(Document, [{
    key: 'createElement',
    value: function createElement(name) {
      return new _Element2.default({ name: name });
    }

    // Abstract Node methods

  }, {
    key: _Builder2.default.build,


    // Builder

    value: function value(options) {
      var pis = this._processingInstructions.map(function (_ref) {
        var name = _ref.name,
            body = _ref.body;
        return '<?' + name + ' ' + body + '?>';
      });

      return '' + pis + options.newline + this._documentElement[_Builder2.default.build](options);
    }
  }, {
    key: 'documentElement',
    get: function get() {
      return this._documentElement;
    }
  }, {
    key: 'tagName',
    get: function get() {
      return '#document';
    }
  }, {
    key: _Node3.default.info,
    get: function get() {
      return this._processingInstructions.reduce(function (result, _ref2) {
        var name = _ref2.name,
            body = _ref2.body;
        return Object.assign(result, _defineProperty({}, name, body));
      }, {});
    }
  }]);

  return Document;
}(_Node3.default);

exports.default = Document;