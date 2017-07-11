import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import MyAceEditor from './component/ace-editor'

// Render editor
ReactDOM.render(
  <MyAceEditor/>,
  document.getElementById('root')
);


registerServiceWorker();
