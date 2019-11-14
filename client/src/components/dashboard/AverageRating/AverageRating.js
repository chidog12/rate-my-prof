import React, { Component } from "react";
import "./AverageRating.scss"

class AverageRating extends Component{

    averageRating(){
        var ratingList = [];
        var avg = 0;

        this.props.responses.map((response) =>
            ratingList.push(response.rating)
        );

        for(var x in ratingList){
            avg += parseInt(ratingList[x], 10);
        }

        avg = Math.round((avg/ratingList.length) * 10) / 10;

        return(avg)
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