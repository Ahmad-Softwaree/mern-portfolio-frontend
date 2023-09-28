import {
  ADD_BLOG_FAIL,
  ADD_BLOG_START,
  ADD_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_START,
  DELETE_BLOG_SUCCESS,
  GET_BLOGS_FAIL,
  GET_BLOGS_START,
  GET_BLOGS_SUCCESS,
  GET_ONE_BLOG_FAIL,
  GET_ONE_BLOG_START,
  GET_ONE_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_START,
  UPDATE_BLOG_SUCCESS,
} from "../types/blog_types";

export const blogInitialState = {
  blogs: [],
  getBlogsLoading: true,
  getOneBlogLoading: true,
  addBlogLoading: false,
  deleteBlogLoading: false,
  updateBlogLoading: false,
  blog: null,
};

export const blogReducer = (state = blogInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BLOGS_START:
      return {
        ...state,
        getBlogsLoading: true,
      };
    case GET_BLOGS_FAIL:
      return {
        ...state,
        getBlogsLoading: false,
      };
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: payload,
        getBlogsLoading: false,
      };
    case GET_ONE_BLOG_START:
      return {
        ...state,
        getOneBlogLoading: true,
      };
    case GET_ONE_BLOG_FAIL:
      return {
        ...state,
        getOneBlogLoading: false,
      };
    case GET_ONE_BLOG_SUCCESS:
      return {
        ...state,
        blog: payload,
        getOneBlogLoading: false,
      };
    case ADD_BLOG_START:
      return {
        ...state,
        addBlogLoading: true,
      };
    case ADD_BLOG_FAIL:
      return {
        ...state,
        addBlogLoading: false,
      };
    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        blogs: [...state.blogs, payload],

        addBlogLoading: false,
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
        blogs: state.blogs.filter((blog) => blog._id !== payload),

        deleteBlogLoading: false,
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
      var data = state.blogs;
      var index = data.findIndex((val) => val._id === payload._id);
      data[index] = payload;
      return {
        ...state,
        blogs: data,

        updateBlogLoading: false,
      };

    default:
      return state;
  }
};
