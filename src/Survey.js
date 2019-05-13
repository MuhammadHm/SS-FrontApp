import React,{Component} from 'react';
import './Survey.css';
import Question from './Question/Question';
import MultiChoice from './QuestionTypes/multiChoice';
import CheckBox from "./QuestionTypes/checkBox";
import Essay from "./QuestionTypes/essay";
import Scale from "./QuestionTypes/scale";
import Textbox from "./QuestionTypes/textbox";
import Date from "./QuestionTypes/date";

 
class Survey extends Component {
  
  
  constructor(){
    super();
    this.state = {
      user_id: '',
      title : '',
      welcomeMessage : ' ',
      questionsArray : [
          {
             id: 1,
             body : '',
             isRequired: false ,
             answerType : 'textbox',
             answers : ''
          }
      ],
      
      Body : "",
      index : 0
    }
  }

  componentDidMount(){ 
 
    fetch('http://localhost:8080/survey/sendsurveyinfo')
    .then(response =>  response.json())
      .then(data => {
        this.setState({
          user_id : data.user_id,
          title : data.title,
          welcomeMessage : data.welcomeMessage
        });
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
    
  }
  //new question
  addQuestionHandler= ()=>{
    console.log('add clicked');
    let questions=this.state.questionsArray;

    questions.push({id : (questions.length+1) , body : '',isRequired: false ,
     answerType : ''});
    this.setState({
          questionsArray : questions
      
    });
  }
  //deleteing the last question
  deleteQuestionHandler= ()=>{
    console.log('dalete clicked');
    let questions=this.state.questionsArray;
    questions.pop();
    this.setState({
      questionsArray : questions
      });
  }
  //deleting specifique question 
  handleDeleteQuestion = (index)=>{
    
    let questions=this.state.questionsArray;
    questions.splice(index,1);    //deleteing question
    console.log('deleted index : ',index);
    this.setState({
      questionsArray : questions
      
    });
  }
  setQuestion(index,element){     // element can be used only in setState
    this.setState({
      Body : element.target.value
  });
    
    let questions=this.state.questionsArray;
    questions[index].body=this.state.Body;

      this.setState({
          questionsArray : questions
      });
     
  }
  saveQuestion=(index)=>{
    let questions=this.state.questionsArray;
    questions[index].body=this.state.Body;

      this.setState({
          questionsArray : questions
      });
  }
  handleRequired=(index)=>{
   
    let questions=this.state.questionsArray;
    let r=questions[index].isRequired;
    
    if(r===false)
       r=true;
    else
       r=false;

    questions[index].isRequired=r;   
    this.setState({
      questionsArray : questions
    });  
    
  }
  handleQuestionType=(index,element)=>{
 
    let questions=this.state.questionsArray;
    questions[index].answerType=element.target.name;

      this.setState({
          questionsArray : questions
      });
      
     
  }
  handleAnswers=(answers)=>{
    let question=this.state.questionsArray;
    question[this.state.index].answers=answers;
    this.setState({
      questionsArray : question
  });
  }
  setAnswerType=(index)=>{
      let type=this.state.questionsArray[index].answerType;
      //let answers=this.state.questionsArray[index].answers;
      this.state.index=index;
      if(type === "mulchoice")
            return(<div> <MultiChoice answers={this.handleAnswers.bind(this)} /> </div>);
      else if(type === "checkbox")
          return(<div> <CheckBox answers={this.handleAnswers.bind(this)} /> </div>);      
      else if(type === "textbox")
          return(<div> <Textbox /> </div>); 
      else if(type === "essay")
          return(<div> <Essay /> </div>); 
      else if(type === "scale")
          return(<div> <Scale  answers={this.handleAnswers.bind(this)} /> </div>); 
      else if(type === "date")
          return(<div> <Date /> </div>);     
         
  }
  
  saveSurvey= ()=>{   // must be arrow function to arrive to 'this'
  const survey={
      user_id: this.state.user_id,
      title : this.state.title,
      welcomeMessage : this.state.welcomeMessage,
      questionsArray : this.state.questionsArray
    };
    fetch('http://localhost:8080/survey/savesurvey', {
          method: 'POST',
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',  
          },
          body: JSON.stringify(survey)
      })
      .then(response =>  response.json())
      .then(data => { alert('your survey submitted'); } )
      .catch(err => console.log(err)); 
      
  }

  render(){

      const buttonStyle={
         margin : '20px 20px'     
      };

      return (
        <div className="Survey">
          <h1>{this.state.title}</h1>
          <div className="Questions">
            <ul className="ul">
                {
                  this.state.questionsArray.map((question,index)=>{
                   return (<Question 
                    key={index+1}
                    id={index+1} 
                    body={question.body} 
                    deleteQuestion={this.handleDeleteQuestion.bind(this,index)}
                    setQuestion={this.setQuestion.bind(this,index)}
                    saveQuestion={this.saveQuestion.bind(this,index)}
                    isRequired={this.handleRequired.bind(this,index)}
                    questionType={this.handleQuestionType.bind(this,index)}
                    answerType={this.setAnswerType.bind(this,index)}
                    />)
                    })
                }

            </ul>
            <div className="nav">
            <ul className="navbar-nav mr-auto">
            <button className="nav-item" onClick={this.addQuestionHandler} style={buttonStyle} className="btn btn-success ">New Question</button>
            </ul>
            <button className="nav-item" onClick={this.deleteQuestionHandler} style={buttonStyle} className="btn btn-danger ">Delete Last Question</button>
            <ul className="navbar-nav ml-auto"> 
            <button className="nav-item" onClick={this.saveSurvey} style={buttonStyle}  className="btn btn-outline-primary">Save Survey</button>
            </ul>
            </div>
          </div>
        </div>
    );
  }

}


export default Survey;
