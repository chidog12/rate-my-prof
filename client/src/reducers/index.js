import { combineReducers } from "redux";
import authReducer from "./authReducer";
import surveyReducer from "./surveyReducer";
import errorReducer from "./errorReducer";
import projectsReducer from "./projectsReducer";
import tasksReducer from "./tasksReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  survey: surveyReducer
});
