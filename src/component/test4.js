import React from 'react'
import ReactDOM from 'react-dom'
// import brace from 'brace';
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
import Button from 'antd/lib/button';
import '../css/style.css'

import Iframe from 'react-iframe'

const defaultValue =
    `function setup(){
    createCanvas(100,100);
}
function draw(){
    ellipse(20,20,20,20);
}`

/**
 * 实现AceEditor功能
 * 'brace/mode/javascript'      - 语法
 * 'brace/theme/github'         - 主题
 * 'brace/snippets/javascript'  - 代码段
 */

class MyAceEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: defaultValue,
        }
    }
    executeCode(event) {
        var sketchFrame = document.getElementById("myiframe")
        var code = this.state.value
        code += `\n new p5();\n`
        this.setState({
            value: code
        })
        var userScript = sketchFrame.contentWindow.document.createElement('script')
        userScript.type = 'text/javascript'
        userScript.text = code
        userScript.async = false
        sketchFrame.contentWindow.document.body.appendChild(userScript)
        // this.updateIFrameContents(sketchFrame.src)  
    }
    updateIFrameContents(src) {
    }

    render() {
        return (
            <div>
                <Iframe id="myiframe"
                    url='./_sketch.html'
                    position="relative"
                    styles={{height:"300px"}}/>
                <AceEditor
                    mode="javascript"
                    theme="github"
                    name="yak_editor"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={this.state.value}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4,
                    }}
                /> 
                <Button type="primary" shape="circle" icon="caret-right" size="large" onClick={this.executeCode.bind(this)} />
            </div>
        )
    }
}

export default MyAceEditor