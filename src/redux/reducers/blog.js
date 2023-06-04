import {
  CREATE_BLOG_FAIL,
  CREATE_BLOG_START,
  CREATE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_START,
  DELETE_BLOG_SUCCESS,
  DELETE_INNER_BLOG_IMAGE_FAIL,
  DELETE_INNER_BLOG_IMAGE_START,
  DELETE_INNER_BLOG_IMAGE_SUCCESS,
  GET_ALL_BLOG_FAIL,
  GET_ALL_BLOG_START,
  GET_ALL_BLOG_SUCCESS,
  GET_BLOG_BY_CATEGORY_FAIL,
  GET_BLOG_BY_CATEGORY_START,
  GET_BLOG_BY_CATEGORY_SUCCESS,
  GET_HOME_BLOG_FAIL,
  GET_HOME_BLOG_START,
  GET_HOME_BLOG_SUCCESS,
  GET_ONE_BLOG_FAIL,
  GET_ONE_BLOG_START,
  GET_ONE_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_START,
  UPDATE_BLOG_SUCCESS,
  UPLOAD_INNER_BLOG_IMAGE_FAIL,
  UPLOAD_INNER_BLOG_IMAGE_START,
  UPLOAD_INNER_BLOG_IMAGE_SUCCESS,
} from "../../actions/types";

const initialState = {
  blogs: [],
  blogLoading: true,
  createBlogLoading: false,
  deleteBlogLoading: false,
  updateBlogLoading: false,
  uploadInnerImageLoading: false,
  filterBlogs: [],
  filterLoading: true,
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
      var data = state.blogs;
      var index = data.findIndex((val) => val._id === payload._id);
      data[index] = payload;
      return {
        ...state,
        updateBlogLoading: false,
        blogs: data,
      };
    case UPLOAD_INNER_BLOG_IMAGE_START:
    case DELETE_INNER_BLOG_IMAGE_START:
      return {
        ...state,
        uploadInnerImageLoading: true,
      };
    case UPLOAD_INNER_BLOG_IMAGE_FAIL:
    case UPLOAD_INNER_BLOG_IMAGE_SUCCESS:
    case DELETE_INNER_BLOG_IMAGE_FAIL:
    case DELETE_INNER_BLOG_IMAGE_SUCCESS:
      return {
        ...state,
        uploadInnerImageLoading: false,
      };
    case GET_BLOG_BY_CATEGORY_START:
      return {
        ...state,
        filterLoading: true,
        filterBlogs: [],
      };
    case GET_BLOG_BY_CATEGORY_FAIL:
      return {
        ...state,
        filterLoading: false,
        filterBlogs: [],
      };
    case GET_BLOG_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        filterLoading: false,
        filterBlogs: payload,
      };

    default:
      return state;
  }
}
