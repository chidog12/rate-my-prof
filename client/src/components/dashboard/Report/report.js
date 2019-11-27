import "./report.scss"

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSurveys } from "../../../actions/surveyActions";
import { getProfessorsByID } from "../../../actions/authActions";
import TextCollapseComponent from "./TextCollapseComponent/TextCollapseComponent";
import Navigation from "../../common/navigationComponent/navigation"
import AverageRating from "../AverageRating/AverageRating"
import LineGraph from "../lineGraph/LineGraph"
import BarGraph from "../BarGraph/BarGraph"
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
    this.props.getProfessorsByID(this.props.match.params.id);
  }

    render() {
      const { professor } = this.props.auth;
      console.log(this.props.auth.profName)

      if ((this.props.auth.user.name == this.props.auth.profName) || this.props.auth.user.employeeType == "admin"){
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
                <h1>Ratings Graph for {this.props.auth.profName}</h1>
                <BarGraph 
                  responses={this.props.survey.responses}
                />
              </div>
              <div className='FourQuadComponent'>
                <h1>Professor Qualities</h1>
                <div className='fourQuadLegend'>
                  <p><strong>Goals</strong> = The instructor clearly communicated the goals and objectives for the course</p>
                  <p><strong>Variety</strong> = The instructor uses a variety of teaching resources other than the textbook</p>
                  <p><strong>Voice</strong> = The instructor's voice and speech are audible and clear </p>
                  <p><strong>Exams</strong> = The assignments and exams are clear</p>
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
      } else {
        return(
          <div>
            <div>
              <Navigation />
            </div>
            <div>
              <h1>NO ACCESS</h1>
            </div>
          </div>
      );
      }
    }
}

report.propTypes = {
  auth: PropTypes.object.isRequired
};

  const mapStateToProps = state => ({
    auth: state.auth,
    survey: state.survey,
    profName: state.profName
  });
  
  export default withRouter(
    connect(
      mapStateToProps,
      { getSurveys,
        getProfessorsByID }
    )(report)
  );