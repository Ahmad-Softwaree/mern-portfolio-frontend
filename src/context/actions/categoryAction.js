import {
  ADD_CATEGORY_FAIL,
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
  ADD_CATEGORY_START,
} from "../../context/types/category_types";
import {
  ADD_CATEGORY_URL,
  GET_ALL_CATEGORY_URL,
  GET_ONE_CATEGORY_URL,
  UPDATE_CATEGORY_URL,
} from "../../context/url/category_url";
import { adminAuthApi } from "../../util/api";
import { generateAlert } from "../../util/generateAlert";
import { ADD_CATEGORY, UPDATE_CATEGORY } from "../types/ui_types";
import { TOGGLE_WANT_TO_DELETE } from "../types/util_types";
import { setAlert } from "./alertAction";

export const getAllCategories = async (categoryDispatch, alertDispatch) => {
  categoryDispatch({
    type: GET_ALL_CATEGORY_START,
  });
  try {
    const { data } = await adminAuthApi.get(`${GET_ALL_CATEGORY_URL}`);
    categoryDispatch({
      type: GET_ALL_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      categoryDispatch,
      alertDispatch,
      GET_ALL_CATEGORY_FAIL,
      null,
      "error"
    );
  }
};

export const getOneCategory = async (categoryDispatch, alertDispatch, id) => {
  categoryDispatch({
    type: GET_ONE_CATEGORY_START,
  });
  try {
    const { data } = await adminAuthApi.get(`${GET_ONE_CATEGORY_URL}/${id}`);
    categoryDispatch({
      type: GET_ONE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      categoryDispatch,
      alertDispatch,
      GET_ONE_CATEGORY_FAIL,
      null,
      "error"
    );
  }
};

export const addCategory = async (
  categoryDispatch,
  alertDispatch,
  uiDispatch,
  form
) => {
  categoryDispatch({
    type: ADD_CATEGORY_START,
  });
  try {
    const {
      data: { data, message },
    } = await adminAuthApi.post(`${ADD_CATEGORY_URL}`, form);
    setAlert(
      categoryDispatch,
      alertDispatch,
      ADD_CATEGORY_SUCCESS,
      data,
      message,
      "success"
    );
    uiDispatch({
      type: ADD_CATEGORY,
    });
  } catch (error) {
    generateAlert(
      error,
      categoryDispatch,
      alertDispatch,
      ADD_CATEGORY_FAIL,
      null,
      "error"
    );
  }
};

export const updateCategory = async (
  categoryDispatch,
  alertDispatch,
  uiDispatch,
  id,
  form
) => {
  categoryDispatch({
    type: UPDATE_CATEGORY_START,
  });
  try {
    const {
      data: { data, message },
    } = await adminAuthApi.put(`${UPDATE_CATEGORY_URL}/${id}`, form);
    setAlert(
      categoryDispatch,
      alertDispatch,
      UPDATE_CATEGORY_SUCCESS,
      data,
      message,
      "success"
    );
    uiDispatch({
      type: UPDATE_CATEGORY,
    });
  } catch (error) {
    generateAlert(
      error,
      categoryDispatch,
      alertDispatch,
      UPDATE_CATEGORY_FAIL,
      null,
      "error"
    );
  }
};

export const deleteCategory = async (
  categoryDispatch,
  alertDispatch,
  utilDispatch,
  id
) => {
  categoryDispatch({
    type: DELETE_CATEGORY_START,
  });
  try {
    const {
      data: { data, message },
    } = await adminAuthApi.delete(`${UPDATE_CATEGORY_URL}/${id}`);
    setAlert(
      categoryDispatch,
      alertDispatch,
      DELETE_CATEGORY_SUCCESS,
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
      categoryDispatch,
      alertDispatch,
      DELETE_CATEGORY_FAIL,
      null,
      "error"
    );
  }
};
