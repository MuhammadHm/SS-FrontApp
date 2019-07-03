import React,{Component} from 'react';
import './QuestionPrev.css'



class QuestionPrev extends Component {

    constructor(){
        super();
        this.state={
            input : []
        }
    }

    render(){
        let isRequired=null;
        if (this.props.isRequired)
            isRequired = "(*)";
        return(
            <div className="quesionPrev">

                <h5> Q {this.props.question_id} : {this.props.body}   {isRequired} </h5>              
                <div> {this.props.renderQuestionType(this.props.answerType , this.props.answers , this.props.body,this.props.question_id )} </div>
            </div>

        );
    }
    
}


export default QuestionPrev;