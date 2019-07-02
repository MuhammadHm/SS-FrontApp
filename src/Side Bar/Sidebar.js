import React, { Component } from 'react';
import './Sidebar.css'

class Sidebar extends Component {

    render() {
        let lang=this.props.lang;
        let preview = `/preview/${this.props.survey_id}`
        let back = `http://localhost:8080/back/${this.props.user_id}`
        let backHome =`http://localhost:8080/back/home/${this.props.user_id}`
        let responses = `/responses/${this.props.survey_id}`
        let report=`/report/${this.props.survey_id}`
        return (
            <div id="menu" className="nav1">
                <h1 className="logo">
                    <a className="s-logo" href={backHome}>Survey<span>Space</span></a>
                </h1>
                <ul>
                    <li><a href="/createsurvey">{this.props.lang.create}</a></li>
                    <li><a href={preview} >{this.props.lang.Preview} &amp;{this.props.lang.Print} </a></li>
                    <li><a href="/publish">{this.props.lang.Publish}</a></li>
                    <li><a href={responses}>{this.props.lang.Collect}</a></li>
                    <li><a href="/analyze">{this.props.lang.Analyze}</a></li>
                    <li><a href={report} >{this.props.lang.Generate}</a></li>
                    <li><a href={back} >{this.props.lang.Back}</a></li>
                </ul>
            </div>
        );

    }
}
export default Sidebar;
