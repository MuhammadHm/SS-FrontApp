import React,{Component} from 'react';
import QuestionPrev from './QuestionPrev';
import MultiChoice from './PreviewTypes/multiChoice';
import Checkbox from './PreviewTypes/checkBox';
import Textbox from './PreviewTypes/textbox';
import Essay from './PreviewTypes/essay';
import Scale from './PreviewTypes/scale';
import Date from './PreviewTypes/date';
import './Preview.css'
import Sidebar from './../Side Bar/Sidebar'

class UserPreview extends Component {

constructor(){
    super();
    this.state={
        survey_id :'',
        user_id: '',
        title : '',
        welcomeMessage : ' ',
        questionsArray : [
            {
              /* id: 1,
               body : '',
               isRequired: false ,
               answerType : 'textbox',
               answers : ''*/
            }
        ],
        userInput : [
           /*{
            questionType : "",
            questionBody : "",
            answer : ""
           }*/
        ],
        index : ''
    }
}

componentDidMount(){

    fetch(`http://localhost:8080/survey/sendsurvey/${this.props.id}`)
    .then(response =>  response.json())
      .then(data => {
        this.setState({
            survey_id : this.props.id,
            user_id: data.user_id,
            title : data.title,
            welcomeMessage : data.welcomeMessage,
            questionsArray : data.questionsArray
        
        });
        console.log("data",data);
      })
      .catch(error => {
        console.log(error);
      });
    
}

renderQuestionType=(type,answers,questionBody)=>{
    
    if(type === "mulchoice")
        return(<div> <MultiChoice choicesArray={answers} getInput={this.getInput} body={questionBody} /> </div>);
    else if(type === "checkbox")
        return(<div>  <Checkbox choicesArray={answers} getInput={this.getInput} body={questionBody} /> </div>);      
    else if(type === "textbox")
        return(<div> <Textbox getInput={this.getInput} body={questionBody} /> </div>); 
    else if(type === "essay")
        return(<div> <Essay getInput={this.getInput} body={questionBody} /> </div>); 
    else if(type === "scale")
        return(<div> <Scale answers={answers} getInput={this.getInput} body={questionBody} /> </div>); 
    else if(type === "date")
        return(<div> <Date getInput={this.getInput} body={questionBody} /> </div>);     
       
}

getInput=(answer ,questionType ,questionBody)=>{

    let userInput=this.state.userInput;
    let input={       
        questionType : questionType,
        questionBody : questionBody,
        answer : answer
    };
    // getting index of question
    if(this.search(questionBody,userInput) !== -1)
        userInput[this.search(questionBody,userInput)]=input;
    else
        userInput.push(input);    
        
    this.setState({
        userInput : userInput
  });

}
search=(nameKey, myArray)=>{
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].questionBody === nameKey) {
            return i;
        }
    }
    return -1;
}


submitAnswers=()=>{
 const result={
      survey_id : this.state.survey_id,
      user_id: this.state.user_id,
      answers : this.state.userInput
    };
    fetch('http://localhost:8080/results/submit', {
          method: 'POST',
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',  
          },
          body: JSON.stringify(result)
      })
      .then(response =>  response.json())
      .then(data => { alert('your survey submitted'); } )
      .catch(err => console.log(err)); 
    
}



render(){

    return(
    <div>                         

    <div className="preview-title">
      

        <h1>{this.state.title}</h1>
        <h3>{this.state.welcomeMessage}</h3>

        <ul>
         {                  
            this.state.questionsArray.map((question,index)=>{
                return(
                    <div key={index} className="preview">
                        <li>
                            <QuestionPrev 
                            question_id={question.id}
                            body={question.body} 
                            answerType={question.answerType} 
                            answers={question.answers} 
                            isRequired={question.isRequired}
                            renderQuestionType={this.renderQuestionType}
                             />
                        </li>
                    </div>
 
                );
            })
         }
            
        </ul>
        <div>  <button onClick={this.submitAnswers}  className="nav-item btn btn-outline-primary">Submit</button></div>
    </div>
    </div>
    );
}

}

export default UserPreview;