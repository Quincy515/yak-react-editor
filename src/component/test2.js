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
import Frame from 'react-frame-component'
import PropTypes from 'prop-types';
// import ReactMixin from 'react-mixin'
import p5 from 'p5'

const defaultValue =
    `function setup(){
    createCanvas(100,100);
    background(200);
}
function draw(){
    fill(100,50,80);
    ellipse(20,20,20,20);
}
new p5();`

const InnerFrame = (props, context) => {
    // console.log('IFrame Window and Document: ', context.window, context.document)
    var iwindow = context.window
    var idoc = context.document
    console.log("window", iwindow)//获取iframe的window对象
    console.log("document", idoc)  //获取iframe的document
    console.log("html", idoc.documentElement)//获取iframe的html
    console.log("head", idoc.head)  //获取head
    console.log("body", idoc.body)
    return (
        <div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.min.js"></script>
            <script type="text/javascript">{props.code}</script>
        </div>
    )
}
InnerFrame.contextTypes = {
    window: PropTypes.any,
    document: PropTypes.any
}
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
            _isMounted: true
        }
        this.handChange = this.handChange.bind(this)
    }
    executeCode(e) {
        // this.refs.myiframe.src = this.refs.myiframe.src
        this.setState(prevState => ({
            _isMounted: !prevState._isMounted
        }))

        var myiframe = document.getElementById("myiframe")
        var iwindow = ReactDOM.findDOMNode(myiframe).contentWindow
        var idoc = ReactDOM.findDOMNode(myiframe).contentDocument
        console.log("window", iwindow)
        console.log("document", idoc)
        console.log("src", ReactDOM.findDOMNode(myiframe).src)
        // ReactDOM.findDOMNode(myiframe).src = ReactDOM.findDOMNode(myiframe).src
        // iwindow.location.reload(true)
        this.renderFrameContents();
        alert(iwindow.document.body.innerHTML)
    }
    renderFrameContents() {
        // if (!this._isMounted) {
        //     return
        // }

        ReactDOM.findDOMNode(document.getElementById("myiframe")).contentWindow.location.reload()
        console.log("yunxing")
    }
    handChange(newValue) {
        this.setState({ value: newValue })
    }
    render() {
        return (
            <div>
                <Frame id="myiframe" ref='myiframe' src="./_sketch.html">
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.min.js" />
                    <script type="text/javascript">{this.state.value}</script>

                </Frame>

                {/*                
                <div>
                    <Frame>
                         <InnerFrame id="FrameID" {...this.props} code={this.state.value} /> 
                    </Frame>
                    <h1>Outside Frame Text</h1>                    
                </div>*/}
                {this.state._isMounted ? 'ON' : 'OFF'}
                <AceEditor
                    mode="javascript"
                    theme="github"
                    name="yak_editor"
                    onChange={this.handChange}
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
// ReactMixin(MyAceEditor.prototype, InnerFrame)