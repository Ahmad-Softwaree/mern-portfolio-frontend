import {
  ADD_TYPE_FAIL,
  ADD_TYPE_SUCCESS,
  DELETE_TYPE_FAIL,
  DELETE_TYPE_START,
  DELETE_TYPE_SUCCESS,
  GET_ALL_TYPE_FAIL,
  GET_ALL_TYPE_START,
  GET_ALL_TYPE_SUCCESS,
  GET_ONE_TYPE_FAIL,
  GET_ONE_TYPE_START,
  GET_ONE_TYPE_SUCCESS,
  UPDATE_TYPE_FAIL,
  UPDATE_TYPE_START,
  UPDATE_TYPE_SUCCESS,
  ADD_TYPE_START,
} from "../../context/types/type_types";
import {
  ADD_TYPE_URL,
  GET_ALL_TYPE_URL,
  GET_ONE_TYPE_URL,
  UPDATE_TYPE_URL,
} from "../../context/url/type_url";
import { adminAuthApi } from "../../util/api";
import { generateAlert } from "../../util/generateAlert";
import { ADD_TYPE, UPDATE_TYPE } from "../types/ui_types";
import { TOGGLE_WANT_TO_DELETE } from "../types/util_types";
import { setAlert } from "./alertAction";

export const getAllTypes = async (typeDispatch, alertDispatch) => {
  typeDispatch({
    type: GET_ALL_TYPE_START,
  });
  try {
    const { data } = await adminAuthApi.get(`${GET_ALL_TYPE_URL}`);
    typeDispatch({
      type: GET_ALL_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      typeDispatch,
      alertDispatch,
      GET_ALL_TYPE_FAIL,
      null,
      "error"
    );
  }
};

export const getOneType = async (typeDispatch, alertDispatch, id) => {
  typeDispatch({
    type: GET_ONE_TYPE_START,
  });
  try {
    const { data } = await adminAuthApi.get(`${GET_ONE_TYPE_URL}/${id}`);
    typeDispatch({
      type: GET_ONE_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      typeDispatch,
      alertDispatch,
      GET_ONE_TYPE_FAIL,
      null,
      "error"
    );
  }
};

export const addType = async (
  typeDispatch,
  alertDispatch,
  uiDispatch,
  form
) => {
  typeDispatch({
    type: ADD_TYPE_START,
  });
  try {
    const {
      data: { data, message },
    } = await adminAuthApi.post(`${ADD_TYPE_URL}`, form);
    setAlert(
      typeDispatch,
      alertDispatch,
      ADD_TYPE_SUCCESS,
      data,
      message,
      "success"
    );
    uiDispatch({
      type: ADD_TYPE,
    });
  } catch (error) {
    generateAlert(
      error,
      typeDispatch,
      alertDispatch,
      ADD_TYPE_FAIL,
      null,
      "error"
    );
  }
};

export const updateType = async (
  typeDispatch,
  alertDispatch,
  uiDispatch,
  id,
  form
) => {
  typeDispatch({
    type: UPDATE_TYPE_START,
  });
  try {
    const {
      data: { data, message },
    } = await adminAuthApi.put(`${UPDATE_TYPE_URL}/${id}`, form);
    setAlert(
      typeDispatch,
      alertDispatch,
      UPDATE_TYPE_SUCCESS,
      data,
      message,
      "success"
    );
    uiDispatch({
      type: UPDATE_TYPE,
    });
  } catch (error) {
    generateAlert(
      error,
      typeDispatch,
      alertDispatch,
      UPDATE_TYPE_FAIL,
      null,
      "error"
    );
  }
};

export const deleteType = async (
  typeDispatch,
  alertDispatch,
  utilDispatch,
  id
) => {
  typeDispatch({
    type: DELETE_TYPE_START,
  });
  try {
    const {
      data: { data, message },
    } = await adminAuthApi.delete(`${UPDATE_TYPE_URL}/${id}`);
    setAlert(
      typeDispatch,
      alertDispatch,
      DELETE_TYPE_SUCCESS,
      data,
      message,
      "success"
    );
    utilDispatch({
      type: TOGGLE_WANT_TO_DELETE,
    });
  } catch (error) {
    generateAlert(
      error,
      typeDispatch,
      alertDispatch,
      DELETE_TYPE_FAIL,
      null,
      "error"
    );
  }
};
