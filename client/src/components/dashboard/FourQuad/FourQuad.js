import React, { Component } from "react";
import "./FourQuad.scss";

import {
    RadarChart
  } from 'react-vis';



const RADAR_PROPS = {
    domains: [
      {name: 'wellPrepared', domain: [-1, 10]},
      {name: 'askQuestions', domain: [-1, 10]},
      {name: 'concept', domain: [-1, 10]},
      {name: 'nice', domain: [-1, 10]}
    ],
    height: 400,
    width: 500
  };

class FourQuad extends Component{

    makeDataObj(){
        var arr = [];
        var wellPreparedNum = 0;
        var askQuestionsNum = 0;
        var conceptNum = 0;
        var niceNum = 0;
        var responses = this.props.responses || {};

        Object.keys(responses).map(function(key, index) {
            (function(){
                wellPreparedNum += (responses[key].wellPrepared === undefined ? 0 : parseInt(responses[key].wellPrepared, 10) );
                askQuestionsNum += (responses[key].askQuestions === undefined ? 0 : parseInt(responses[key].askQuestions, 10) );
                conceptNum += (responses[key].concept === undefined ? 0 : parseInt(responses[key].concept, 10) );
                niceNum += (responses[key].nice === undefined ? 0 : parseInt(responses[key].nice, 10) );
            }());
          });
          wellPreparedNum = wellPreparedNum / Object.keys(responses).length;
          askQuestionsNum = askQuestionsNum / Object.keys(responses).length;
          conceptNum = conceptNum / Object.keys(responses).length;
          niceNum = niceNum / Object.keys(responses).length;

          var dataObj = {
              wellPrepared: wellPreparedNum,
              askQuestions: askQuestionsNum,
              concept: conceptNum,
              nice: niceNum
          }

          console.log(dataObj);

          arr[0]=dataObj;

          return(arr);
    }

    render(){
        return(
            <div className='FourQuad'>
                <RadarChart
                    data={this.makeDataObj()}
                    domains={RADAR_PROPS.domains}
                    height={RADAR_PROPS.height}
                    width={RADAR_PROPS.width}
                    startingAngle={Math.PI / 7}
                    className="overflow-okay horizontally-centered"
                    style={{
                        labels: {
                        fontSize: 13
                        },
                        polygons: {
                        fillOpacity: 0.1,
                        strokeOpacity: 1,
                        strokeWidth: 0.5
                        }
                    }}
                />
            </div>
        );
    }
}
export default FourQuad;