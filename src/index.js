import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import ViewEditor from './component/view_editor'

// Render editor
ReactDOM.render(
  <ViewEditor/>,
  document.getElementById('root')
);


registerServiceWorker();
