import {
  ADD_STACK_FAIL,
  ADD_STACK_START,
  ADD_STACK_SUCCESS,
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
} from "../types/stack_types";

export const stackInitialState = {
  stacks: [],
  stack: null,
  getStacksLoading: true,
  getOneStackLoading: true,
  addStackLoading: false,
  updateStackLoading: false,
  deleteStackLoading: false,
};

export const stackReducer = (state = stackInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_STACK_START:
      return {
        ...state,
        getStacksLoading: true,
      };
    case GET_ALL_STACK_FAIL:
      return {
        ...state,
        getStacksLoading: false,
      };
    case GET_ALL_STACK_SUCCESS:
      return {
        ...state,
        stacks: payload,

        getStacksLoading: false,
      };
    case GET_ONE_STACK_START:
      return {
        ...state,
        getOneStackLoading: true,
      };
    case GET_ONE_STACK_FAIL:
      return {
        ...state,
        getOneStackLoading: false,
      };
    case GET_ONE_STACK_SUCCESS:
      return {
        ...state,
        stack: payload,

        getOneStackLoading: false,
      };
    case ADD_STACK_START:
      return {
        ...state,
        addStackLoading: true,
      };
    case ADD_STACK_FAIL:
      return {
        ...state,
        addStackLoading: false,
      };
    case ADD_STACK_SUCCESS:
      return {
        ...state,
        stacks: [payload, ...state.stacks],

        addStackLoading: false,
      };
    case UPDATE_STACK_START:
      return {
        ...state,
        updateStackLoading: true,
      };
    case UPDATE_STACK_FAIL:
      return {
        ...state,
        updateStackLoading: false,
      };
    case UPDATE_STACK_SUCCESS:
      var data = state.stacks;
      var index = data.findIndex((val) => val._id === payload._id);
      data[index] = payload;
      return {
        ...state,
        stacks: data,

        updateStackLoading: false,
      };
    case DELETE_STACK_START:
      return {
        ...state,
        deleteStackLoading: true,
      };
    case DELETE_STACK_FAIL:
      return {
        ...state,
        deleteStackLoading: false,
      };
    case DELETE_STACK_SUCCESS:
      return {
        ...state,
        stacks: state.stacks.filter((val) => val._id !== payload),

        deleteStackLoading: false,
      };
    default:
      return state;
  }
};
