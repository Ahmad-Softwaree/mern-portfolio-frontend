import {
  ADMIN_IMAGE,
  ADMIN_UPDATE_IMAGE,
  BLOG_IMAGE,
  BLOG_UPDATE_IMAGE,
  INSIDE_BLOG_IMAGE,
  PROJECT_IMAGE,
  PROJECT_UPDATE_IMAGE,
  WORK_IMAGE,
  WORK_UPDATE_IMAGE,
} from "../../actions/types";

const initialState = {
  blog: null,
  project: null,
  updateBlog: null,
  updateProject: null,
  admin: null,
  updateAdmin: null,
  work: null,
  updateWork: null,
  insideBlog: null,
};

export default function image(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case BLOG_IMAGE:
      return {
        ...state,
        blog: payload,
      };
    case PROJECT_IMAGE:
      return {
        ...state,
        project: payload,
      };
    case BLOG_UPDATE_IMAGE:
      return {
        ...state,
        updateBlog: payload,
      };
    case PROJECT_UPDATE_IMAGE:
      return {
        ...state,
        updateProject: payload,
      };

    case ADMIN_IMAGE:
      return {
        ...state,
        admin: payload,
      };
    case ADMIN_UPDATE_IMAGE:
      return {
        ...state,
        updateAdmin: payload,
      };

    case WORK_IMAGE:
      return {
        ...state,
        work: payload,
      };
    case WORK_UPDATE_IMAGE:
      return {
        ...state,
        updateWork: payload,
      };
    case INSIDE_BLOG_IMAGE:
      return {
        ...state,
        insideBlog: payload,
      };
    default:
      return state;
  }
}
