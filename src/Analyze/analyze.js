import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import React from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts/core';
import Column2D from 'fusioncharts/viz/column2d';
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// Resolves charts dependancy
charts(FusionCharts);


class Analyze extends React.Component {
  constructor(){
    super();
    this.state={
      result: [],     
}
}

componentDidMount(){
  let link ='http://localhost:8080/survey/Analzye/'+this.props.survey_id;
  fetch(link)
  .then(response => response.json())
  .then(data => {
      this.setState({
          result : data,
      });
    console.log("data" ,data);
  })
  .catch(error => {
    console.log(error);
  });

}
dataSource=(question) =>{
  let dataSource = {
    chart: {
      caption: "answers count is ",
      plottooltext: "<b>$percentValue</b> of people choice  $label ",
      showlegend: "1",
      showpercentvalues: "1",
      legendposition: "bottom",
      usedataplotcolorforlabels: "1",
      theme: "fusion"
    },
    data: [] }
    dataSource.chart.caption+=question.count;

    question.check.map((answer, index) => {
      dataSource.data.push({
        label: "{"+answer.questionBody+"}",
        value: answer.count
      })
    });
    return <ReactFusioncharts 
    type="pie2d"
    dataFormat="JSON"
    dataSource={dataSource}
  />
}
arithmeticMean=(arr)=>{
    let mean=0 ;
    for(let i=0;i<arr.length;i++){
        mean+=arr[i];
    }
    return mean/arr.length;
}
renderQuestionType=(type,question)=>{
    
        if(type === "mulchoice")
          return (<div> {this.dataSource(question)}</div>);        
        else if(type === "checkbox")
          return (<div> {this.dataSource(question)}</div>);       
        else if(type === "textbox")
            return(<div> 
                {question.report.map((answer, index) => {
                    return(<li>A {index+1} : {answer} </li>)
            })}  </div>); 
        else if(type === "essay")
            return(<div> 
                {question.report.map((answer, index) => {
                    return(<li key={index}> A {index+1}: {answer} </li>)
            })}  </div>);
        else if(type === "scale")
            return(<div>                                
              <li>Arithmetic Mean : {this.arithmeticMean(question.scale)}</li>
            </div>); 
        else if(type === "date")
            return(<div> 
                {question.date.map((answer, index) => {
                    return(<li key={index}>A {index+1}: {answer.day} / {answer.month} / {answer.year} </li>)
            })}  </div>);     
           
}
  render() {
    return (
      <div className="report" style={{marginLeft : "30%"  }} >
                <h2 className="report-item">Analyze Server  </h2>
                <div style={{"marginLeft" : "10%"}}>
                {
                    this.state.result.map((question, index) => {
                        return (
                            <div key={index}>
                                <div >    
                                    <h2>Q {index+1} : {question.questionbody} ?</h2> 
                                    <h5 style={{"marginLeft" : "10%"}}>Answers : {question.count}</h5>                           
                                    {
                                        this.renderQuestionType(question.answerType,question)
                                    }
                                </div><br /><br />
                            </div>
                        )
                    })
                
                }
                
                </div> 
             </div>
    );
  }
}
export default Analyze; 