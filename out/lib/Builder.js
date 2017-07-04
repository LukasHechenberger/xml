'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _prettifyXml = require('prettify-xml');

var _prettifyXml2 = _interopRequireDefault(_prettifyXml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _build = Symbol('Builder.build');
var selfClosing = Symbol('Builder.isSelfClosing');

var Builder = function () {
  _createClass(Builder, null, [{
    key: 'build',
    get: function get() {
      return _build;
    }
  }, {
    key: 'selfClosing',
    get: function get() {
      return selfClosing;
    }
  }, {
    key: 'defaultIndent',
    get: function get() {
      return '  ';
    }
  }, {
    key: 'defaultNewline',
    get: function get() {
      return '\\n\n';
    }
  }]);

  function Builder() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Builder);

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

  _createClass(Builder, [{
    key: 'build',
    value: function build(doc) {
      var xml = doc[_build](Object.assign({}, this._options, { level: 0 }));

      /* if (this._options) {
        return prettify(xml, this._options);
      } */

      return xml;
    }
  }]);

  return Builder;
}();

exports.default = Builder;