import React, { Component } from 'react';
import "./Question.css";

class Question extends Component {


render() {
    const textStyle = {
        width: '80%',
        padding: '12px 20px',
        boxSizing: 'border-box',
        fontSize: '18px'
    };
    let x = this.props.body;

    return (
        <div className="question">
            <li className="question-text">
                <label className="bounceIn"> Question {this.props.id} : </label>
                <span> Old Question : {x}</span>
                <br />
                <span>
                    <input autoFocus className="question-input"
                        name="questionBody"
                        type="text" placeholder="Enter your question"
                        onBlur={this.props.setQuestion}
                        onChange={this.props.setQuestion}
                        style={textStyle} />
                </span>
                <span className="dropdown">
                    <button className="btn btn-default dropdown-toggle"
                        type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false"
                        style={{ 'fontSize': '20px' }}>
                        Question Type
                    </button>
                    <span className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" onClick={this.props.questionType} name="mulchoice">Multiple Choice</button>
                        <button className="dropdown-item" onClick={this.props.questionType} name="checkbox">Checkboxes</button>
                        <button className="dropdown-item" onClick={this.props.questionType} name="textbox">Textbox</button>
                        <button className="dropdown-item" onClick={this.props.questionType} name="essay">Essay</button>
                        <button className="dropdown-item" onClick={this.props.questionType} name="scale">Scale</button>
                        <button className="dropdown-item" onClick={this.props.questionType} name="date">Date / Time</button>
                    </span>
                </span>
                <div className="questionType"> {this.props.answerType()} </div>
                <div className="contents">
                    <span className="group">
                        <input id="check" type="checkbox" className="check" name="Required" onChange={this.props.isRequired} /><span> Required </span>
                    </span>
                    <button onClick={this.props.deleteQuestion} className="btn btn-outline-primary" >Delete Question </button>
                </div>
            </li>
        </div>
    );
}
}

export default Question;
