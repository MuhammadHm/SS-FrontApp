import React, { Component } from 'react';

class Scale extends Component {

    constructor() {
        super();
        this.state = {
            value : '',
            min : '',
            max : '',
            step : ''
        }
    }
    componentDidMount(){
        this.getParams();
    }
    
    handleScale=(e)=>{
            this.setState({
                value : e.target.value
            });
    }
  
    getParams=()=>{
        this.setState({
            min : this.props.answers.min,
            max : this.props.answers.max,
            step: this.props.answers.step,
        });
    }
    
    render() {

        return (
            <div>

                <div className="d-flex justify-content-center my-4">
                    <div className="range-field w-50">
                    <span className="font-weight-bold blue-text mr-2 mt-1">{this.state.min}</span>
                    <input className="border-0" type="range" min={this.state.min} max={this.state.max} step={this.state.step} onChange={this.handleScale}/>
                    <span className="font-weight-bold blue-text ml-2 mt-1">{this.state.max}</span>
                    </div>
                </div>

                <div>
                <div >
                    <label className="value">Value : </label>
                    <label > {this.state.value}</label>
                </div>
            </div>
               
          </div>
        );
    }

}
export default Scale;

