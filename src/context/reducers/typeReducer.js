import {
  ADD_TYPE_FAIL,
  ADD_TYPE_START,
  ADD_TYPE_SUCCESS,
  DELETE_TYPE_FAIL,
  DELETE_TYPE_START,
  DELETE_TYPE_SUCCESS,
  GET_ALL_TYPE_FAIL,
  GET_ALL_TYPE_START,
  GET_ALL_TYPE_SUCCESS,
  GET_ONE_TYPE_FAIL,
  GET_ONE_TYPE_START,
  GET_ONE_TYPE_SUCCESS,
  UPDATE_TYPE_FAIL,
  UPDATE_TYPE_START,
  UPDATE_TYPE_SUCCESS,
} from "../../context/types/type_types";

export const typeInitialState = {
  types: [],
  type: null,
  getTypesLoading: true,
  getOneTypeLoading: true,
  addTypeLoading: false,
  updateTypeLoading: false,
  deleteTypeLoading: false,
};

export const typeReducer = (state = typeInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_TYPE_START:
      return {
        ...state,
        getTypesLoading: true,
        types: [],
      };
    case GET_ALL_TYPE_FAIL:
      return {
        ...state,
        getTypesLoading: false,
      };
    case GET_ALL_TYPE_SUCCESS:
      return {
        ...state,
        getTypesLoading: false,
        types: payload,
      };
    case GET_ONE_TYPE_START:
      return {
        ...state,
        getTypesLoading: true,
        type: {},
      };
    case GET_ONE_TYPE_FAIL:
      return {
        ...state,
        getTypesLoading: false,
      };
    case GET_ONE_TYPE_SUCCESS:
      return {
        ...state,
        getTypesLoading: false,
        type: payload,
      };
    case ADD_TYPE_START:
      return {
        ...state,
        addTypeLoading: true,
      };
    case ADD_TYPE_FAIL:
      return {
        ...state,
        addTypeLoading: false,
      };
    case ADD_TYPE_SUCCESS:
      return {
        ...state,
        addTypeLoading: false,
        types: [payload, ...state.types],
      };
    case UPDATE_TYPE_START:
      return {
        ...state,
        updateTypeLoading: true,
      };
    case UPDATE_TYPE_FAIL:
      return {
        ...state,
        updateTypeLoading: false,
      };
    case UPDATE_TYPE_SUCCESS:
      var data = state.types;
      var index = data.findIndex((val) => val._id === payload._id);
      data[index] = payload;
      return {
        ...state,
        updateTypeLoading: false,
        types: data,
      };
    case DELETE_TYPE_START:
      return {
        ...state,
        deleteTypeLoading: true,
      };
    case DELETE_TYPE_FAIL:
      return {
        ...state,
        deleteTypeLoading: false,
      };
    case DELETE_TYPE_SUCCESS:
      console.log(payload);
      console.log(state.types);
      return {
        ...state,
        deleteTypeLoading: false,
        types: state.types.filter((val) => val._id.toString() !== payload),
      };
    default:
      return state;
  }
};
