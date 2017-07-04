import Node from './Node';
import TextNode from './TextNode';
import Builder from '../Builder';

const recursiveChildElements = Symbol('Element.recursiveChildElements');
const elementGetters = Symbol('Element.elementGetters');

export class ClassList {

  constructor(element) {
    this._classes = element.className.split(' ')
      .map(n => n.trim())
      .filter(n => n.length !== 0);

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

export default class Element extends Node {

  // Symbols

  static get recursiveChildElements() { return recursiveChildElements; }
  static get elementGetters() { return elementGetters; }

  constructor(options = {}) {
    super(options);

    this._tagName = options.name;
    this._attributes = options.attributes || {};

    // this._childNodes = [];
  }

  // Additional methods

  * [recursiveChildElements]() {
    const c = this.children;

    if (c.length === 0) { return; }

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
    return this._childNodes.filter(n => (n instanceof Element));
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
    return (this._attributes[name] = value);
  }

  get className() {
    return this._attributes.class || '';
  }

  set className(className) {
    return (this._attributes.class = className);
  }

  get classList() {
    return new ClassList(this);
  }

  // - Getters

  static get [elementGetters]() {
    return ['getElementById', 'getElementsByTagName', 'getElementsByClassName'];
  }

  getElementById(id) {
    for (const node of this[recursiveChildElements]()) {
      if (node.getAttribute('id') === id) {
        return node;
      }
    }

    return null;
  }

  getElementsByTagName(tagName) {
    const result = [];

    for (const node of this[recursiveChildElements]()) {
      if (node.tagName === tagName) {
        result.push(node);
      }
    }

    return result;
  }

  getElementsByClassName(className) {
    const result = [];
    const name = className.trim();

    for (const node of this[recursiveChildElements]()) {
      if (node.classList.contains(name)) {
        result.push(node);
      }
    }

    return result;
  }

  // Abstract node methods

  get tagName() {
    return this._tagName;
  }

  get [Node.tagInfo]() {
    let result = '';

    if (this._attributes.id) {
      result += `#${this._attributes.id}`;
    }

    if (this._attributes.class) {
      result += `.${this._attributes.class}`;
    }

    return result;
  }

  get [Node.info]() {
    return Object.keys(this._attributes)
      .filter(n => n !== 'class' && n !== 'id')
      .reduce((result, n) => Object.assign(result, { [n]: this._attributes[n] }), {});
  }

  // Builder

  get [Builder.selfClosing]() {
    return this._childNodes.length === 0;
  }

  [Builder.build](options) {
    const tagAttributes = Object.keys(this._attributes)
      .map(key => `${key}="${this._attributes[key]}"`)
      .join(' ');

    const tagContent = `${this.tagName}${tagAttributes.length ? ` ${tagAttributes}` : ''}`;

    const indent = options.indent.repeat(options.level);

    if (this[Builder.selfClosing]) {
      return `${indent}<${tagContent} />`;
    }

    const childOptions = Object.assign({}, options, {
      level: options.level + 1,
    });

    return `${indent}<${tagContent}>${this._childNodes
      .map((node, index, array) => {
        let str = node[Builder.build](childOptions);
        const isTextNode = (node instanceof TextNode);

        if (isTextNode) {
          return str;
        }

        if (index === 0) {
          str = `${options.newline}${str}`;
        }

        if (index > 0 && (array[index - 1] instanceof TextNode)) {
          str = str.replace(/^\s*/, '');
        }

        if (index < (array.length - 1) && (array[index - 1] instanceof TextNode)) {
          return str;
        }

        if (index === array.length - 1) {
          return `${str}${options.newline}${indent}`;
        }

        return `${str}${options.newline}`;
      })
      .join('')
    }</${this.tagName}>`;
  }

}
