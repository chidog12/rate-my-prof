import { GET_SURVEYS } from "../actions/types";

const initialState = {
  responses: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SURVEYS:
      return {
        responses: action.payload
      };
    default:
      return state;
  }
}
