import React from 'react';
import ReactDOM from 'react-dom';

import MyAceEditor from './component/ace_editor'

/**
 *  MyAceEditor 组件的使用和默认的展示代码
 */
const defaultCode = 
`
function setup() {
  createCanvas(720, 400);
}

function draw() {
  background(127);
  noStroke();
  for (var i = 0; i < height; i += 20) {
    fill(129, 206, 15);
    rect(0, i, width, 10);
    fill(255);
    rect(i, 0, 10, height);
  }
}
`
// Render editor
ReactDOM.render(
  <MyAceEditor defaultValue={defaultCode}/>,
  document.getElementById('root')
);
