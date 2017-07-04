const build = Symbol('Builder.build');
const selfClosing = Symbol('Builder.isSelfClosing');

export default class Builder {

  static get build() { return build; }
  static get selfClosing() { return selfClosing; }

  static get defaultIndent() {
    return '  ';
  }

  static get defaultNewline() {
    return '\\n\n';
  }

  constructor(options = {}) {
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

  build(doc) {
    return doc[build](Object.assign({}, this._options, { level: 0 }));
  }

}
