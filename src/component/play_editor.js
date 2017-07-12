import React from 'react'
import Button from 'antd/lib/button';
import '../css/style.css'
// import p5 from 'p5'

class PlayButton extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
    }
    executeCode() {
    }
    render() {
        return (
            <div>
                <Button type="primary" shape="circle" icon="caret-right" size="large" onClick={this.executeCode.bind(this)} />
                
            </div>
        )
    }
}
export default PlayButton