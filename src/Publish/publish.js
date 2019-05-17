import React, { Component } from 'react';


class Publish extends Component {
    

    constructor(){
        super();
        this.state={
            survey_id :'',
        }
    }



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
        
    }
    
    
    
    render() {
        
        let style={
            "font-size" : "25px",
            "color" : "#1E1E1E",
            "width" : "600px",
            "padding" : "20px",
            "margin" : "20px"
        };

        let link=`http://localhost:3000/preview/${this.state.survey_id}`;

        return (
            <div className="textbox">
                <label style={style} > Link to your Survey : </label>
                <br />
                <input name="text" type="text" value={link} style={style} />
              
            </div>
        );
    }

}
export default Publish;

