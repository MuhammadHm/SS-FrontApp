import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const chartConfigs = {
    type: 'Pie2D',
    width: 450,
    height: 250,
    dataFormat: 'json',
    dataSource: {
        "chart": {
            "caption": "Market Share of Web Servers",
            "plottooltext": "<b>$percentValue</b> of web servers run on $label servers",
            "showPercentValues": "1",
            "useDataPlotColorForLabels": "1",
            "enableMultiSlicing": "0",
            "theme": "fusion"
        },
        "data": [{
            "label": "Apache",
            "value": "32647479"
        }, {
            "label": "Microsoft",
            "value": "22100932"
        }, {
            "label": "Zeus",
            "value": "14376000"
        }, {
            "label": "Other",
            "value": "18674221"
        }]
    }
};

class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chart: {},
            currentVal: 'none'
        }
        this.renderComplete = this.renderComplete.bind(this);
        this.radioHandler = this.radioHandler.bind(this);
        this.sliceClicked = this.sliceClicked.bind(this);
    }

    renderComplete(chart) {
        this.setState({
            chart
        });
    }

    // Handler for radio buttons to slice data plot.
    radioHandler(e) {
        if (e.currentTarget.value === 'none') {
            this.state.chart.options.dataSource.data.map((data, index) => {
                this.state.chart.slicePlotItem(index, false);
            });
        } else {
            this.state.chart.slicePlotItem(e.currentTarget.value, true);
        }
        this.setState({
            currentVal: e.currentTarget.value
        });
    }

    // Event callback for 'dataplotClick'.
    // Makes the relevant radio active when a plot is clicked.
    sliceClicked(eventObj, dataObj) {
        this.setState({
            currentVal: eventObj.data.isSliced ? 'none' : eventObj.data.dataIndex
        });
    }

    render() {
        return (
            <div>
              <ReactFC
                {...chartConfigs}
                onRender={this.renderComplete}
                fcEvent-dataplotClick={this.sliceClicked}
              />
              <br />
              <center>
                <span>Slice out:</span>
                <div className="change-type">
                  <div>
                    <input
                      type="radio"
                      value="none"
                      onChange={this.radioHandler}
                      checked={this.state.currentVal === 'none'}
                    />
                    <label>None</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="0"
                      onChange={this.radioHandler}
                      checked={parseInt(this.state.currentVal) === 0}
                    />
                    <label>Apache</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="1"
                      onChange={this.radioHandler}
                      checked={parseInt(this.state.currentVal) === 1}
                    />
                    <label>Microsoft</label>
                  </div>
                  <div>
                    <input
                      type="radio" 
                      value="2"
                      onChange={this.radioHandler}
                      checked={parseInt(this.state.currentVal) === 2}
                    />
                    <label>Zeus</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="3"
                      onChange={this.radioHandler}
                      checked={parseInt(this.state.currentVal) === 3}
                    />
                    <label>Other</label>
                  </div>
                </div>
              </center>
            </div>
        )
    }
}


export default Chart;