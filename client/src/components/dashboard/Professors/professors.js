import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfessors } from "../../../actions/authActions";
import "./professors.scss"
import TableComponent from "../TableComponent/TableComponent"
import Navigation from "../../common/navigationComponent/navigation"

import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter
  } from "react-router-dom";

class professors extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
      this.props.getProfessors();
  }

    render() {
      const { professor } = this.props.auth;

        return (
            <div className="profContainer">
            <div>
              <Navigation/>
            </div>
              <h1>List Of Professors</h1>
              <TableComponent 
                list={professor}
              />
            </div>
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