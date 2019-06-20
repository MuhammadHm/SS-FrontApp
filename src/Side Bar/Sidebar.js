import React, { Component } from 'react';
import './Sidebar.css'

class Sidebar extends Component {

    render() {
        let preview = `/preview/${this.props.survey_id}`
        let back = `http://localhost:8080/back/${this.props.user_id}`
        let backHome =`http://localhost:8080/back/home/${this.props.user_id}`
        let responses = `/responses/${this.props.survey_id}`
        return (
            <div id="menu" className="nav1">
                <h1 className="logo">
                    <a className="s-logo" href={backHome}>Survey<span>Space</span></a>
                </h1>
                <ul>
                    <li><a href="/createsurvey">Design Survey</a></li>
                    <li><a href={preview} >Preview &amp; Score</a></li>
                    <li><a href="/publish">Publish Survey</a></li>
                    <li><a href={responses}>Collect Responses</a></li>
                    <li><a href="/analyze">Analyze Results</a></li>
                    <li><a href={back} >Back to profile</a></li>
                </ul>
            </div>
        );

    }
}
export default Sidebar;
