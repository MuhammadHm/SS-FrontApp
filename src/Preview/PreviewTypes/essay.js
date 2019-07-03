import React, { Component } from 'react';

class Essay extends Component {
    
    constructor() {
        super();
        this.state = {
           /* answer : ''*/
        }
    }

    handleInput= (e)=>{
        this.setState({
            answer : e.target.value
        });
    }
    passState=()=>{
        this.props.getInput(this.state.answer,"essay",this.props.body,this.props.id_question);
    }
    onClick=(e)=>{
        this.handleInput(e);
        this.passState();
    }

    render() {

        return (
            <div className="essay">

                <textarea onChange={this.onClick.bind(this)} onBlur={this.onClick.bind(this)} rows="7" className="textArea"></textarea>
                

            </div>
        );
    }

}
export default Essay;

