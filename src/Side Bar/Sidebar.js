import React, { Component } from 'react';
import './Sidebar.css'

class Sidebar extends Component {



    decideStyle(){
        if(this.props.styleLang==="ar")
            return {
                nav : "nav2",
            }
        else
            return {
                nav : "nav1",                
            }         
    }

    render() {
        let lang=this.props.lang;
        let preview = `/preview/${this.props.survey_id}`
        let backHome =`http://localhost:8080/mysurveys`
        let responses = `/responses/${this.props.survey_id}`
        let report=`/report/${this.props.survey_id}`
        let analyze=`/analyze/${this.props.survey_id}`
        return (
            <div id="menu" className={this.decideStyle().nav}>    
                <h1 className="logo">
                    <a className="s-logo" href={backHome}>Survey<span>Space</span></a>
                </h1>
                <ul>
                    <li><a href="/createsurvey">{lang.create}</a></li>
                    <li><a href={preview} >{lang.Preview} &amp;{lang.Print}</a></li>
                    <li><a href="/publish">{lang.Publish}</a></li>
                    <li><a href={responses}>{lang.Collect}</a></li>
                    <li><a href={analyze}>{lang.Analyze}</a></li>
                    <li><a href={report} >{lang.Generate}</a></li>
                    <li><a href={backHome} >{lang.Back}</a></li>
                </ul>
            </div>
        );

    }
}
export default Sidebar;