import React, { Component } from "react";
import "./AverageRating.scss"

class AverageRating extends Component{

    averageRating(){
        var ratingList = [];
        var avg = 0;

        this.props.responses.map((response) =>
            ratingList.push(response.rating)
        );

        console.log(ratingList);

        return(this.trimmedMean(ratingList,20));
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

    render(){
        return(
            <div className='avgRating'>
                <div className='title'>
                    <h3>Average Rating</h3>
                </div>
                <div className='number'>
                    <h1>{this.averageRating()}</h1>
                </div>
            </div>
        );
    }
}
export default AverageRating;