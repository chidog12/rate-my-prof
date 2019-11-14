import "./report.scss"

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSurveys } from "../../../actions/surveyActions";
import TextCollapseComponent from "./TextCollapseComponent/TextCollapseComponent";
import Navigation from "../../common/navigationComponent/navigation"
import AverageRating from "../AverageRating/AverageRating"
import LineGraph from "../lineGraph/LineGraph"

import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter
  } from "react-router-dom";

class report extends Component {

  constructor() {
    super();
    this.state = {
        responses: []
    };

    this.responses = this.responses.bind(this);
  }

  responses(){
    const responseItems = this.props.survey.responses.map((response) =>
      <TextCollapseComponent key={response.name} 
        title={response.name}
        text={response.review}
        rating={response.rating}
      />
    );

    return(
      responseItems
    )
  }

  componentDidMount(){
    this.props.getSurveys(this.props.match.params.id);
  }

    render() {
        return(
            <div>
              <div>
                <Navigation />
              </div>
              <div className="averageRating">
                <AverageRating 
                  responses={this.props.survey.responses}
                />
              </div>
              <div className='lineGraph'>
                <h1>Line Graph</h1>
                <LineGraph 
                  responses={this.props.survey.responses}
                />
              </div>
              <div className='responseContainer'>
                <h1>Responses</h1>
                <div className='responses'>
                  {this.responses()}
                </div>
              </div>
            </div>
        );
    }
}

report.propTypes = {
  auth: PropTypes.object.isRequired
};

  const mapStateToProps = state => ({
    auth: state.auth,
    survey: state.survey
  });
  
  export default withRouter(
    connect(
      mapStateToProps,
      { getSurveys }
    )(report)
  );