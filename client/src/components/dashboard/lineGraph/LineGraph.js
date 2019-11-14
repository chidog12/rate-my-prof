import React, { Component } from "react";
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries,
    LineSeriesCanvas
  } from 'react-vis';

import './LineGraph.scss'

class LineGraph extends Component{

    state = {
        useCanvas: false 
      };


    makeDataObj(){
        var dataObj = {};
        var arr = [];
        var count = 1;
        var responses = this.props.responses || {};

        Object.keys(responses).map(function(key, index) {
            arr.push(
                {
                    x: (Number(key)+1),
                    y: parseInt(responses[key].rating, 10)
                }
            )
          });

          dataObj = {arr};
          return(arr);
    }

    render(){

        const {useCanvas} = this.state;
        const Line = useCanvas ? LineSeriesCanvas : LineSeries;


        return(
            <div className='lineGraphComponent'>
                <div>
                    <XYPlot width={500} height={300}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <XAxis />
                    <YAxis />
                    <ChartLabel 
                        text="Students"
                        className="alt-x-label"
                        includeMargin={false}
                        xPercent={0.06}
                        yPercent={0.06}
                        />

                    <ChartLabel 
                        text="Ratings"
                        className="alt-y-label"
                        includeMargin={false}
                        xPercent={0.06}
                        yPercent={0.06}
                        style={{
                        transform: 'rotate(-90)',
                        textAnchor: 'end'
                        }}
                        />
                    <LineSeries
                        className="first-series"
                        style={{
                            strokeLinejoin: 'round',
                            strokeWidth: 4
                          }}
                        data={this.makeDataObj()}
                    />
                    
                    </XYPlot>
                </div>
            </div>
        );
    }
}
export default LineGraph;