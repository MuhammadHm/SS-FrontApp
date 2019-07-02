import React, { Component } from 'react';
import './Survey.css';
import Question from '../Question/Question';
import MultiChoice from '../QuestionTypes/multiChoice';
import CheckBox from "../QuestionTypes/checkBox";
import Essay from "../QuestionTypes/essay";
import Scale from "../QuestionTypes/scale";
import Textbox from "../QuestionTypes/textbox";
import Date from "../QuestionTypes/date";
import Cookies from 'js-cookie';
import cookie from "react-cookie";

class Survey extends Component {

  constructor() {
    super();
    this.state = {
      survey_id: '',
      user_id: '',
      title: '',
      welcomeMessage: ' ',
      questionsArray: [
        {
          id: 1,
          body: '',
          isRequired: false,
          answerType: '',
          answers: ''
        }
      ],
      Body: "",
      index: 0
    }
  }
  componentDidMount() {

    this.setState({
      survey_id: this.props.survey_id,
      user_id: this.props.user_id,
      title: this.props.title,
      welcomeMessage: this.props.welcomeMessage
    });

  }
  addQuestionHandler = () => {
    let questions = this.state.questionsArray;

    questions.push({
      id: (questions.length + 1), body: '', isRequired: false,
      answerType: ''
    });
    this.setState({
      questionsArray: questions

    });
  } 
  handleDeleteQuestion = (index) => {

    let questions = this.state.questionsArray;
    questions.splice(index, 1);    //deleting question
    console.log('deleted index : ', index);
    this.setState({
      questionsArray: questions

    });
  }
  setQuestion(index, element) {

    this.setState({
      Body: element.target.value
    });

  }
  saveQuestion = (index)=>{
    let questions = this.state.questionsArray;
    questions[index].body = this.state.Body;
    this.setState({
      questionsArray: questions,
      Body : ''
    });
  }
  handleRequired = (index) => {

    let questions = this.state.questionsArray;
    let r = questions[index].isRequired;

    if (r === false)
      r = true;
    else
      r = false;

    questions[index].isRequired = r;
    this.setState({
      questionsArray: questions
    });

  }
  handleQuestionType = (index, element) => {

    let questions = this.state.questionsArray;
    questions[index].answerType = element.target.name;

    this.setState({
      questionsArray: questions
    });


  }
  handleAnswers = (answers) => {
    let question = this.state.questionsArray;
    question[this.state.index].answers = answers;
    this.setState({
      questionsArray: question
    });
  }
  setAnswerType = (index) => {
    let type = this.state.questionsArray[index].answerType;
    //let answers=this.state.questionsArray[index].answers;
    this.state.index = index;
    if (type === "mulchoice")
      return (<div> <MultiChoice answers={this.handleAnswers.bind(this)} /> </div>);
    else if (type === "checkbox")
      return (<div> <CheckBox answers={this.handleAnswers.bind(this)} /> </div>);
    else if (type === "textbox")
      return (<div> <Textbox /> </div>);
    else if (type === "essay")
      return (<div> <Essay /> </div>);
    else if (type === "scale")
      return (<div> <Scale answers={this.handleAnswers.bind(this)} /> </div>);
    else if (type === "date")
      return (<div> <Date /> </div>);

  }
  saveSurvey = () => {  
    const survey = {
      survey_id: this.props.survey_id,
      user_id: this.props.user_id,
      title: this.props.title,
      welcomeMessage: this.props.welcomeMessage,
      questionsArray: this.state.questionsArray
    };
    if (navigator.onLine){
    fetch('http://localhost:8080/survey/savesurvey', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(survey)
    })
      .then(response => response.json())
      .then(data => { 
        localStorage.removeItem('survey');
        alert('Your survey saved sucessfuly');
      })
      .catch(err => console.log(err));
  }
  else 
  { 
    localStorage.setItem('survey',JSON.stringify(survey));

  }

}
  saveAsTemplate = () => {
    const survey = {
      survey_id: this.props.survey_id,
      user_id: this.props.user_id,
      title: this.props.title,
      welcomeMessage: this.props.welcomeMessage,
      questionsArray: this.state.questionsArray
    };
    if (navigator.onLine){
    fetch('http://localhost:8080/survey/saveastemplate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(survey)
    })
      .then(response => response.json())
      .then(data => { 
        localStorage.removeItem('template');
        alert('Your template saved sucessfuly'); })
      .catch(err => console.log(err));
    }
    else 
    { 
      localStorage.setItem('template',JSON.stringify(survey));
    }
  }
  swapUp = (index) =>{
    if(index-1 >= 0){
        let questions=this.state.questionsArray;
        let b = questions[index-1];
        questions[index-1] =  questions[index];
        questions[index] = b;

        this.setState({
          questionsArray : questions
        });
    }
    console.log(this.state.questionsArray)

  }
  swapDown = (index) =>{
    let questions=this.state.questionsArray;
    if(index+1 <= questions.length-1){
       
        let b = questions[index+1];
        questions[index+1] =  questions[index];
        questions[index] = b;

        this.setState({
          questionsArray : questions
        });
    }
    console.log(this.state.questionsArray)

  }
 
  render() {
    const buttonStyle = {
      margin: '20px 20px'
    };
    let connect = null;
    if (!navigator.onLine)
      {
      if (localStorage.getItem('survey') === null)
        connect=(<h3>You are offline! Save your survey  </h3>);
      else
        connect=(<h3>You are offline! </h3>);
      }
    else 
      connect = null;

    return (
      <div className="Survey">
        <h1>{this.props.title}</h1>
        <h3>{this.props.welcomeMessage}</h3>
        <div className="Questions">
          <ul className="ul">
            {
              this.state.questionsArray.map((question, index) => {
                return (<Question
                  key={index + 1}
                  id={index + 1}
                  body={question.body}
                  deleteQuestion={this.handleDeleteQuestion.bind(this, index)}
                  setQuestion={this.setQuestion.bind(this, index)}
                  saveQuestion={this.saveQuestion.bind(this, index)}
                  isRequired={this.handleRequired.bind(this, index)}
                  questionType={this.handleQuestionType.bind(this, index)}
                  answerType={this.setAnswerType.bind(this, index)}
                  swapUp={this.swapUp.bind(this,index)}
                  swapDown={this.swapDown.bind(this,index)}
                />)
              })
            }
          </ul>
          <div>
            <hr className="main-hr" />
            <button className="icon-btn add-btn" onClick={this.addQuestionHandler}>
              <div className="add-icon"></div>
              <div className="btn-txt">NEW </div>
            </button>
            {connect}
            <div className="save-button">
            <button onClick={this.saveSurvey} style={buttonStyle} className="save-survey btn btn-outline-primary">Save Survey</button>
            <button onClick={this.saveAsTemplate} style={buttonStyle} className="save-survey btn btn-outline-primary">Save As Template</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Survey;
