import React from 'react'
import ReactDOM from 'react-dom'
// import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
/*eslint-disable no-alert, no-console */
import 'brace/ext/language_tools';
import 'brace/snippets/javascript';
// import 'brace/ext/searchbox';
import Button from 'antd/lib/button';
import '../css/style.css'
import SplitPane from 'react-split-pane'

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
            value: this.props.defaultValue,
            _isMounted: false
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(newValue) {
        this.setState({
            value: newValue
        })
        // console.log("value", this.state.value)

    }
    executeCode(event) {
        event.preventDefault()// 阻止默认行为
        let myiframe = document.getElementById("myiframe")
        var iwindow = ReactDOM.findDOMNode(myiframe).contentWindow
        var idoc = ReactDOM.findDOMNode(myiframe).contentDocument
        var userScript = idoc.createElement('script')
        userScript.type = 'text/javascript'
        userScript.text = this.state.value + `\n new p5();`
        userScript.async = true
        iwindow.document.body.appendChild(userScript)
        this.initialIframe()
    }

    initialIframe() {
        var iFrameNode = this.refs.sketchFrame
        var frameDoc = iFrameNode.contentWindow.document
        frameDoc.write(`<!doctype html><html><head><script language="javascript" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.min.js"></script></head><body></body></html>`)
        frameDoc.close()
    }
    render() {
        return (
            <div>
                <SplitPane split="vertical" minSize={450} defaultSize={800} primary="second">
                    <div>
                        <iframe
                            id="myiframe"
                            ref="sketchFrame"
                            title="myiframe"
                            frameBorder="0"
                            width="100%"
                            height="400"
                            src="./_sketch.html">
                        </iframe>
                    </div>
                    <div>
                        <AceEditor
                            mode="javascript"
                            theme="github"
                            onChange={this.onChange}
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
                </SplitPane>
            </div>
        )
    }
}

export default MyAceEditor