import React, { Component } from 'react';


class Publish extends Component {
    

    constructor(){
        super();
        this.state={
            survey_id :'',
        }
    }


/*
    componentDidMount(){
    
        fetch(`http://localhost:8080/survey/publish`)
        .then(response =>  response.json())
          .then(data => {
            this.setState({
                survey_id : data.survey_id,
                           
            });
            console.log("data",data);
          })
          .catch(error => {
            console.log(error);
          });
        
    }*/
    
    
    
    render() {
        
        let style={
            "fontSize" : "25px",
            "color" : "#383f50",
            "width" : "600px",
            "padding" : "20px",
            "marginLeft" : "25%",
            "marginTop" : "2%",
            "textAlign" : "left"
        };

        let link=`http://localhost:3000/userpreview/${this.props.survey_id}`;

        return (
            <div className="textbox">
                <label style={style} >Share your survey via this web link : </label>
                <br />
                <input name="text" type="text" value={link} style={style} />
              
            </div>
        );
    }

}
export default Publish;

