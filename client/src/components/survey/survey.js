import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSurvey } from "../../actions/surveyActions";
import Navigation from "../common/navigationComponent/navigation"

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
        this.setState({profId: this.props.match.params.id});
    
        const newSurvey = {
            name: this.state.name,
            rating: this.state.rating,
            review: this.state.review,
            profId: this.state.profId
          };
        console.log(newSurvey);
    
        this.props.createSurvey(newSurvey, this.state.profId);
        console.log("clicked");
        this.props.history.push("/");
      };


      componentDidMount(){
        this.setState({profId: this.props.match.params.id});
      }


    render(){
        return (
            <div className='form-container'>
                <div>
                    <Navigation />
              </div>
            <div className='form'>
                <h1>Enter Your Survey:</h1>
                <form className="survey-form" noValidate onSubmit={this.onSubmit}>
                <div className="auth-label"><strong>Name</strong></div>
                <input
                    onChange={this.onChange}
                    value={this.state.name}
                    id="name"
                    type="text"
                    className="auth-input"
                />

                <div className="auth-label"><strong>Rating (0-10)</strong></div>
                <input
                    onChange={this.onChange}
                    value={this.state.rating}
                    id="rating"
                    type="number"
                    className="auth-input"
                />

                <div className="auth-label"><strong>Review</strong></div>
                <input
                    onChange={this.onChange}
                    value={this.state.review}
                    id="review"
                    type="text"
                    className="auth-input"
                />      
                <button type="submit" className="auth-button">
                    Submit
                </button>      
            </form>
            </div>
            </div>
        );
    }
}

Survey.propTypes = {
    newSurvey: PropTypes.func.isRequired
    };

const mapStateToProps = state => ({
    auth: state.auth
    });

export default withRouter(
    connect(
        mapStateToProps,
        { createSurvey }
        )(Survey)
)