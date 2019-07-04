import React, { Component } from 'react';
import './scale.css'

class Scale extends Component {

    constructor() {
        super();
        this.state = {
            min : 0,
            max : 10,
            step : 1
        }
    }
    
   
    handleMin=(e)=>{
        this.setState({
            min : e.target.value
        });
       
    }
    handleMax=(e)=>{
        this.setState({
            max : e.target.value
        });
       
    }
    handleStep=(e)=>{
        this.setState({
            step : e.target.value
        });
       
    }
    passParams=()=>{
        let params={
            min : this.state.min,
            max : this.state.max,
            step : this.state.step,
        };
        this.props.answers(params);
    }
    
    render() {

        return (
            <div>
                <div  >
                    <label className="value">{this.props.lang.Minvalue} : </label>
                    <input onBlur={this.passParams} type="text"  className="value" onChange={this.handleMin} placeholder="0" />
                </div>
                
                <div >
                    <label className="value">{this.props.lang.Maxvalue} : </label>
                    <input onBlur={this.passParams} type="text"  className="value" onChange={this.handleMax} placeholder="10" />
                </div>

                <div >
                    <label className="value">{this.props.lang.Step} : </label>
                    <input onBlur={this.passParams} type="text"  className="value" onChange={this.handleStep} placeholder="1" />
                </div>
       
                <div className="d-flex justify-content-center my-4">
                    <div className="range-field w-50">
                    <span className="font-weight-bold blue-text mr-2 mt-1">{this.state.min}</span>
                    <input className="border-0" type="range" min={this.state.min} max={this.state.max} step={this.state.step} />
                    <span className="font-weight-bold blue-text ml-2 mt-1">{this.state.max}</span>
                    </div>
                </div>

                <div>
                
            </div>
               
          </div>
        );
    }

}
export default Scale;

