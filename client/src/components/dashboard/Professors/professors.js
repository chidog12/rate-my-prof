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

class professors extends Component {

    componentDidMount() {
        this.props.getProfessors();
    }

    render() {
        return (
            <h1>Hello</h1>
        );
    }
}

professors.propTypes = {
  auth: PropTypes.object.isRequired
};

  const mapStateToProps = state => ({
    auth: state.auth,
    professors: state.professors
  });
  
  export default withRouter(
    connect(
      mapStateToProps,
      { getProfessors }
    )(professors)
  );