import React from 'react';
import "./Question.css";


const question=(props)=>{

    const buttonStyle={
            padding: '3px 3px 3px',
            fontSize: '15px',
            width : '60px',
        };
    
        const textStyle={
            width: '80%',
            padding: '12px 20px',
            boxSizing: 'border-box',
            fontSize : '18px'
        };


    return(

        <div className="question">
            <li className="question-text">
               <label className="bounceIn"> Question {props.id} : </label> 
               <span> {props.body}</span>
               <br />
               <span>
                    <input autoFocus className="question-input"
                        name="questionBody" 
                        type="text" placeholder="Enter your question" 
                        onBlur={props.setQuestion}
                        onChange={props.setQuestion}
                        style={textStyle} />
               </span>

               <span className="dropdown">
                    <button className="btn btn-default dropdown-toggle" 
                    type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" 
                    aria-expanded="false"
                    style={ {'font-size' : '20px'} }
                    >
                        Question Type
                    </button>
                    <span className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" onClick={props.questionType} name="mulchoice">Multiple Choice</button>
                        <button className="dropdown-item" onClick={props.questionType} name="checkbox">Checkboxes</button>
                        <button className="dropdown-item" onClick={props.questionType} name="textbox">Textbox</button>
                        <button className="dropdown-item" onClick={props.questionType} name="essay">Essay</button>
                        <button className="dropdown-item" onClick={props.questionType} name="scale">Scale</button>
                        <button className="dropdown-item" onClick={props.questionType} name="date">Date / Time</button>

                    </span>
                </span>


                <div className="questionType">
                    {props.answerType()}          
                 </div>
                 
                <div className="contents">
                <span className="group">
                        <input id="check" type="checkbox" className="check"  name="Required" onChange={props.isRequired} /><span> Required </span>
                </span>
                <button  onClick={props.deleteQuestion} className="btn btn-outline-primary" >Delete this Question </button>
                </div>

            </li>
            
        </div>
    );

}


export default question;
