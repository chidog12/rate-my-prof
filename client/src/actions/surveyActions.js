import axios from "axios";
import jwt_decode from "jwt-decode";

import {GET_SURVEYS, CREATE_SURVEYS, GET_ERRORS} from "./types";


// Create Survey
export const createSurvey = (reviewData, id) => dispatch => {
    axios
      .post(`/api/reviews/professor/${id}`, reviewData)
      .then(res =>
        dispatch({
          type: CREATE_SURVEYS,
          payload: res.data
        })
      )
      .catch(err => console.log(err));
  };

// Get Surveys
export const getSurveys = (id) => dispatch => {
  axios
  .get(`/api/reviews/${id}`)
  .then(res => dispatch({
    type: GET_SURVEYS,
    payload: res.data
  }))
  .catch(err => console.log(err));
}