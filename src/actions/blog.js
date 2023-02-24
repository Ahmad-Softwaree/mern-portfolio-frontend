import {
  FETCH_BLOGS_FAIL,
  FETCH_BLOGS_START,
  FETCH_BLOGS_SUCCESS,
  REMOVE_BLOGS_ERRORS,
  FETCH_SINGLE_BLOG_FAIL,
  FETCH_SINGLE_BLOG_START,
  FETCH_SINGLE_BLOG_SUCCESS,
} from "./types";
import { BLOG_URL } from "./url";
import axios from "axios";
export const getBlogs = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_BLOGS_START,
    });
    const res = await axios.get(`${BLOG_URL}`);
    const data = res.data;
    dispatch({
      type: FETCH_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_BLOGS_FAIL,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_BLOGS_ERRORS,
      });
    }, 3000);
  }
};

export const getOneBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_SINGLE_BLOG_START,
    });
    const res = await axios.get(`${BLOG_URL}/${id}`);
    const data = res.data;
    dispatch({
      type: FETCH_SINGLE_BLOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_BLOG_FAIL,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_BLOGS_ERRORS,
      });
    }, 3000);
  }
};
