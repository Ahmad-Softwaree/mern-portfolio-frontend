import {
  ADD_CATEGORY_FAIL,
  ADD_CATEGORY_START,
  ADD_CATEGORY_SUCCESS,
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
} from "../../context/types/category_types";

export const categoryInitialState = {
  categories: [],
  category: null,
  getCategoriesLoading: true,
  getOneCategoryLoading: true,
  addCategoryLoading: false,
  updateCategoryLoading: false,
  deleteCategoryLoading: false,
};

export const categoryReducer = (state = categoryInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_CATEGORY_START:
      return {
        ...state,
        getCategoriesLoading: true,
      };
    case GET_ALL_CATEGORY_FAIL:
      return {
        ...state,
        getCategoriesLoading: false,
      };
    case GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: payload,

        getCategoriesLoading: false,
      };
    case GET_ONE_CATEGORY_START:
      return {
        ...state,
        getCategoriesLoading: true,
      };
    case GET_ONE_CATEGORY_FAIL:
      return {
        ...state,
        getCategoriesLoading: false,
      };
    case GET_ONE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: payload,

        getCategoriesLoading: false,
      };
    case ADD_CATEGORY_START:
      return {
        ...state,
        addCategoryLoading: true,
      };
    case ADD_CATEGORY_FAIL:
      return {
        ...state,
        addCategoryLoading: false,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [payload, ...state.categories],

        addCategoryLoading: false,
      };
    case UPDATE_CATEGORY_START:
      return {
        ...state,
        updateCategoryLoading: true,
      };
    case UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        updateCategoryLoading: false,
      };
    case UPDATE_CATEGORY_SUCCESS:
      var data = state.categories;
      var index = data.findIndex((val) => val._id === payload._id);
      data[index] = payload;
      return {
        ...state,
        categories: data,

        updateCategoryLoading: false,
      };
    case DELETE_CATEGORY_START:
      return {
        ...state,
        deleteCategoryLoading: true,
      };
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        deleteCategoryLoading: false,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (val) => val._id.toString() !== payload
        ),
        deleteCategoryLoading: false,
      };
    default:
      return state;
  }
};
