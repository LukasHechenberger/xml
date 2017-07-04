'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TextNode = require('./TextNode');

var _TextNode2 = _interopRequireDefault(_TextNode);

var _Builder = require('../Builder');

var _Builder2 = _interopRequireDefault(_Builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CDataSection extends _TextNode2.default {

  get tagName() {
    return '#cdata';
  }

  [_Builder2.default.build](options) {
    return `<![CDATA[${super[_Builder2.default.build](options)}]]>`;
  }

}
exports.default = CDataSection;