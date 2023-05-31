import axios from "axios";
import globalError from "./error";
import {
  CREATE_SKILL_START,
  CREATE_STACK_FAIL,
  CREATE_STACK_START,
  CREATE_STACK_SUCCESS,
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
} from "./types";
import { CREATE_STACK_URL, GET_ALL_STACK_URL, GET_ONE_STACK_URL, UPDATE_STACK_URL } from "./url";
import { authConfig } from "../data/config";
import { getCookie } from "../data/cookie";
import globalSuccess from "./success";

export const getAllStacks =
  ({}) =>
  async (dispatch) => {
    dispatch({
      type: GET_ALL_STACK_START,
    });
    try {
      const res = await axios.get(`${GET_ALL_STACK_URL}`, authConfig(getCookie("admin")));
      dispatch({
        type: GET_ALL_STACK_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: GET_ALL_STACK_FAIL,
      });
    }
  };

export const getOneStack =
  ({ stackId }) =>
  async (dispatch) => {
    dispatch({
      type: GET_ONE_STACK_START,
    });
    try {
      const res = await axios.get(`${GET_ONE_STACK_URL}/${stackId}`, authConfig(getCookie("admin")));
      dispatch({
        type: GET_ONE_STACK_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: GET_ONE_STACK_FAIL,
      });
    }
  };

export const createStack =
  ({ name, color, setAdd }) =>
  async (dispatch) => {
    dispatch({
      type: CREATE_STACK_START,
    });
    try {
      const res = await axios.post(`${CREATE_STACK_URL}`, { name, color }, authConfig(getCookie("admin")));
      dispatch({
        type: CREATE_STACK_SUCCESS,
        payload: res.data,
      });
      globalSuccess({ dispatch, text: "stack created successfully" });

      setAdd(false);
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: CREATE_STACK_FAIL,
      });
    }
  };

export const updateStack =
  ({ name, color, stackId, setUpdate }) =>
  async (dispatch) => {
    dispatch({
      type: UPDATE_STACK_START,
    });
    try {
      const res = await axios.put(`${UPDATE_STACK_URL}/${stackId}`, { name, color }, authConfig(getCookie("admin")));
      dispatch({
        type: UPDATE_STACK_SUCCESS,
        payload: res.data,
      });
      globalSuccess({ dispatch, text: "stack updated successfully" });

      setUpdate(false);
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: UPDATE_STACK_FAIL,
      });
    }
  };

export const deleteStack =
  ({ stackId, setWantToDelete }) =>
  async (dispatch) => {
    dispatch({
      type: DELETE_STACK_START,
    });
    try {
      const res = await axios.delete(`${UPDATE_STACK_URL}/${stackId}`, authConfig(getCookie("admin")));
      dispatch({
        type: DELETE_STACK_SUCCESS,
        payload: res.data,
      });
      globalSuccess({ dispatch, text: "stack deleted successfully" });
      setWantToDelete(false);
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: DELETE_STACK_FAIL,
      });
    }
  };
