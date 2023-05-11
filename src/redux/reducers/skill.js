import {
  GET_ALL_SKILL_FAIL,
  GET_ALL_SKILL_START,
  GET_ALL_SKILL_SUCCESS,
  UPDATE_SKILL_FAIL,
  UPDATE_SKILL_START,
  UPDATE_SKILL_SUCCESS,
  CREATE_SKILL_FAIL,
  CREATE_SKILL_START,
  CREATE_SKILL_SUCCESS,
  DELETE_SKILL_FAIL,
  DELETE_SKILL_START,
  DELETE_SKILL_SUCCESS,
} from "../../actions/types";

const initialState = {
  skills: [],
  skillLoading: false,
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
