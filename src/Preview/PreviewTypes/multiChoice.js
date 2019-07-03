import React, { Component } from 'react';
import "./checkBox.css";

class MultiChoice extends Component {

    constructor() {
        super();
        this.state = {
            
            choicesArray: [             
                 /* { body : ''} */             
            ],

            answersArray : [
                /*{
                    body : '',
                    checked : false
                }*/
             ]
        }
    }

    componentDidMount(){
        this.getChoicesArray();
    }
    
    getChoicesArray=()=>{

        let answersArray=[...this.props.choicesArray];
        for(let i=0;i<answersArray.length;i++)
            answersArray[i]={ body : answersArray[i].body ,  checked : false };

        this.setState({
            choicesArray : this.props.choicesArray,
            answersArray : answersArray
        });
    }

    handleInput=(index,e)=>{
        
        let answersArray= this.state.answersArray;
        for(let i=0;i<answersArray.length;i++)
            answersArray[i]={ body : answersArray[i].body ,  checked : false };

        answersArray[index]= { body : answersArray[index].body , checked : e.target.checked };
        this.setState({
                answersArray : answersArray
        });

    } 
    passState=()=>{
        this.props.getInput(this.state.answersArray,"mulchoice",this.props.body,this.props.id_question);
     }

    onClick=(index,e)=>{
        this.handleInput(index,e);
        this.passState();
    }
    render() {
        
        return (
            <div className="mulChoice">
               
                <div className="control">
                {                   
                    this.state.choicesArray.map((choice, index) => {
                        return (
                            <div className="radio" key={index+1}>
                                <label>
                                    <input onChange={this.onClick.bind(this,index)} type="radio" name="choice" />
                                    <span> {choice.body}</span> 
                                </label>       
                            </div> 
                        )
                    })
                 }
                </div>

            </div>
        );
    }

}
export default MultiChoice;


/*class Parent extends React.Component {
    render() {
        return (
            <Child example="foo" />
        )
    }
}

class Child extends React.component {
    render() {
        return (
            <h1>{this.props.example}</h1>
        )
    }
}*/