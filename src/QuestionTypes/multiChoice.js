import React, { Component } from 'react';
import './multiChoice.css'

class MultiChoice extends Component {

    constructor() {
        super();
        this.state = {
            choicesArray: [
                /*{
                   body : '',
                }*/
            ],
            Body: ""
        }
    }

    addChoiceHandler = () => {
        let arr = this.state.choicesArray;
        arr.push({ body: this.state.Body });
        this.setState({
            choicesArray: arr
        });

    }
    deleteChoiceHandler = (index) => {
        let arr = this.state.choicesArray;
        arr.splice(index,1); 
        this.setState({
            choicesArray: arr
        });

    }
    setChioceText = (e) => {
        this.setState({
            Body: e.target.value
        });
    }
    passChoicesArray=()=>{
        this.props.answers(this.state.choicesArray);
    }

    
    render() {
        
        return (
            <div className="mulChoice">
                <input name="choice" type="text" placeholder="Enter choice" onChange={this.setChioceText} />
                <button onClick={()=>{this.addChoiceHandler();this.passChoicesArray()}} className="btn btn-success">Add Choice</button>

                <div className="control">
                {
                    this.state.choicesArray.map((choice, index) => {
                        return (
                            <div className="radio" key={index+1}>
                                <label>
                                    <input type="radio" name="choice" />
                                    <span>  {choice.body}</span> 
                                    <button onClick={this.deleteChoiceHandler.bind(this,index)} class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true"> &times; </span>  </button>

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