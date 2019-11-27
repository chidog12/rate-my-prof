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
          Goals: undefined,
          Variety: undefined,
          Voice: undefined,
          Exams: undefined
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
            Goals: this.state.Goals,
            Variety: this.state.Variety,
            Voice: this.state.Voice,
            Exams: this.state.Exams
          };
        console.log(newSurvey);

        if(this.checkValid()){
            this.props.createSurvey(newSurvey, this.state.profId);
            console.log("clicked");
            this.props.history.push("/");
        } else {
            alert("Error in Survey. Please Fix");
        }
      };

      checkValid(){
          if(
              this.state.name != '' &&
              this.state.rating != undefined && this.state.rating != '' && this.state.rating >= 0 && this.state.rating <= 10 &&
              this.state.review != '' && 
              this.state.Goals != undefined && this.state.Goals != '' && this.state.Goals >= 0 && this.state.Goals <= 10 &&
              this.state.Variety != undefined && this.state.Variety != '' && this.state.Variety >= 0 && this.state.Variety <= 10 &&
              this.state.Voice != undefined && this.state.Voice != '' && this.state.Voice >= 0 && this.state.Voice <= 10 &&
              this.state.Exams != undefined && this.state.Exams != '' && this.state.Exams >= 0 && this.state.Exams <= 10
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

                <div className="auth-label"><strong>Professor Rating (0-10)</strong></div>
                <input
                    onChange={this.onChange}
                    value={this.state.rating}
                    id="rating"
                    type="number"
                    className="auth-input"
                />
                <div className="auth-label"><strong>The instructor clearly communicated the goals and objectives for the course</strong></div>
                <div className="auth-label"><strong>Rating (0-10)</strong></div>
                <input
                    onChange={this.onChange}
                    value={this.state.wellPrepared}
                    id="Goals"
                    type="number"
                    className="auth-input"
                />
                <div className="auth-label"><strong>The instructor uses a variety of teaching resources other than the textbook</strong></div>
                <div className="auth-label"><strong>Rating (0-10)</strong></div>
                <input
                    onChange={this.onChange}
                    value={this.state.askQuestions}
                    id="Variety"
                    type="number"
                    className="auth-input"
                />
                <div className="auth-label"><strong>The instructor's voice and speech are audible and clear</strong></div>
                <div className="auth-label"><strong>Rating (0-10)</strong></div>
                <input
                    onChange={this.onChange}
                    value={this.state.concept}
                    id="Voice"
                    type="number"
                    className="auth-input"
                />
                <div className="auth-label"><strong>The assignments and exams are clear</strong></div>
                <div className="auth-label"><strong>Rating (0-10)</strong></div>
                <input
                    onChange={this.onChange}
                    value={this.state.nice}
                    id="Exams"
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