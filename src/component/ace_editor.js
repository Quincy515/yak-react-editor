import React from 'react'
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
    onLoad(){
        console.log('i\'ve loaded')
    }
    onChange(newValue){
        console.log('change', newValue)
        this.setState({
            value: newValue
        })
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
        )
    }
}

export default MyAceEditor