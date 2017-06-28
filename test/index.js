import { inspect } from 'util';
import { parse, build } from '../out/index';

parse(`<?xml version='1.0' encoding='UTF-8' standalone='no'?>
<!DOCTYPE html>
<svg xmlns:atv="http://webmi.atvise.com/2007/svgext" xmlns:xlink="http://www.w3.org/1999/xlink">
 <defs></defs>
 <metadata>
  <atv:gridconfig enabled="false" gridstyle="lines" height="20" width="20"/>
  <atv:snapconfig enabled="false" height="10" width="10"/>
 </metadata>
 <g class="main">
   <text id="id_0" font-family="Arial" atv:refpx="414.405" x="398.405" font-size="12" atv:refpy="331.346" y="335.846" fill="#000088">tesxt1</text>
   <rect id="rect" atv:refpx="515.293" stroke="#0000ff" height="27.62" x="478.178" atv:refpy="346.118" width="74.23" stroke-width="2" y="332.308" fill="#000088"/>
   <text id="id_1" font-family="Arial" atv:refpx="412.269" x="398.769" font-size="12" atv:refpy="353.702" y="358.202" fill="#000088">test2</text>
 </g>
 <text>
 inline
  <tspan>wrapped</tspan>
inline without indent
 </text>
 <script type="text/ecmascript"><![CDATA[console.log('testing!??!');
]]></script>
</svg>`)
  /* .then(doc => console.log(inspect(doc, {
    colors: true,
    depth: null,
  }))) */
  .then(doc => {
    doc.documentElement.classList.add('test');
    const tag = doc.createElement('custom');

    tag.setAttribute('attr', 13);

    doc.documentElement.appendChild(tag);
    // console.log(doc.getElementById('id_1'));
    // console.log(doc.getElementsByTagName('g'));
    // console.log(doc.getElementsByClassName('main'));

    console.log(build(doc, { indent: '··', newline: '\\r\\n\r\n' }));
  })
  .catch(e => {
    console.error(e);
  })
