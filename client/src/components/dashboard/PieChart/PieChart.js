import React, { Component } from "react";
import './PieChart.scss'
import Sentiment from 'sentiment'

import {
    RadialChart
  } from 'react-vis';

class PieChart extends Component{


    makeDataObj(){
        var responses = this.props.responses || {};
        var positive = 0;
        var negative = 0;
        var neutral = 0;

        Object.keys(responses).map(function(key, index) {
            (function(){
                var sentiment = new Sentiment();
                var calc = sentiment.analyze(responses[key].review);
                var score = calc.score;

                if (score <= -3){
                    negative++;
                } else if (score > -3 && score < 3){
                    neutral++;
                } else if (score >= 3){
                    positive++;
                } else {
                    
                  }
            }());
          });
          console.log(positive);
          console.log(negative);
          console.log(neutral);

          return([
              {
                  angle: Number(positive),
                  label: 'Positive: ' + positive
              },
              {
                  angle: Number(neutral),
                  label: 'Neutral: '+ neutral
              },
              {
                  angle: Number(negative),
                  label: 'Negative: '+ negative
              }
          ]);
    }

    render(){
        return(
            <div className='Piechart'>
                <RadialChart
                    data={this.makeDataObj()}
                    width={300}
                    height={300} 
                    showLabels={true}
                    labelsStyle={{
                        fontSize: 15,
                        fill: 'black'
                    }}
                />
            </div>
        );
    }
}

export default PieChart;