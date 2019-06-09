import React, { Component } from 'react';


class Textbox extends Component {
    
    constructor() {
        super();
        this.state = {
           // answer : ''
        }
    }

    handleInput= (e)=>{
        this.setState({
            answer : e.target.value
        });
    }
    passState=()=>{
        this.props.getInput(this.state.answer,"textbox",this.props.body);
    }
    onClick=(e)=>{
        this.handleInput(e);
        this.passState();
    }
    render() {

        return (
            <div className="textbox">

                <input onChange={this.onClick.bind(this)} onBlur={this.onClick.bind(this)} name="text" type="text" />
   
            </div>
        );
    }

}
export default Textbox;
