import React, { Component } from 'react';
import Sidebar from './../Side Bar/Sidebar'
import './Report.css'


class Report extends Component {

    constructor(){
        super();
        this.state={
            userName : "",
                title : "",
                welcomeMessage : "",
                regDate : "",
                result : [
                { 
                questionbody: '',
                answerType: '',
                count: 0, 
                check : []
                }
              ],
              answer : [],
              isPrint : false,
        }
    }
    componentDidMount(){
        let link ='http://localhost:8080/survey/report/'+this.props.survey_id;
        fetch(link)
        .then(response => response.json())
        .then(data => {
            this.setState({
                survey_id : this.props.survey_id,
                user_id : data.user_id,
                userName : data.username,
                title : data.title,
                welcomeMessage : data.WeMe,
                regDate : data.regDate,
                result : data.result,
                answer : data.answer
            });
        })
        .catch(error => {
          console.log(error);
        });

    }
    decidePrint = (isPrint)=>{
        const buttonStyle = {
            marginLeft: '50%',
          };
    
        if(! isPrint){
           return(
               <div>
                    <div><Sidebar survey_id={this.state.survey_id}
                    user_id={this.state.user_id} 
                    lang={this.props.lang} 
                    styleLang={this.props.styleLang}
                    />  </div>
                    <button onClick={this.printReport} style={buttonStyle} className="btn btn-secondary btn-lg"><i class="fa fa-print" aria-hidden="true"></i> Print </button>
                </div>
                );
        }
        return(<div></div>);
    }
    printReport=async()=>{
        await this.setState({
            isPrint : true 
        })
    
        window.print();
    
        await this.setState({
            isPrint : false 
        })
    
    }
    renderQuestionType=(type,question)=>{
    
        if(type === "mulchoice")
            return(<div> 
                {question.check.map((answer, index) => {
                    return(<li>A {index+1} : {answer.questionBody} , count : {answer.count}</li>)
            })}  </div>);
        else if(type === "checkbox")
            return(<div> 
                {question.check.map((answer, index) => {
                    return(<li>A {index+1} : {answer.questionBody} , count : {answer.count}</li>)
            })}  </div>);    
        else if(type === "textbox")
            return(<div> 
                {question.report.map((answer, index) => {
                    return(<li>A {index+1} : {answer} </li>)
            })}  </div>); 
        else if(type === "essay")
            return(<div> 
                {question.report.map((answer, index) => {
                    return(<li> A {index+1}: {answer} </li>)
            })}  </div>);
        else if(type === "scale")
            return(<div> 
                {question.scale.map((answer, index) => {
                    return(<li>A {index+1} : {answer} </li>)
            })}  </div>); 
        else if(type === "date")
            return(<div> 
                {question.date.map((answer, index) => {
                    return(<li key={index}>A {index+1}: {answer.day} / {answer.month} / {answer.year} </li>)
            })}  </div>);     
           
    }

    render(){

        return(
            <div>
            {this.decidePrint(this.state.isPrint)}
            <div className="report" style={{"marginLeft" : "20%"}} >
                <h2 className="report-item">Creator : {this.state.userName}</h2>
                <h2 className="report-item">Title :  {this.state.title}</h2>
                <h2 className="report-item">Message : {this.state.welcomeMessage}</h2>
                <h2 className="report-item">IN : {this.state.regDate}</h2>
                <h2 className="report-item">Answers Summary : </h2>
                <div style={{"marginLeft" : "10%"}}>
                {
                    this.state.result.map((question, index) => {
                        return (
                            <div>
                                <div key={index}>    
                                    <h2>Q {index+1} : {question.questionbody} ?</h2> 
                                    <h5 style={{"marginLeft" : "10%"}}>Answers : {question.count}</h5>                           
                                    <ul>{
                                        this.renderQuestionType(question.answerType,question)
                                    }</ul> 

                                </div><br />
                            </div>
                        )
                    })
                
                }
                
                </div> 
             </div>
            </div>  
        );
    }
}

export default Report;
