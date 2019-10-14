import "./report.scss"

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSurveys } from "../../../actions/surveyActions";

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
  }

  componentDidMount(){
    this.props.getSurveys(this.props.match.params.id);
  }

    render() {
        return(
            <div>
                {JSON.stringify(this.props.survey.responses)}
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