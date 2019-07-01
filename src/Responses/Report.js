import React, { Component } from 'react';



class Report extends Component {

    constructor(){
        super();
        this.state={
            userName : "",
                title : "",
                welcomeMessage : "",
                regDate : "",
                result : "",
        }
    }
    componentDidMount(){
        let link ='http://localhost:8080/survey/report/'+this.props.survey_id;
        console.log("id " ,this.props.survey_id)
        fetch(link)
        .then(response => response.json())
        .then(data => {
            this.setState({
                userName : data.username,
                title : data.title,
                welcomeMessage : data.WeMe,
                regDate : data.regDate,
                result : data.result,
            });
          console.log("data" ,data);
        })
        .catch(error => {
          console.log(error);
        });

    }

   result = ()=>{
    let result = this.state.result
    for(let i=0;i<result.length;i++){
        console.log(result[i].questionbody)
    }
        
   } 

    render(){

        return(
            <div style={{"marginLeft" : "50%"}} >
                <h1>User name : {this.state.userName}</h1>
                <h1>title : {this.state.title}</h1>
                <h1>Welcome Message : {this.state.welcomeMessage}</h1>
                <h1>regDate : {this.state.regDate}</h1>
                
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