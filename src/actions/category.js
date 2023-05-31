import axios from "axios";
import globalError from "./error";
import {
  CREATE_SKILL_START,
  CREATE_CATEGORY_FAIL,
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
} from "./types";
import { CREATE_CATEGORY_URL, GET_ALL_CATEGORY_URL, GET_ONE_CATEGORY_URL, UPDATE_CATEGORY_URL } from "./url";
import { authConfig } from "../data/config";
import { getCookie } from "../data/cookie";

export const getAllCategories =
  ({}) =>
  async (dispatch) => {
    dispatch({
      type: GET_ALL_CATEGORY_START,
    });
    try {
      const res = await axios.get(`${GET_ALL_CATEGORY_URL}`, authConfig(getCookie("admin")));
      dispatch({
        type: GET_ALL_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: GET_ALL_CATEGORY_FAIL,
      });
    }
  };

export const getOneCategory =
  ({ CATEGORYId }) =>
  async (dispatch) => {
    dispatch({
      type: GET_ONE_CATEGORY_START,
    });
    try {
      const res = await axios.get(`${GET_ONE_CATEGORY_URL}/${CATEGORYId}`, authConfig(getCookie("admin")));
      dispatch({
        type: GET_ONE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: GET_ONE_CATEGORY_FAIL,
      });
    }
  };

export const createCategory =
  ({ enName, arName, krName }) =>
  async (dispatch) => {
    dispatch({
      type: CREATE_SKILL_START,
    });
    try {
      const res = await axios.post(`${CREATE_CATEGORY_URL}`, { enName, arName, krName }, authConfig(getCookie("admin")));
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: CREATE_CATEGORY_FAIL,
      });
    }
  };

export const updateCategory =
  ({ enName, arName, krName, categoryId }) =>
  async (dispatch) => {
    dispatch({
      type: UPDATE_CATEGORY_START,
    });
    try {
      const res = await axios.put(`${UPDATE_CATEGORY_URL}/${categoryId}`, { enName, arName, krName }, authConfig(getCookie("admin")));
      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: UPDATE_CATEGORY_FAIL,
      });
    }
  };

export const deleteCATEGORY =
  ({ categoryId }) =>
  async (dispatch) => {
    dispatch({
      type: DELETE_CATEGORY_START,
    });
    try {
      const res = await axios.delete(`${UPDATE_CATEGORY_URL}/${categoryId}`, authConfig(getCookie("admin")));
      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: DELETE_CATEGORY_FAIL,
      });
    }
  };
