import { combineReducers } from "redux";
import blog from "./blog";
import project from "./project";
import work from "./work";
import language from "./language";
import admin from "./admin";
import error from "./error";
import success from "./success";
import image from "./image";
import category from "./category";
import stack from "./stack";
export default combineReducers({
  blog,
  project,
  work,
  language,
  admin,
  error,
  success,
  image,
  category,
  stack,
});
