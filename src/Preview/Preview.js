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

class Preview extends Component {

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
        index : '',
        isPrint : false,
       

    };
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
printSurvey=async()=>{
    await this.setState({
        isPrint : true 
    })

    window.print();

    await this.setState({
        isPrint : false 
    })

}
decidePrint = (isPrint)=>{
    const buttonStyle = {
        marginLeft: '50%',
       // marginBottom: '10%'
      };

    if(! isPrint){
       return(
           <div>
                <div><Sidebar survey_id={this.state.survey_id}
                user_id={this.state.user_id} 
                lang={this.props.lang} 
                styleLang={this.props.styleLang}
                />  </div>
                <button onClick={this.printSurvey} style={buttonStyle} className="btn btn-secondary btn-lg"><i class="fa fa-print" aria-hidden="true"></i>Print </button>
            </div>
            );
    }
    return(<div></div>);
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
search=(nameKey, myArray)=>{
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].questionBody === nameKey) {
            return i;
        }
    }
    return -1;
}
render(){
  
    return(
    <div>                         
        {this.decidePrint(this.state.isPrint)}
    <div className="preview-title"> 
        <h1><span  className="surveyName">Title : </span>{this.state.title}</h1>
        <h1><span className="surveyName"> Message : </span>{this.state.welcomeMessage}</h1>
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
                            lang={this.props.lang}
                            styleLang={this.state.language}

                             />
                        </li>
                    </div>
                );
            })
         }            
        </ul>
    </div>
    </div>
    );
}
}

export default Preview;
