import {
  GET_ALL_WORK_FAIL,
  GET_ALL_WORK_START,
  GET_ALL_WORK_SUCCESS,
  UPDATE_WORK_FAIL,
  UPDATE_WORK_START,
  UPDATE_WORK_SUCCESS,
  CREATE_WORK_FAIL,
  CREATE_WORK_START,
  CREATE_WORK_SUCCESS,
  DELETE_WORK_FAIL,
  DELETE_WORK_START,
  DELETE_WORK_SUCCESS,
} from "../../actions/types";

const initialState = {
  works: [],
  workLoading: false,
  createWorkLoading: false,
  deleteWorkLoading: false,
  updateWorkLoading: false,
};

export default function WORK(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_WORK_START:
      return {
        ...state,
        works: [],
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
        workLoading: false,
        works: payload,
      };
    case CREATE_WORK_START:
      return {
        ...state,
        createWorkLoading: true,
      };
    case CREATE_WORK_FAIL:
      return {
        ...state,
        createWorkLoading: false,
      };
    case CREATE_WORK_SUCCESS:
      return {
        ...state,
        createWorkLoading: false,
        works: [...state.works, payload],
      };
    case DELETE_WORK_START:
      return {
        ...state,
        deleteWorkLoading: true,
      };
    case DELETE_WORK_FAIL:
      return {
        ...state,
        deleteworkLoading: false,
      };
    case DELETE_WORK_SUCCESS:
      return {
        ...state,
        deleteWorkLoading: false,
        works: state.works.filter((WORK) => WORK._id !== payload),
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
      return {
        ...state,
        updateWorkLoading: false,
        works: [...state.works.filter((WORK) => WORK._id !== payload._id), payload],
      };
    default:
      return state;
  }
}
