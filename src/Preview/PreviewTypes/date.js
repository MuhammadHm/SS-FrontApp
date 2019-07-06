import React, { Component } from 'react';


class Date extends Component {
    
    constructor() {
        super();
        this.state = {
        /*
            day : 1 ,
            month : 1,
            year : 2019
        */
        }
    }

    handleInput=(e)=>{
        
        if(e.target.name ==="day")
            this.setState({
                day : e.target.value   
            });
        else  if(e.target.name ==="month")
            this.setState({
                month : e.target.value   
            }); 
        else  if(e.target.name ==="year")
            this.setState({
                year : e.target.value   
            });  

    }
    passState=()=>{
        this.props.getInput(this.state,"date",this.props.body,this.props.id_question);
    }
    onClick=(e)=>{
        this.handleInput(e);
        this.passState();
    }

    render() {
        let style={
            width : "4%",
            margin : "50px",
            textAlign : "center"
        };
        
        return (
            <div className="textbox">

                <input onChange={this.onClick.bind(this)} onBlur={this.onClick.bind(this)} name="day" type="text" style={style} placeholder= "Day" />/
                <input onChange={this.onClick.bind(this)} onBlur={this.onClick.bind(this)} name="month" type="text" style={style} placeholder= "Month" />/
                <input onChange={this.onClick.bind(this)} onBlur={this.onClick.bind(this)} name="year" type="text" style={style} placeholder= "Year" /> 
    
            </div>
        );
    }

}
export default Date;

