import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/mode/matlab';
import 'brace/theme/github';
/*eslint-disable no-alert, no-console */
import 'brace/ext/language_tools';
import 'brace/snippets/javascript';
import 'brace/snippets/python';
import 'brace/snippets/matlab';
// import 'brace/ext/searchbox';

// Render editor
ReactDOM.render(
  <AceEditor
    mode="python"
    theme="github"
    name="UNIQUE_ID_OF_DIV"
    editorProps={{$blockScrolling: true}}
    fontSize={16}
    showPrintMargin={true}
    showGutter={true}
    highlightActiveLine={true}
    setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 4,
    }}
  />,
  document.getElementById('editor')
);




registerServiceWorker();
