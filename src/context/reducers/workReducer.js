import {
  GET_ALL_WORK_FAIL,
  GET_ALL_WORK_START,
  GET_ALL_WORK_SUCCESS,
  UPDATE_WORK_FAIL,
  UPDATE_WORK_START,
  UPDATE_WORK_SUCCESS,
  ADD_WORK_FAIL,
  ADD_WORK_START,
  ADD_WORK_SUCCESS,
  DELETE_WORK_FAIL,
  DELETE_WORK_START,
  DELETE_WORK_SUCCESS,
} from "../../context/types/work_types";

export const workInitialState = {
  works: [],
  workLoading: false,
  addWorkLoading: false,
  deleteWorkLoading: false,
  updateWorkLoading: false,
};

export const workReducer = (state = workInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_WORK_START:
      return {
        ...state,
        workLoading: true,
      };
    case GET_ALL_WORK_FAIL:
      return {
        ...state,
        workLoading: false,
      };
    case GET_ALL_WORK_SUCCESS:
      return {
        ...state,
        works: payload,

        workLoading: false,
      };
    case ADD_WORK_START:
      return {
        ...state,
        addWorkLoading: true,
      };
    case ADD_WORK_FAIL:
      return {
        ...state,
        addWorkLoading: false,
      };
    case ADD_WORK_SUCCESS:
      return {
        ...state,
        works: [...state.works, payload],

        addWorkLoading: false,
      };
    case DELETE_WORK_START:
      return {
        ...state,
        deleteWorkLoading: true,
      };
    case DELETE_WORK_FAIL:
      return {
        ...state,
        deleteWorkLoading: false,
      };
    case DELETE_WORK_SUCCESS:
      return {
        ...state,
        works: state.works.filter((WORK) => WORK._id !== payload),

        deleteWorkLoading: false,
      };
    case UPDATE_WORK_START:
      return {
        ...state,
        updateWorkLoading: true,
      };
    case UPDATE_WORK_FAIL:
      return {
        ...state,
        updateWorkLoading: false,
      };
    case UPDATE_WORK_SUCCESS:
      var data = state.works;
      var index = data.findIndex((val) => val._id === payload._id);
      data[index] = payload;
      return {
        ...state,
        works: data,

        updateWorkLoading: false,
      };
    default:
      return state;
  }
};
