import React, { Component } from 'react';
import './essay.css'

class Date extends Component {
    
    
    render() {
        let style={
            width : "4%"  ,
            textAlign : "center"
        };
        
        return (
            <div className="textbox">
                <input  name="day" type="text" style={style} placeholder= {this.props.lang.Day} />
                <input  name="month" type="text" style={style} placeholder= {this.props.lang.Month} />
                <input  name="year" type="text" style={style} placeholder= {this.props.lang.Year}  /> 
            </div>
        );
    }

}
export default Date;

