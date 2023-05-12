import axios from "axios";
import {
  GET_ALL_WORK_FAIL,
  GET_ALL_WORK_START,
  GET_ALL_WORK_SUCCESS,
  CREATE_WORK_START,
  CREATE_WORK_FAIL,
  CREATE_WORK_SUCCESS,
  WORK_IMAGE,
  DELETE_WORK_START,
  DELETE_WORK_FAIL,
  DELETE_WORK_SUCCESS,
  UPDATE_WORK_START,
  UPDATE_WORK_FAIL,
  UPDATE_WORK_SUCCESS,
  WORK_UPDATE_IMAGE,
} from "./types";
import { GET_ALL_WORK_URL, CREATE_WORK_URL, DELETE_WORK_URL, UPLOAD_WORK_IMAGE, UPDATE_WORK_URL } from "./url";
import { getCookie } from "../data/cookie";
import { config, authConfig, fileAuthConfig } from "../data/config.js";
import globalSuccess from "./success";
import firebaseStorage from "../firebase_storage";
import globalError from "./error";
import { ref, deleteObject } from "firebase/storage";
export const getAllWorks =
  ({}) =>
  async (dispatch) => {
    dispatch({
      type: GET_ALL_WORK_START,
    });
    try {
      const res = await axios.get(`${GET_ALL_WORK_URL}`, config());
      dispatch({
        type: GET_ALL_WORK_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: GET_ALL_WORK_FAIL,
      });
    }
  };

//admin
export const createWork =
  ({ enTitle, arTitle, krTitle, company, from, to, image, setInputs }) =>
  async (dispatch) => {
    dispatch({
      type: CREATE_WORK_START,
    });
    try {
      let data = { enTitle, arTitle, krTitle, company, from, to };
      if (image) {
        const file = new FormData();
        const filename = Date.now() + image.name;
        file.append("name", filename);
        file.append("work", image);
        const imageURL = await saveWorkImage({ file });
        data.image = imageURL;
      }
      const res = await axios.post(`${CREATE_WORK_URL}`, data, authConfig(getCookie("admin")));
      dispatch({
        type: CREATE_WORK_SUCCESS,
        payload: res.data,
      });
      globalSuccess({ dispatch, text: "work created successfully" });
      setInputs({
        enTitle: "",
        krTitle: "",
        arTitle: "",
        company: "",
        from: "",
        to: "",
      });
      dispatch({
        type: WORK_IMAGE,
        payload: null,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: CREATE_WORK_FAIL,
      });
    }
  };

export const updateWork =
  ({ enTitle, arTitle, krTitle, company, from, to, image, workId, oldImage, setInputs, setUpdate, imageChanged }) =>
  async (dispatch) => {
    dispatch({
      type: UPDATE_WORK_START,
    });
    try {
      if (oldImage && imageChanged) {
        //delete any old images if there exist
        const imageRef = ref(firebaseStorage, oldImage);
        deleteObject(imageRef)
          .then(() => {
            globalSuccess({ dispatch, text: "work old image deleted in storage" });
          })
          .catch((err) => {
            globalError({
              dispatch,
              text: err.message,
              FAIL: null,
            });
          });
      }
      let data = { enTitle, arTitle, krTitle, company, from, to };

      if (image) {
        const file = new FormData();
        const filename = Date.now() + image.name;
        file.append("name", filename);
        file.append("work", image);
        const imageURL = await saveWorkImage({ file });
        data.image = imageURL;
      } else data.image = oldImage;
      const res = await axios.put(`${UPDATE_WORK_URL}/${workId}`, data, authConfig(getCookie("admin")));
      dispatch({
        type: UPDATE_WORK_SUCCESS,
        payload: res.data,
      });
      globalSuccess({ dispatch, text: "work updated successfully" });
      setInputs({
        enTitle: "",
        krTitle: "",
        arTitle: "",
        company: "",
        from: "",
        to: "",
      });
      dispatch({
        type: WORK_UPDATE_IMAGE,
        payload: null,
      });
      setUpdate(false);
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: UPDATE_WORK_FAIL,
      });
    }
  };
export const deleteWork =
  ({ workId, image, userId }) =>
  async (dispatch) => {
    dispatch({
      type: DELETE_WORK_START,
    });
    try {
      if (image) {
        //delete any old images if there exist
        const imageRef = ref(firebaseStorage, image);
        deleteObject(imageRef)
          .then(() => {
            globalSuccess({ dispatch, text: "work image deleted in storage" });
          })
          .catch((err) => {
            globalError({
              dispatch,
              text: err.message,
              FAIL: null,
            });
          });
      }
      const res = await axios.delete(`${DELETE_WORK_URL}/${workId}`, authConfig(getCookie("admin")));
      dispatch({
        type: DELETE_WORK_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: DELETE_WORK_FAIL,
      });
    }
  };
const saveWorkImage = async ({ file }) => {
  const res = await axios.post(`${UPLOAD_WORK_IMAGE}`, file, fileAuthConfig(getCookie("admin")));
  return res.data.url;
};
