import Parser from './lib/Parser';
import Builder from './lib/Builder';

export { Parser, Builder };

export function parse(xml, options) {
  return (new Parser(options)).parse(xml);
}

export function build(doc, options) {
  return (new Builder(options)).build(doc);
}
