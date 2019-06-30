import React, { Component } from 'react';
import './Survey.css';
import Question from '../Question/Question';
import MultiChoice from '../QuestionTypes/multiChoice';
import CheckBox from "../QuestionTypes/checkBox";
import Essay from "../QuestionTypes/essay";
import Scale from "../QuestionTypes/scale";
import Textbox from "../QuestionTypes/textbox";
import Date from "../QuestionTypes/date";

class Survey extends Component {


  constructor() {
    super();
    this.state = {
      survey_id: '',
      user_id: '',
      title: '',
      welcomeMessage: ' ',
      questionsArray: [],
      index: 0
    }
  }
  componentDidMount() {

    fetch(`http://localhost:8080/survey/sendsurvey/${this.props.survey_id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          survey_id: this.props.survey_id,
          user_id: data.user_id,
          title: data.title,
          welcomeMessage: data.welcomeMessage,
          questionsArray: data.questionsArray

        });
      })
      .catch(error => {
        console.log(error);
      });

  }
  //new question
  addQuestionHandler = () => {
    console.log('add clicked');
    let questions = this.state.questionsArray;

    questions.push({
      id: (questions.length + 1), body: '', isRequired: false,
      answerType: ''
    });
    this.setState({
      questionsArray: questions

    });
  }
  //deleting specific question 
  handleDeleteQuestion = (index) => {

    let questions = this.state.questionsArray;
    questions.splice(index, 1);    //deleting question
    console.log('deleted index : ', index);
    this.setState({
      questionsArray: questions

    });
  }
  // saving question
  setQuestion(index, element) {

    let questions = this.state.questionsArray;
    questions[index].body = element.target.value;

    this.setState({
      questionsArray: questions
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
      survey_id: this.state.survey_id,
      user_id: this.state.user_id,
      title: this.state.title,
      welcomeMessage: this.state.welcomeMessage,
      questionsArray: this.state.questionsArray
    };
    if (navigator.onLine){
    fetch('http://localhost:8080/survey/editsurvey', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(survey)
    })
      .then(response => response.json())
      .then(data => { 
        localStorage.removeItem('esurvey');
        alert('Your survey edited sucessfuly');})
      .catch(err => console.log(err));
    }
    else 
    { 
      localStorage.setItem('esurvey',JSON.stringify(survey));
    }
  }
  saveAsTemplate = () => {
    const survey = {
      survey_id: this.state.survey_id,
      user_id: this.state.user_id,
      title: this.state.title,
      welcomeMessage: this.state.welcomeMessage,
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
        localStorage.removeItem('etemplate');
        alert('Your template saved successfully');
    })
      .catch(err => console.log(err));
    }
    else 
    { 
      localStorage.setItem('etemplate',JSON.stringify(survey));
    }

  }

  render() {

    const buttonStyle = {
      margin: '20px 20px'
    };
    let connect = null;
    if (!navigator.onLine)
      {if (localStorage.getItem('esurvey') === null)
        connect=(<h3>you are offline now click in save survey to save survey in browser</h3>);
      else
        connect=(<h3>you are offline now </h3>);
      }
    else 
      connect = null;
    return (
      <div className="Survey">
        <h1>{this.state.title}</h1>
        <h3>{this.state.welcomeMessage}</h3>

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
                  isRequired={this.handleRequired.bind(this, index)}
                  questionType={this.handleQuestionType.bind(this, index)}
                  answerType={this.setAnswerType.bind(this, index)}
                />)
              })
            }
          </ul>
          <div>
            <hr className="main-hr" />
            <button className="icon-btn add-btn" onClick={this.addQuestionHandler}>
              <div className="add-icon"></div>
              <div className="btn-txt">NEW QUESTION</div>
            </button>
            {connect}
            <br />
            <button onClick={this.saveSurvey} style={buttonStyle} className="save-survey btn btn-outline-primary">Edit Survey</button>
            <br />
            <button onClick={this.saveAsTemplate} style={buttonStyle} className="save-survey btn btn-outline-primary">Save As Template</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Survey;
