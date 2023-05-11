import {
  CREATE_BLOG_FAIL,
  CREATE_BLOG_START,
  CREATE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_START,
  DELETE_BLOG_SUCCESS,
  GET_ALL_BLOG_FAIL,
  GET_ALL_BLOG_START,
  GET_ALL_BLOG_SUCCESS,
  GET_HOME_BLOG_FAIL,
  GET_HOME_BLOG_START,
  GET_HOME_BLOG_SUCCESS,
  GET_ONE_BLOG_FAIL,
  GET_ONE_BLOG_START,
  GET_ONE_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_START,
  UPDATE_BLOG_SUCCESS,
} from "../../actions/types";

const initialState = {
  blogs: [],
  blogLoading: false,
  createBlogLoading: false,
  deleteBlogLoading: false,
  updateBlogLoading: false,
  blog: {},
};

export default function blog(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_HOME_BLOG_START:
    case GET_ALL_BLOG_START:
    case GET_ONE_BLOG_START:
      return {
        ...state,
        blogs: [],
        blogLoading: true,
      };
    case GET_HOME_BLOG_FAIL:
    case GET_ALL_BLOG_FAIL:
    case GET_ONE_BLOG_FAIL:
      return {
        ...state,
        blogLoading: false,
      };
    case GET_HOME_BLOG_SUCCESS:
    case GET_ALL_BLOG_SUCCESS:
      return {
        ...state,
        blogLoading: false,
        blogs: payload,
      };
    case GET_ONE_BLOG_SUCCESS:
      return {
        ...state,
        blogLoading: false,
        blog: payload,
      };
    case CREATE_BLOG_START:
      return {
        ...state,
        createBlogLoading: true,
      };
    case CREATE_BLOG_FAIL:
      return {
        ...state,
        createBlogLoading: false,
      };
    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        createBlogLoading: false,
        blogs: [...state.blogs, payload],
      };
    case DELETE_BLOG_START:
      return {
        ...state,
        deleteBlogLoading: true,
      };
    case DELETE_BLOG_FAIL:
      return {
        ...state,
        deleteBlogLoading: false,
      };
    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        deleteBlogLoading: false,
        blogs: state.blogs.filter((blog) => blog._id !== payload),
      };
    case UPDATE_BLOG_START:
      return {
        ...state,
        updateBlogLoading: true,
      };
    case UPDATE_BLOG_FAIL:
      return {
        ...state,
        updateBlogLoading: false,
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        updateBlogLoading: false,
        blogs: [...state.blogs.filter((blog) => blog._id !== payload._id), payload],
      };
    default:
      return state;
  }
}
