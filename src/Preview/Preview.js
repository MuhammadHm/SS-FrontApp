import React,{Component} from 'react';
import QuestionPrev from './QuestionPrev';



class Preview extends Component {


constructor(){
    super();
    this.state={
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
    fetch('http://localhost:8080/survey/sendsurvey')
    .then(response =>  response.json())
      .then(data => {
        this.setState({

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


render(){

    return(

    <div>
        <h1>{this.state.title}</h1>
        <h3>{this.state.welcomeMessage}</h3>

        <ul>
        {                  
            this.state.questionsArray.map((question,index)=>{
                return(
                    <div key={index}>
                        <li >
                            <QuestionPrev 
                            question_id={question.id}
                            body={question.body} 
                            answerType={question.answerType} 
                            answers={question.answers} 
                            isRequired={question.isRequired}/>
                        </li>
                    </div>
                );
            })
        }
            
        </ul>
    </div>

    );
}
}


export default Preview;
