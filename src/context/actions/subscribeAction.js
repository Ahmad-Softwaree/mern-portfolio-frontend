import {
  GET_ALL_SUBSCRIBE_FAIL,
  GET_ALL_SUBSCRIBE_START,
  GET_ALL_SUBSCRIBE_SUCCESS,
  ADD_SUBSCRIBE_START,
  ADD_SUBSCRIBE_FAIL,
  ADD_SUBSCRIBE_SUCCESS,
  DELETE_SUBSCRIBE_START,
  DELETE_SUBSCRIBE_FAIL,
  DELETE_SUBSCRIBE_SUCCESS,
} from "../../context/types/subscribe_types";
import {
  GET_ALL_SUBSCRIBE_URL,
  ADD_SUBSCRIBE_URL,
  DELETE_SUBSCRIBE_URL,
} from "../../context/url/subscribe_url";
import { adminAuthApi, api } from "../../util/api";
import { generateAlert } from "../../util/generateAlert";
import { TOGGLE_WANT_TO_DELETE } from "../types/util_types";
import { setAlert } from "./alertAction";
export const getAllSubscribes = async (subscribeDispatch, alertDispatch) => {
  try {
    subscribeDispatch({
      type: GET_ALL_SUBSCRIBE_START,
    });
    const { data } = await api.get(`${GET_ALL_SUBSCRIBE_URL}`);
    subscribeDispatch({
      type: GET_ALL_SUBSCRIBE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      subscribeDispatch,
      alertDispatch,
      GET_ALL_SUBSCRIBE_FAIL,
      null,
      "error"
    );
  }
};

//admin
export const addSubscribe = async (
  subscribeDispatch,
  alertDispatch,
  form,
  setInput
) => {
  try {
    subscribeDispatch({
      type: ADD_SUBSCRIBE_START,
    });

    const {
      data: { data, message },
    } = await api.post(`${ADD_SUBSCRIBE_URL}`, form);
    setAlert(
      subscribeDispatch,
      alertDispatch,
      ADD_SUBSCRIBE_SUCCESS,
      data,
      message,
      "success"
    );
    setInput("");
  } catch (error) {
    generateAlert(
      error,
      subscribeDispatch,
      alertDispatch,
      ADD_SUBSCRIBE_FAIL,
      null,
      "error"
    );
  }
};

export const deleteSubscribe = async (
  subscribeDispatch,
  alertDispatch,
  utilDispatch,
  id
) => {
  try {
    subscribeDispatch({
      type: DELETE_SUBSCRIBE_START,
    });
    const {
      data: { data, message },
    } = await adminAuthApi.delete(`${DELETE_SUBSCRIBE_URL}/${id}`);
    setAlert(
      subscribeDispatch,
      alertDispatch,
      DELETE_SUBSCRIBE_SUCCESS,
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
      subscribeDispatch,
      alertDispatch,
      DELETE_SUBSCRIBE_FAIL,
      null,
      "error"
    );
  }
};
