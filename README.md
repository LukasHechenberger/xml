# @ls-age/xml

> Modify XML documents in node.js with ease

[![CircleCI](https://circleci.com/gh/ls-age/xml.svg?style=svg)](https://circleci.com/gh/ls-age/xml) [![Greenkeeper badge](https://badges.greenkeeper.io/ls-age/xml.svg)](https://greenkeeper.io/)

An XML parsing, manipulation and serialization library. Implements some very basic DOM APIs *(By far not complete)*.

## Installation

As always, run `npm install [--save] @ls-age/xml` to install.

## Usage

A basic example that parses an xml string, manipulates it and logs it's xml string again:

```javascript
import { parse, build } from '@ls-age/xml';

parse(`<?xml version="1.0" ?>
<root>
  <content>content</content>
</root>`)
  .then(doc => {
    doc.documentElement.getElementsByTagName('content')[0].setAttribute('test', 'value');
    doc.documentElement.appendChild(doc.createElement('another'));
    
    console.log(build(doc, {
      indent: ' ',
      newline: '\r\n',
    }));
  });

/* Prints:
<?xml version="1.0" ?>\r\n
<root>\r\n
 <content test="value">content</content>\r\n
 <another />\r\n
</root>
*/
```
