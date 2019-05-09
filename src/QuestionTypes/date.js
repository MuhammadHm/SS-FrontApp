import React, { Component } from 'react';


class Date extends Component {
    
    
    render() {
        let style={
            width : "8%",
            margin : "0.6%",
            textAlign : "center"
        };
        
        return (
            <div className="textbox">

                <input name="day" type="text" style={style} placeholder= "Day" />/
                <input name="month" type="text" style={style} placeholder= "Month" />/
                <input name="year" type="text" style={style} placeholder= "Year" /> 
                <br />
                <input name="time" type="text" style={{margin : "0.6%"}} placeholder= "Time" />


            </div>
        );
    }

}
export default Date;

