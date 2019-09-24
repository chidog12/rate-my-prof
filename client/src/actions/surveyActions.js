import axios from "axios";
import jwt_decode from "jwt-decode";

import {GET_SURVEYS, CREATE_SURVEYS, GET_ERRORS} from "./types";


// Create Survey
export const createSurvey = (id, reviewData) => dispatch => {
    axios
      .post(`api/reviews/professor/${id}`, id)
      .then(res =>
        dispatch({
          type: CREATE_SURVEYS,
          payload: res.data
        })
      )
      .catch(err => console.log(err));
  };