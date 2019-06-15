import React, { Component } from 'react';



class Responses extends Component {

    constructor(){
        super();
        this.state={

        }
    }
    componentDidMount(){
        fetch(`http://localhost:8080/results/getresult/${this.props.survey_id}`)
        .then(response =>  response.json())
          .then(data => {
            this.setState({
              
            });
            console.log(this.state);
          })
          .catch(error => {
            console.log(error);
          });

    }



    render(){

        return(
            <div>hello </div>
        );

    }

}

export default Responses;

