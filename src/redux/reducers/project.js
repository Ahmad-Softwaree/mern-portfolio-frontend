import { FETCH_PROJECTS_FAIL, FETCH_PROJECTS_START, FETCH_PROJECTS_SUCCESS, REMOVE_PROJECTS_ERRORS } from "../../actions/types";

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

export default function project(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PROJECTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROJECTS_FAIL:
      return {
        ...state,
        projects: [],
        loading: false,
        error: payload,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: payload,
      };

    case REMOVE_PROJECTS_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
