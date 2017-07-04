'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Builder = exports.Parser = undefined;
exports.parse = parse;
exports.build = build;

var _Parser = require('./lib/Parser');

var _Parser2 = _interopRequireDefault(_Parser);

var _Builder = require('./lib/Builder');

var _Builder2 = _interopRequireDefault(_Builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Parser = _Parser2.default;
exports.Builder = _Builder2.default;
function parse(xml, options) {
  return new _Parser2.default(options).parse(xml);
}

function build(doc, options) {
  return new _Builder2.default(options).build(doc);
}