import React,{Component} from 'react';
import MultiChoice from './PreviewTypes/multiChoice';
import Checkbox from './PreviewTypes/checkBox';
import Textbox from './PreviewTypes/textbox';
import Essay from './PreviewTypes/essay';
import Scale from './PreviewTypes/scale';
import Date from './PreviewTypes/date';



const QuestionPrev=(props)=>{

    return(
        <div className="quesionPrev">

           <h5> Q {props.question_id} : {props.body} </h5>
           <div> {renderQuestionType(props.answerType,props.answers)} </div>
           
        </div>

        );
    
}

const renderQuestionType=(type,answers)=>{
    
    if(type === "mulchoice")
        return(<div> <MultiChoice choicesArray={answers} /> </div>);
    else if(type === "checkbox")
        return(<div>  <Checkbox choicesArray={answers} /> </div>);      
    else if(type === "textbox")
        return(<div> <Textbox /> </div>); 
    else if(type === "essay")
        return(<div> <Essay /> </div>); 
    else if(type === "scale")
        return(<div> <Scale answers={answers} /> </div>); 
    else if(type === "date")
        return(<div> <Date /> </div>);     
       
}


export default QuestionPrev;