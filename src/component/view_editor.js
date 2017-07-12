import React from 'react'
import MyAceEditor from './ace_editor'
// import PlayButton from './play_editor'

/**
 * PlayButton 和 MyAceEditor 组件的嵌套
 */
class ViewEditor extends React.Component {
    render(){
        return(
            <div>
                <MyAceEditor/>
                {/* <PlayButton/> */}
            </div>
        )
    }
}

export default ViewEditor