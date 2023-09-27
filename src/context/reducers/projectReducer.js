import {
  ADD_PROJECT_FAIL,
  ADD_PROJECT_START,
  ADD_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_START,
  DELETE_PROJECT_SUCCESS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_START,
  GET_PROJECTS_SUCCESS,
  GET_ONE_PROJECT_FAIL,
  GET_ONE_PROJECT_START,
  GET_ONE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_START,
  UPDATE_PROJECT_SUCCESS,
} from "../types/project_types";

export const projectInitialState = {
  projects: [],
  getProjectsLoading: true,
  getOneProjectLoading: true,
  addProjectLoading: false,
  deleteProjectLoading: false,
  updateProjectLoading: false,
  project: null,
};

export const projectReducer = (state = projectInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECTS_START:
      return {
        ...state,
        getProjectsLoading: true,
      };
    case GET_PROJECTS_FAIL:
      return {
        ...state,
        getProjectsLoading: false,
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: payload,
        getProjectsLoading: false,
      };
    case GET_ONE_PROJECT_START:
      return {
        ...state,
        getOneProjectLoading: true,
      };
    case GET_ONE_PROJECT_FAIL:
      return {
        ...state,
        getOneProjectLoading: false,
      };
    case GET_ONE_PROJECT_SUCCESS:
      return {
        ...state,
        project: payload,
        getOneProjectLoading: false,
      };
    case ADD_PROJECT_START:
      return {
        ...state,
        addProjectLoading: true,
      };
    case ADD_PROJECT_FAIL:
      return {
        ...state,
        addProjectLoading: false,
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, payload],

        addProjectLoading: false,
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
        projects: state.projects.filter((val) => val._id !== payload),
        deleteProjectLoading: false,
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
      var data = state.projects;
      var index = data.findIndex((val) => val._id === payload._id);
      if (index !== -1) data[index] = payload;
      return {
        ...state,
        projects: data,
        updateProjectLoading: false,
      };

    default:
      return state;
  }
};
