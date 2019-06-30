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
        return(
            <div className="quesionPrev">
                <h5> Q {this.props.question_id} : {this.props.body} </h5>              
                <div> {this.props.renderQuestionType(this.props.answerType , this.props.answers , this.props.body )} </div>
            </div>

        );
    }
    
}

 


export default QuestionPrev;