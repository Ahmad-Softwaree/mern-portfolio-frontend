import { combineReducers } from "redux";
import blog from "./blog";
import project from "./project";
import work from "./work";
export default combineReducers({
  blog,
  project,
  work,
});
