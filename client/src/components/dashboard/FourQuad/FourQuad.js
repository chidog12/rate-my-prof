import React, { Component } from "react";
import "./FourQuad.scss";

import {
    RadarChart
  } from 'react-vis';



const RADAR_PROPS = {
    domains: [
      {name: 'Goals', domain: [-1, 10]},
      {name: 'Variety', domain: [-1, 10]},
      {name: 'Voice', domain: [-1, 10]},
      {name: 'Exams', domain: [-1, 10]}
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
                wellPreparedNum += (responses[key].Goals === undefined ? 0 : parseInt(responses[key].Goals, 10) );
                askQuestionsNum += (responses[key].Variety === undefined ? 0 : parseInt(responses[key].Variety, 10) );
                conceptNum += (responses[key].Voice === undefined ? 0 : parseInt(responses[key].Voice, 10) );
                niceNum += (responses[key].Exams === undefined ? 0 : parseInt(responses[key].Exams, 10) );
            }());
          });
          wellPreparedNum = wellPreparedNum / Object.keys(responses).length;
          askQuestionsNum = askQuestionsNum / Object.keys(responses).length;
          conceptNum = conceptNum / Object.keys(responses).length;
          niceNum = niceNum / Object.keys(responses).length;

          var dataObj = {
            Goals: wellPreparedNum,
            Variety: askQuestionsNum,
            Voice: conceptNum,
            Exams: niceNum
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