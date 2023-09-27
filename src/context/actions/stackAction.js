import {
  GET_ALL_STACK_FAIL,
  GET_ALL_STACK_START,
  GET_ALL_STACK_SUCCESS,
  ADD_STACK_START,
  ADD_STACK_FAIL,
  ADD_STACK_SUCCESS,
  DELETE_STACK_START,
  DELETE_STACK_FAIL,
  DELETE_STACK_SUCCESS,
  UPDATE_STACK_START,
  UPDATE_STACK_FAIL,
  UPDATE_STACK_SUCCESS,
  GET_ONE_STACK_START,
  GET_ONE_STACK_FAIL,
  GET_ONE_STACK_SUCCESS,
} from "../../context/types/stack_types";
import {
  GET_ALL_STACK_URL,
  ADD_STACK_URL,
  DELETE_STACK_URL,
  UPDATE_STACK_URL,
  GET_ONE_STACK_URL,
} from "../../context/url/stack_url";
import { adminAuthApi, api } from "../../util/api";
import { generateAlert } from "../../util/generateAlert";
import { ADD_STACK, UPDATE_STACK } from "../types/ui_types";
import { TOGGLE_WANT_TO_DELETE } from "../types/util_types";
import { setAlert } from "./alertAction";
export const getAllStacks = async (stackDispatch, alertDispatch) => {
  try {
    stackDispatch({
      type: GET_ALL_STACK_START,
    });
    const { data } = await api.get(`${GET_ALL_STACK_URL}`);
    stackDispatch({
      type: GET_ALL_STACK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      stackDispatch,
      alertDispatch,
      GET_ALL_STACK_FAIL,
      null,
      "error"
    );
  }
};

export const getOneStack = async (stackDispatch, alertDispatch, id) => {
  try {
    stackDispatch({
      type: GET_ONE_STACK_START,
    });
    const { data } = await api.get(`${GET_ONE_STACK_URL}/${id}`);
    console.log(data);
    stackDispatch({
      type: GET_ONE_STACK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      stackDispatch,
      alertDispatch,
      GET_ONE_STACK_FAIL,
      null,
      "error"
    );
  }
};

//admin
export const addStack = async (
  stackDispatch,
  alertDispatch,
  uiDispatch,
  form,
  setInputs
) => {
  try {
    stackDispatch({
      type: ADD_STACK_START,
    });

    const {
      data: { data, message },
    } = await adminAuthApi.post(`${ADD_STACK_URL}`, form);
    setAlert(
      stackDispatch,
      alertDispatch,
      ADD_STACK_SUCCESS,
      data,
      message,
      "success"
    );
    setInputs({
      name: "",
      color: "",
    });

    uiDispatch({
      type: ADD_STACK,
    });
  } catch (error) {
    console.log(error);
    generateAlert(
      error,
      stackDispatch,
      alertDispatch,
      ADD_STACK_FAIL,
      null,
      "error"
    );
  }
};

export const updateStack = async (
  stackDispatch,
  alertDispatch,
  uiDispatch,
  form,
  id,
  setInputs
) => {
  try {
    stackDispatch({
      type: UPDATE_STACK_START,
    });

    const {
      data: { data, message },
    } = await adminAuthApi.put(`${UPDATE_STACK_URL}/${id}`, form);
    setAlert(
      stackDispatch,
      alertDispatch,
      UPDATE_STACK_SUCCESS,
      data,
      message,
      "success"
    );
    setInputs({
      name: "",
      color: "",
    });
    uiDispatch({
      type: UPDATE_STACK,
    });
  } catch (error) {
    generateAlert(
      error,
      stackDispatch,
      alertDispatch,
      UPDATE_STACK_FAIL,
      null,
      "error"
    );
  }
};
export const deleteStack = async (
  stackDispatch,
  alertDispatch,
  utilDispatch,
  id
) => {
  try {
    stackDispatch({
      type: DELETE_STACK_START,
    });
    const {
      data: { data, message },
    } = await adminAuthApi.delete(`${DELETE_STACK_URL}/${id}`);
    setAlert(
      stackDispatch,
      alertDispatch,
      DELETE_STACK_SUCCESS,
      data,
      message,
      "success"
    );
    utilDispatch({
      type: TOGGLE_WANT_TO_DELETE,
      payload: null,
    });
  } catch (error) {
    generateAlert(
      error,
      stackDispatch,
      alertDispatch,
      DELETE_STACK_FAIL,
      null,
      "error"
    );
  }
};
