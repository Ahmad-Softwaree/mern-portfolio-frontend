import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_START,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_START,
  DELETE_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_FAIL,
  GET_ALL_CATEGORY_START,
  GET_ALL_CATEGORY_SUCCESS,
  GET_ONE_CATEGORY_FAIL,
  GET_ONE_CATEGORY_START,
  GET_ONE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_START,
  UPDATE_CATEGORY_SUCCESS,
} from "../../actions/types";

const initialState = {
  categories: [],
  category: {},
  loading: true,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

export default function category(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_CATEGORY_START:
      return {
        ...state,
        loading: true,
        categories: [],
      };
    case GET_ALL_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: payload,
      };
    case GET_ONE_CATEGORY_START:
      return {
        ...state,
        loading: true,
        category: {},
      };
    case GET_ONE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GET_ONE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: payload,
      };
    case CREATE_CATEGORY_START:
      return {
        ...state,
        createLoading: true,
      };
    case CREATE_CATEGORY_FAIL:
      return {
        ...state,
        createLoading: false,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        createLoading: false,
        categories: [payload, ...state.categories],
      };
    case UPDATE_CATEGORY_START:
      return {
        ...state,
        updateLoading: true,
      };
    case UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        updateLoading: false,
      };
    case UPDATE_CATEGORY_SUCCESS:
      var data = state.categories;
      var index = data.findIndex((val) => val._id === payload._id);
      data[index] = payload;
      return {
        ...state,
        updateLoading: false,
        categories: data,
      };
    case DELETE_CATEGORY_START:
      return {
        ...state,
        deleteLoading: true,
      };
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        deleteLoading: false,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        categories: state.categories.filter((val) => val._id !== payload),
      };
    default:
      return state;
  }
}
