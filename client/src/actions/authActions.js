import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, GET_PROF, GET_PROF_BY_ID } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtTokenTeams", JSON.stringify(token));
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = history => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtTokenTeams");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  history.push("/");
};

// Grab Professors
export const getProfessors = () => dispatch => {
  axios
  .get("/api/users/professors")
  .then(res =>
    dispatch({
      type: GET_PROF,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_PROF,
      payload: null
    })
  );
}

// Get Professor Name By ID
export const getProfessorsByID = (id) => dispatch => {
  axios
  .get(`/api/users/professors/${id}`)
  .then(res => dispatch({
    type: GET_PROF_BY_ID,
    payload: res.data
  }))
  .catch(err => console.log(err));
}