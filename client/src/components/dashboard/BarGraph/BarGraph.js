import React, { Component } from "react";
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalGridLines,
    VerticalBarSeries
  } from 'react-vis';
  
class BarGraph extends Component{

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
        return(
            <div className="barGraph">
                <XYPlot xType="ordinal" width={500} height={300} xDistance={100}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries data={this.makeDataObj()} />
                </XYPlot>
                
            </div>
        );
    }

}
export default BarGraph;