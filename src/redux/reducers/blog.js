import {
  FETCH_BLOGS_FAIL,
  FETCH_BLOGS_START,
  FETCH_BLOGS_SUCCESS,
  FETCH_SINGLE_BLOG_FAIL,
  FETCH_SINGLE_BLOG_START,
  FETCH_SINGLE_BLOG_SUCCESS,
  REMOVE_BLOGS_ERRORS,
} from "../../actions/types";

const initialState = {
  blogs: [],
  singleBlog: null,
  loading: false,
  error: null,
};

export default function blog(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_BLOGS_START:
    case FETCH_SINGLE_BLOG_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BLOGS_FAIL:
    case FETCH_SINGLE_BLOG_FAIL:
      return {
        ...state,
        blogs: [],
        singleBlog: null,
        loading: false,
        error: payload,
      };
    case FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        blogs: payload,
      };
    case FETCH_SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        singleBlog: payload,
      };
    case REMOVE_BLOGS_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
