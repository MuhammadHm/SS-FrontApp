import React, { Component } from 'react';
import "./Question.css";

class Question extends Component {


    constructor(){
        super();
        this.state={
           onEnter : false,
           onLeave : false
        }
    }

 onEnter =()=>{
        this.setState({
            onEnter : true,
            onLeave : false
        })
 } 
 onLeave =()=>{
    this.setState({
        onEnter : false,
        onLeave : true
    })
}
handelHover=(enter,leave)=>{
    if(enter && !leave){
        return(
            <span style={{"marginLeft" : "40%"}}>
                <button onClick={this.props.saveQuestion} className="btn btn-success"  >Save</button>
                <button onClick={this.props.deleteQuestion} className="btn btn-danger" >Delete</button>
            </span>
        )
    }
    return (<div></div>)

}
decideStyle(){
    if(this.props.styleLang==="ar")
        return "question-arabic"
    else
        return "question"           
}


render() {
    const textStyle = {
        width: '80%',
        padding: '12px 20px',
        boxSizing: 'border-box',
        fontSize: '18px'
    };

    return (
        <div className={this.decideStyle()} onMouseEnter={this.onEnter} onMouseLeave={this.onLeave}>
            <li className="question-text">
                <label className="bounceIn"> {this.props.lang.Question} {this.props.id} : </label>
                <button className="btn btn-outline-primary" onClick={this.props.swapUp} style={{ marginLeft: '84%',marginBottom : "2%" }} title="Swap up" ><i className="fas fa-chevron-up"></i> </button>
                <br />
                <span> {this.props.body}</span>
                <br />
                <span>
                    <input autoFocus className="question-input"
                        name="questionBody"
                        type="text" placeholder={this.props.lang.Enterquestion}
                        onBlur={this.props.setQuestion}
                        onChange={this.props.setQuestion}
                        style={textStyle} />
                </span>
                <span className="dropdown">
                    <button className="btn btn-default dropdown-toggle"
                        type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false"
                        style={{ 'fontSize': '20px' }}>
                        {this.props.lang.QuestionType}
                    </button>
                    <span className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" onClick={this.props.questionType} name="mulchoice"> {this.props.lang.MultipleChoice}</button>
                        <button className="dropdown-item" onClick={this.props.questionType} name="checkbox">{this.props.lang.Checkboxes}</button>
                        <button className="dropdown-item" onClick={this.props.questionType} name="textbox">{this.props.lang.Textbox}</button>
                        <button className="dropdown-item" onClick={this.props.questionType} name="essay">{this.props.lang.Essay}</button>
                        <button className="dropdown-item" onClick={this.props.questionType} name="scale">{this.props.lang.Scale}</button>
                        <button className="dropdown-item" onClick={this.props.questionType} name="date">{this.props.lang.Date} </button>
                    </span>
                </span>
                <div className="questionType"> {this.props.answerType()} </div>
                <div className="contents">
                    <span className="group">
                        <input id="check" type="checkbox" className="check" name="Required" onChange={this.props.isRequired} /><span> {this.props.lang.Required} </span>
                    </span>
                    <button onClick={this.props.swapDown} style={{ marginLeft: '95.5%'}} className="btn btn-outline-primary" title="Swap down"><i className="fas fa-chevron-down "></i> </button>
                    {this.handelHover(this.state.onEnter,this.state.onLeave)}

                </div>
            </li>
        </div>
     );
}
}

export default Question;
