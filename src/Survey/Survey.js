import React,{Component} from 'react';
import './Survey.css';
import Question from '../Question/Question';
import MultiChoice from '../QuestionTypes/multiChoice';
import CheckBox from "../QuestionTypes/checkBox";
import Essay from "../QuestionTypes/essay";
import Scale from "../QuestionTypes/scale";
import Textbox from "../QuestionTypes/textbox";
import Date from "../QuestionTypes/date";


class Survey extends Component {
  
  
  constructor(){
    super();
    this.state = {
      survey_id: '',
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
 

        this.setState({
          survey_id: this.props.survey_id,
          user_id : this.props.user_id,
          title : this.props.title,
          welcomeMessage : this.props.welcomeMessage
        });
       
    
  }
  //new question
  addQuestionHandler= ()=>{
    console.log('add clicked');
    let questions=this.state.questionsArray;

    questions.push({id : (questions.length+1) , body : '',isRequired: false ,
     answerType : 'textbox'});
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
      survey_id : this.props.survey_id,
      user_id: this.props.user_id, 
      title : this.props.title,
      welcomeMessage : this.props.welcomeMessage,
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
      .then(data => { alert('Your survey saved sucessfuly'); } )
      .catch(err => console.log(err)); 
      
  }

  

  render(){

      const buttonStyle={
         margin : '20px 20px'     
      };

      return (
       
        <div className="Survey">
          <h1 className="title">{this.props.title}</h1>
          <h4 >{this.props.welcomeMessage}</h4>

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
            <div>
              <hr className="main-hr" />
                  <button className="icon-btn add-btn" onClick={this.addQuestionHandler}>
                      <div className="add-icon"></div>
                      <div className="btn-txt">Add</div>
                  </button>
                  <button className="icon-btn add-btn" onClick={this.deleteQuestionHandler}>  
                      <div className="btn-txt">Remove</div>
                  </button>
                  <button  onClick={this.saveSurvey} style={buttonStyle}  className="save-survey btn btn-outline-primary"><a href="http://localhost:3003/publish" target="_blank">Save Survey</a></button>
            </div>
            <h4> Save your survey before previewing it </h4>
            
          </div>
        </div>
    );
  }
}



export default Survey;
