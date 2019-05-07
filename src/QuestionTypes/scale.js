import React, { Component } from 'react';

class Scale extends Component {

    constructor() {
        super();
        this.state = {
            value : 0,
            min : 0,
            max : 100,
            step : 1
        }
    }
    
    handleScale=(e)=>{
            this.setState({
                value : e.target.value
            });
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
            value : this.state.value
        };
        this.props.answers(params);
    }
    
    render() {

        return (
            <div>
                <div >
                    <label >Min</label>
                    <input onBlur={this.passParams} type="text"  className="value" onChange={this.handleMin}/>
                </div>
                
                <div >
                    <label >Max</label>
                    <input onBlur={this.passParams} type="text"  className="value" onChange={this.handleMax}/>
                </div>

                <div >
                    <label >Step</label>
                    <input onBlur={this.passParams} type="text"  className="value" onChange={this.handleStep}/>
                </div>
       
                <div className="d-flex justify-content-center my-4">
                    <div className="range-field w-50">
                    <span className="font-weight-bold blue-text mr-2 mt-1">{this.state.min}</span>
                    <input className="border-0" type="range" min={this.state.min} max={this.state.max} step={this.state.step} onChange={this.handleScale}/>
                    <span className="font-weight-bold blue-text ml-2 mt-1">{this.state.max}</span>
                    </div>
                </div>

                <div>
                <div >
                    <label >Value</label>
                    <input onBlur={this.passParams} type="text"  className="value" value={this.state.value}/>
                </div>
            </div>
               
          </div>
        );
    }

}
export default Scale;

