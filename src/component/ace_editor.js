import React from 'react'
// import ReactDOM from 'react-dom'
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
// import p5 from 'p5'

import Button from 'antd/lib/button';
import '../css/style.css'

// var p5=require('../vendor/p5.js')
// var p5Sound=require('../vendor/p5.sound.js')
// var p5Dom=require('../vendor/p5.dom.js')

const defaultValue = 
`function setup(){
    createCanvas(100,100);
}
function draw(){
    ellipse(20,20,20,20);
}`

// const sketchFrame = ReactDOM.findDOMNode(this.refs.sketchFrame)
// const sketchFrame =this.refs.sketchFrame.getDOMNode()
// const sketchFrame = document.getElementById('sketchFrame')
/**
 * 实现AceEditor功能
 * 'brace/mode/javascript'      - 语法
 * 'brace/theme/github'         - 主题
 * 'brace/snippets/javascript'  - 代码段
 */
class MyAceEditor extends React.Component {
    onLoad(){
        console.log('i\'ve loaded')
    }
    onChange(newValue){
        console.log('change', newValue)
        this.setState({
            value: newValue
        })
    }
    executeCode() {
        const sketchFrame = document.getElementById('sketchFrame')
        console.log(this.state.value)
        var code = this.state.value
        code += `\n new p5();\n`
        /**
         * 问题1: 如果去掉上面一行的注释，点击按钮会报错
         * ReferenceError: p5 is not defined
         * 尝试 import p5 from 'p5' 没有用
         * var p5 = var p5=require('../vendor/p5.js') 引入本身就会犯错
         * 问题2: 注释上面，发现sketchFrame根本没有把userScript写入
         */
        console.log("code: \n" + code)

        var userScript = sketchFrame.contentWindow.document.createElement('script')
        
        userScript.type = 'text/javascript'
        userScript.text = code
        userScript.async = false
        console.log(userScript)
        sketchFrame.contentWindow.document.body.appendChild(userScript)
    }
    constructor(props){
        super(props)
        this.state={
            value: defaultValue,
        }
        this.onChange = this.onChange.bind(this)
    }
    render() {
        return (
            <div>
            <AceEditor
                mode="javascript"
                theme="github"
                onLoad={this.onLoad}
                onChange={this.onChange}
                name="UNIQUE_ID_OF_DIV"
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
            
            <iframe id="sketchFrame" ref="sketchFrame" title="sketchFrame" src="../../public/_sketch.html" width="600px" height="400px"/>
            
            </div>
        )
    }
}

export default MyAceEditor