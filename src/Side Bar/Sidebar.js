import React, { Component } from 'react';
import './Sidebar.css'

class Sidebar extends Component {



    decideStyle(){
        if(this.props.styleLang==="ar")
            return "nav2"
        else
            return "nav1"           
    }

    render() {
        let lang=this.props.lang;
        let preview = `/preview/${this.props.survey_id}`
        let backHome =`http://localhost:8080/mysurveys`
        let responses = `/responses/${this.props.survey_id}`
        let report=`/report/${this.props.survey_id}`
        return (
            <div id="menu" className={this.decideStyle()}>    
                <h1 className="logo">
                    <a className="s-logo" href={backHome}>Survey<span>Space</span></a>
                </h1>
                <ul>
                    <li><a href="/createsurvey">Create Survey</a></li>
                    <li><a href={preview} >Preview &amp; Print</a></li>
                    <li><a href="/publish">Publish Survey</a></li>
                    <li><a href={responses}>Collect Responses</a></li>
                    <li><a href="/analyze">Analyze Results</a></li>
                    <li><a href={report} >Generate Report</a></li>
                    <li><a href={backHome} >Back to profile</a></li>
                </ul>
            </div>
        );

    }
}
export default Sidebar;
