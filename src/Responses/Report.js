import React, { Component } from 'react';
import Sidebar from './../Side Bar/Sidebar'
import MultiChoice from './../Preview/PreviewTypes/multiChoice';
import Checkbox from './../Preview/PreviewTypes/checkBox';
import Textbox from './../Preview/PreviewTypes/textbox';
import Essay from './../Preview/PreviewTypes/essay';
import Scale from './../Preview/PreviewTypes/scale';
import Date from './../Preview/PreviewTypes/date';
import Preview from './../Preview/Preview';

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
          console.log("data" ,data.result);
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
                    user_id={this.state.user_id} />  </div>
                    <button onClick={this.printReport} style={buttonStyle} className="btn btn-secondary btn-lg">Print Report</button>
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
    renderQuestionType=(type,answers,questionBody)=>{
    
        if(type === "mulchoice")
            return(<div> <MultiChoice choicesArray={answers}  /> </div>);
        else if(type === "checkbox")
            return(<div>  <Checkbox choicesArray={answers}  /> </div>);      
        else if(type === "textbox")
            return(<div> <Textbox  /> </div>); 
        else if(type === "essay")
            return(<div> <Essay  /> </div>); 
        else if(type === "scale")
            return(<div> <Scale answers={answers}   /> </div>); 
        else if(type === "date")
            return(<div> <Date  /> </div>);     
           
    }


    render(){

        return(
            <div>
            {this.decidePrint(this.state.isPrint)}
            <div style={{"marginLeft" : "20%"}} >
                <h1>Creator : {this.state.userName}</h1>
                <h1>Title :  {this.state.title}</h1>
                <h1>Message : {this.state.welcomeMessage}</h1>
                <h1>IN : {this.state.regDate}</h1>
                <h1>Answers Summary : </h1>
                <div style={{"marginLeft" : "10%"}}>
                {
                    this.state.result.map((question, index) => {
                        return (
                            <div key={index}>    
                                <h2>Q {index+1} : {question.questionbody}</h2> <span>Answers Count : {question.count}</span>
                                                              
                            </div>
                        )
                    })
                
                }
                <div>{
                    this.state.answer.map((answer, index) => {
                        return(
                        <div key={index}>
                        {answer[0].answer[0].body}
                    
                        </div>)
                    })
                }</div> 
                </div> 
             </div>
            </div>  
        );
    }
}

export default Report;

/*
   {
                    this.state.result.map((question, index) => {
                        return (
                            <div>    
                                <div>Q : {index+1} {question.questionbody}</div>
                                <div> {question.answerType}</div>
                                <div> {question.count}</div>
                            </div>
                        )
                    })
                }

*/ 