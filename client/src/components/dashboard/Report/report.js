import "./report.scss"

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfessors } from "../../../actions/authActions";

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
    };
  }

    render() {
        return(
            <div>
                <p>Report</p>
            </div>
        );
    }
}

report.propTypes = {
  auth: PropTypes.object.isRequired
};

  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default withRouter(
    connect(
      mapStateToProps
    )(report)
  );