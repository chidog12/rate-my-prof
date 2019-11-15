import "./report.scss"

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSurveys } from "../../../actions/surveyActions";
import TextCollapseComponent from "./TextCollapseComponent/TextCollapseComponent";
import Navigation from "../../common/navigationComponent/navigation"
import AverageRating from "../AverageRating/AverageRating"
import LineGraph from "../lineGraph/LineGraph"
import FourQuad from "../FourQuad/FourQuad"
import PieChart from "../PieChart/PieChart"

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
    const responseItemsAdmin = this.props.survey.responses.map((response) =>
      <TextCollapseComponent key={response.name} 
        title={response.name}
        text={response.review}
        rating={response.rating}
      />
    );

    const responseItemsProf = this.props.survey.responses.map((response) =>
      <TextCollapseComponent key={response.name} 
        title='Hidden'
        text={response.review}
        rating={response.rating}
      />
    );

    return(
      (this.props.auth.user.employeeType === "admin") ? responseItemsAdmin : responseItemsProf
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
              <div className='topCharts'>
                <div className='lineGraph'>
                  <h1>Ratings Graph</h1>
                  <LineGraph 
                    responses={this.props.survey.responses}
                  />
                </div>
                <div className='FourQuadComponent'>
                  <h1>Professor Qualities</h1>
                  <div className='fourQuadLegend'>
                    <p><strong>wellPrepared</strong> = Professor Was Always Prepared</p>
                    <p><strong>askQuestions</strong> = Professor Allowed You To Ask Questions</p>
                    <p><strong>concept</strong> = Professor Had A Strong Understanding Of The Concepts </p>
                    <p><strong>nice</strong> = Professor Is Very Nice</p>
                  </div>
                  <FourQuad 
                    responses={this.props.survey.responses}
                  />
                </div>
                <div className='PieChartComponent'>
                  <h1>Response Sentiment</h1>
                    <PieChart 
                      responses={this.props.survey.responses}
                    />
                </div>
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