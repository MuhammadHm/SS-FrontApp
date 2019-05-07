import React from 'react';
import "./Question.css";
import Multichoice from "./../QuestionTypes/multiChoice";





const question=(props)=>{

    const buttonStyle={
            padding: '3px 3px 3px',
            fontSize: '15px',
            width : '60px',
            height : '30px',
            margin : '20px 10px' 
        };
    const textStyle={
            width: '90%',
            padding: '12px 20px',
            margin: '8px 8px',
            boxSizing: 'border-box',
            fontSize : '18px'
        };


  
    return(

        <div className="question">

            <li className="question-text">
               <div>Question {props.id}: </div> 
               <br />
               <div>{props.body}</div>
               <br />
               <span>
                    <input 
                        name="questionBody" 
                        type="text" placeholder="Enter your question" 
                        onBlur={props.setQuestion}
                        onChange={props.setQuestion}
                        style={textStyle} />
               </span>

               <span className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Type
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


                <div >
                    {props.answerType()}          
                 </div>

               <span className="group">
                    <input id="check" type="checkbox" className="check"  name="Required" onChange={props.isRequired} /><span> Required </span>
				</span>
               <button onClick={props.saveQuestion} style={buttonStyle}>save</button>
               <button onClick={props.deleteQuestion} style={buttonStyle}>delete</button>
               
            </li>
           
        </div>
    );

}

const handleQuestionType=(type)=>{
    
    console.log(type);
    if(type==="multiChoice"){

        return(
            <div>
                <Multichoice />

            </div>
        );

    }
 
}


export default question;
