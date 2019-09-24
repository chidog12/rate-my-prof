import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSurvey } from "../../actions/surveyActions";

import "./survey.scss";
import "../auth/Auth.scss";


class Survey extends Component {

    constructor() {
        super();
        this.state = {
          name: "",
          rating: 0,
          review: "",
          profId: {}
        };
      }

    onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
    
        const newSurvey = {
            name: this.state.name,
            rating: this.state.rating,
            review: this.state.review,
            profId: this.setState({profId: this.props.match.params.id})
          };
    
        this.props.createSurvey(this.state.profId, newSurvey);
        console.log("clicked");
      };


    render(){
        return (
            <form className="survey-form" noValidate onSubmit={this.onSubmit}>
                <div className="auth-label">Name</div>
                <input
                    onChange={this.onChange}
                    value={this.state.name}
                    id="name"
                    type="text"
                    className="auth-input"
                />

                <div className="auth-label">Rating</div>
                <input
                    onChange={this.onChange}
                    value={this.state.rating}
                    id="rating"
                    type="number"
                    className="auth-input"
                />

                <div className="auth-label">review</div>
                <input
                    onChange={this.onChange}
                    value={this.state.review}
                    id="review"
                    type="text"
                    className="auth-input"
                />      
                <button type="submit" className="auth-button">
                    Sign up
                </button>      
            </form>
        );
    }
}

Survey.propTypes = {
    newSurvey: PropTypes.func.isRequired
    };

const mapStateToProps = state => ({
    auth: state.auth
    });

export default connect(
    mapStateToProps,
    { createSurvey }
    )(withRouter(Survey));