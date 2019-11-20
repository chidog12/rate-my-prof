import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSurvey } from "../../actions/surveyActions";
import { getProfessorsByID } from "../../actions/authActions";
import Navigation from "../common/navigationComponent/navigation"

import "./survey.scss";
import "../auth/Auth.scss";

class Survey extends Component {

    constructor() {
        super();
        this.state = {
          name: "",
          rating: undefined,
          review: "",
          profId: {},
          wellPrepared: undefined,
          askQuestions: undefined,
          concept: undefined,
          nice: undefined
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
            profId: this.state.profId,
            wellPrepared: this.state.wellPrepared,
            askQuestions: this.state.askQuestions,
            concept: this.state.concept,
            nice: this.state.nice
          };
        console.log(newSurvey);

        if(this.checkValid()){
            this.props.createSurvey(newSurvey, this.state.profId);
            console.log("clicked");
            this.props.history.push("/");
        } else {
            alert("You F***ed Up Somewhere! Fix that");
        }
      };

      checkValid(){
          if(
              this.state.name != '' &&
              this.state.rating != undefined && this.state.rating != '' && this.state.rating >= 0 && this.state.rating <= 10 &&
              this.state.review != '' && 
              this.state.wellPrepared != undefined && this.state.wellPrepared != '' && this.state.wellPrepared >= 0 && this.state.wellPrepared <= 10 &&
              this.state.askQuestions != undefined && this.state.askQuestions != '' && this.state.askQuestions >= 0 && this.state.askQuestions <= 10 &&
              this.state.concept != undefined && this.state.concept != '' && this.state.concept >= 0 && this.state.concept <= 10 &&
              this.state.nice != undefined && this.state.nice != '' && this.state.nice >= 0 && this.state.nice <= 10
            ){
                return true;
          } else{
              return false;
          }
      }

      componentDidMount(){
        this.setState({profId: this.props.match.params.id});
        this.props.getProfessorsByID(this.props.match.params.id);
      }


    render(){
        const { professor } = this.props.auth;
        console.log(this.props.auth.profName)

        if ((this.props.auth.user.name == this.props.auth.profName) || this.props.auth.user.employeeType == "admin"){
            return (
                <div className='form-container'>
                    <div>
                        <Navigation />
                  </div>
                <div className='form'>
                    <h1>Enter Your Survey for {this.props.auth.profName}:</h1>
                    <h3>Strongly disagree (0) - Strongly Agree (10)</h3>
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
                    <div className="auth-label"><strong>Professor Was Always Prepared</strong></div>
                    <input
                        onChange={this.onChange}
                        value={this.state.wellPrepared}
                        id="wellPrepared"
                        type="number"
                        className="auth-input"
                    />
                    <div className="auth-label"><strong>Professor Allowed You To Ask Questions</strong></div>
                    <input
                        onChange={this.onChange}
                        value={this.state.askQuestions}
                        id="askQuestions"
                        type="number"
                        className="auth-input"
                    />
                    <div className="auth-label"><strong>Professor Had A Strong Understanding Of The Concepts</strong></div>
                    <input
                        onChange={this.onChange}
                        value={this.state.concept}
                        id="concept"
                        type="number"
                        className="auth-input"
                    />
                    <div className="auth-label"><strong>Professor Is Very Nice</strong></div>
                    <input
                        onChange={this.onChange}
                        value={this.state.nice}
                        id="nice"
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

Survey.propTypes = {
    newSurvey: PropTypes.func.isRequired
    };

const mapStateToProps = state => ({
    auth: state.auth,
    profName: state.profName
    });

export default withRouter(
    connect(
        mapStateToProps,
        { createSurvey,
        getProfessorsByID }
        )(Survey)
)