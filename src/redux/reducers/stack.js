import {
  CREATE_STACK_FAIL,
  CREATE_STACK_START,
  CREATE_STACK_SUCCESS,
  DELETE_STACK_FAIL,
  DELETE_STACK_START,
  DELETE_STACK_SUCCESS,
  GET_ALL_STACK_FAIL,
  GET_ALL_STACK_START,
  GET_ALL_STACK_SUCCESS,
  GET_ONE_STACK_FAIL,
  GET_ONE_STACK_START,
  GET_ONE_STACK_SUCCESS,
  UPDATE_STACK_FAIL,
  UPDATE_STACK_START,
  UPDATE_STACK_SUCCESS,
} from "../../actions/types";

const initialState = {
  stacks: [],
  stack: {},
  loading: true,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

export default function stack(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_STACK_START:
      return {
        ...state,
        loading: true,
        stacks: [],
      };
    case GET_ALL_STACK_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GET_ALL_STACK_SUCCESS:
      return {
        ...state,
        loading: false,
        stacks: payload,
      };
    case GET_ONE_STACK_START:
      return {
        ...state,
        loading: true,
        stack: {},
      };
    case GET_ONE_STACK_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GET_ONE_STACK_SUCCESS:
      return {
        ...state,
        loading: false,
        stack: payload,
      };
    case CREATE_STACK_START:
      return {
        ...state,
        createLoading: true,
      };
    case CREATE_STACK_FAIL:
      return {
        ...state,
        createLoading: false,
      };
    case CREATE_STACK_SUCCESS:
      return {
        ...state,
        createLoading: false,
        stacks: [payload, ...state.stacks],
      };
    case UPDATE_STACK_START:
      return {
        ...state,
        updateLoading: true,
      };
    case UPDATE_STACK_FAIL:
      return {
        ...state,
        updateLoading: false,
      };
    case UPDATE_STACK_SUCCESS:
      var data = state.stacks;
      var index = data.findIndex((val) => val._id === payload._id);
      data[index] = payload;
      return {
        ...state,
        updateLoading: false,
        stacks: data,
      };
    case DELETE_STACK_START:
      return {
        ...state,
        deleteLoading: true,
      };
    case DELETE_STACK_FAIL:
      return {
        ...state,
        deleteLoading: false,
      };
    case DELETE_STACK_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        stacks: state.stacks.filter((val) => val._id !== payload),
      };
    default:
      return state;
  }
}
