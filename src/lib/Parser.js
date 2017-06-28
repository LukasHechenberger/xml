import { parser as createParser } from 'sax';
import Node from './dom/Node';
import Document from './dom/Document';
import Element from './dom/Element';
import TextNode from './dom/TextNode';
import CDataSection from './dom/CDataSection';

const parsed = originalClass => class extends originalClass {

  constructor(nodeOptions, parser) {
    super(nodeOptions);

    this._position = parser.currentPosition;
  }

  get [Node.info]() {
    return Object.assign(this._position, super[Node.info]);
  }

};

const ParsedElement = parsed(Element);
const ParsedTextNode = parsed(TextNode);
const ParsedCDataSection = parsed(CDataSection);

export default class Parser {

  constructor(options = {}) {
    this._options = Object.assign({}, Parser.defaultOptions, options);
    this._parser = createParser(this._options);

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

  parse(string) {
    return new Promise((resolve, reject) => {
      this._parser.onerror = err => reject(err);

      this._parser.write(string);
      this._parser.close();

      resolve(new Document({
        root: this._rootElement,
        processingInstructions: this._processingInstructions,
      }));
    });
  }

  get currentPosition() {
    return {
      line: this._parser.line,
      column: this._parser.column,
      position: this._parser.position,
    };
  }

  onProcessingInstruction(pi) {
    this._processingInstructions.push(pi);
    console.log('<?' + pi.name, pi.body, '?>');
  }

  onText(text) {
    if (text.trim().length > 0) {
      if (!this._currentElement) {
        throw new Error('Found text node outside an element');
      }

      this._currentElement.appendChild(new ParsedTextNode({
        parent: this._currentElement,
        text,
      }, this));

      console.log('  '.repeat(this._indent) + '#text');
    }
    // console.log('TEXT', text);
  }

  onOpenTag(tag) {
    const elm = new ParsedElement(Object.assign(tag, {
      parent: this._currentElement,
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

  onCloseTag(tag) {
    this._currentElement = this._currentElement.parentNode;
    console.log('  '.repeat(--this._indent) + '</' + tag + '>');
  }

  onCData(cdata) {
    this._currentElement.appendChild(new ParsedCDataSection({
      parent: this._currentElement,
      text: cdata,
    }, this));
    console.log('  '.repeat(this._indent) + '#cdata', cdata);
  }

}
