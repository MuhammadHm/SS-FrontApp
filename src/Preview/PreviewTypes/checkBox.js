import React, { Component } from 'react';

class Checkbox extends Component {

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
    componentDidMount(){
        this.getChoicesArray();
    }
    
    
    getChoicesArray=()=>{
        this.setState({
            choicesArray : this.props.choicesArray
        });
    }

    
    render() {
        
        return (
            <div className="mulChoice">
               
               <div className="control">
                {
                    this.state.choicesArray.map((choice, index) => {
                        return (
                            <div className="checkbox" key={index+1}>
                                <label>
                                    <input type="checkbox" name="choice" />
                                    <span>  {choice.body}</span> 

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
export default Checkbox;


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