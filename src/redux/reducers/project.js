import {
  GET_ALL_PROJECT_FAIL,
  GET_ALL_PROJECT_START,
  GET_ALL_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_START,
  UPDATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_START,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_START,
  DELETE_PROJECT_SUCCESS,
} from "../../actions/types";

const initialState = {
  projects: [],
  projectLoading: false,
  createProjectLoading: false,
  deleteProjectLoading: false,
  updateProjectLoading: false,
};

export default function project(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PROJECT_START:
      return {
        ...state,
        projects: [],
        projectLoading: true,
      };
    case GET_ALL_PROJECT_FAIL:
      return {
        ...state,
        projectLoading: false,
      };
    case GET_ALL_PROJECT_SUCCESS:
      return {
        ...state,
        projectLoading: false,
        projects: payload,
      };
    case CREATE_PROJECT_START:
      return {
        ...state,
        createProjectLoading: true,
      };
    case CREATE_PROJECT_FAIL:
      return {
        ...state,
        createProjectLoading: false,
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        createProjectLoading: false,
        projects: [...state.projects, payload],
      };
    case DELETE_PROJECT_START:
      return {
        ...state,
        deleteProjectLoading: true,
      };
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        deleteProjectLoading: false,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        deleteProjectLoading: false,
        projects: state.projects.filter((project) => project._id !== payload),
      };
    case UPDATE_PROJECT_START:
      return {
        ...state,
        updateProjectLoading: true,
      };
    case UPDATE_PROJECT_FAIL:
      return {
        ...state,
        updateProjectLoading: false,
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        updateProjectLoading: false,
        projects: [...state.projects.filter((project) => project._id !== payload._id), payload],
      };
    default:
      return state;
  }
}
