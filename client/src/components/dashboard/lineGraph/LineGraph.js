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

    
    makeAvgObj(){
        var ratingList = [];
        var avg = 0;

        this.props.responses.map((response) =>
            ratingList.push(response.rating)
        );

        for(var x in ratingList){
            avg += parseInt(ratingList[x], 10);
        }

        avg = this.trimmedMean(ratingList,20);

        var dataObj = {};
        var arr = [];
        var count = 1;
        var responses = this.props.responses || {};

        Object.keys(responses).map(function(key, index) {
            arr.push(
                {
                    x: (Number(key)+1),
                    y: avg
                }
            )
          });

          dataObj = {arr};
          return(arr);
    }

    trimmedMean(list, proportion){
        var newList = list;
        var avg = 0;

        newList.sort(function(a, b){return a-b});
        console.log("NewList 1: " + newList);

        var p = proportion/100;
        var np = Math.trunc(p*(newList.length));
        console.log("P: " + p);
        console.log("NP: " + np);

        if(np*2 <= list.length){

            for(var x=0; x<np; x++){
                newList.shift();
            }

            for(var y=0; y<np; y++){
                newList.pop();
            }
            
        }

        console.log("NewList: " + newList);

        for(var x in newList){
            avg += parseInt(newList[x], 10);
        }

        return(Math.round((avg/newList.length) * 10) / 10);
    }


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

                    <Line
                        className="first-series"
                        data={this.makeAvgObj()}
                    />
                    
                    </XYPlot>
                </div>
            </div>
        );
    }
}
export default LineGraph;