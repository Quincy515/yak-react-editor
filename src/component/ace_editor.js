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
import Button from 'antd/lib/button';
import '../css/style.css'

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
class MyIframe extends React.Component{
    updateIFrameContents() {
        
    }
    
    componentDidMount() {
        // 组件渲染完成之后
        var iFrameNode = this.refs.sketchFrame
        var frameDoc = iFrameNode.contentWindow.document
        frameDoc.write(`<!doctype html>
<html>

<head>

    <script language="javascript" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.min.js"></script>
    
    <style>
        html,
        body {
            overflow: hidden;
            margin: 0;
            padding: 0;
            background: white;
        }
    </style>
</head>

<body>
</body>

</html>`)
        this.updateIFrameContents()
    }
    componentDidUpdate(){
        this.updateIFrameContents()
    }
    render(){
        return <iframe title="unique"  ref = "sketchFrame" {...this.props}/>
    }
}
class MyAceEditor extends React.Component {  
    constructor(props){
        super(props)
        this.state={
            value: defaultValue,
        }
    } 
    executeCode(event) {
        event.preventDefault()// 阻止默认行为
        var sketchFrame = document.getElementById('bannerIframe')
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
        this.updateIFrameContents()        
    }
    updateIFrameContents(){
        
    }
    
    render() {
        return (
            <div>
            <AceEditor
                mode="javascript"
                theme="github"
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
            <MyIframe ref="bannerIframe" id="bannerIframe" title="sketchFrame" width="600px" height="400px"/>
            </div>
        )
    }
}

export default MyAceEditor