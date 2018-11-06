import React from 'react';
import { hot } from "react-hot-loader";
import MarkdownData from "../../data/post.md"

class AppRoot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        } 
    }
    
    //omit __content if using markdown-loader
    render(){
        return (
            <div className="profile">
                <img src={require('../images/link.jpg')} />
                {/* 
                    <h1>{this.props.heading}</h1> 
                    This is if we used data passed as props in app.js
                */}
                <h1>{MarkdownData.title}</h1>
                <div 
                    className="content"
                    dangerouslySetInnerHTML={{ __html: MarkdownData.__content}}
                >
                    
                </div>
            </div> 
        )
    }
}

export default hot(module)(AppRoot);