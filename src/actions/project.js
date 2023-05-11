import axios from "axios";
import {
  GET_ALL_PROJECT_FAIL,
  GET_ALL_PROJECT_START,
  GET_ALL_PROJECT_SUCCESS,
  CREATE_PROJECT_START,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_SUCCESS,
  PROJECT_IMAGE,
  DELETE_PROJECT_START,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  UPDATE_PROJECT_START,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_SUCCESS,
  PROJECT_UPDATE_IMAGE,
} from "./types";
import { GET_ALL_PROJECT_URL, CREATE_PROJECT_URL, DELETE_PROJECT_URL, UPLOAD_PROJECT_IMAGE, UPDATE_PROJECT_URL } from "./url";
import { getCookie } from "../data/cookie";
import { config, authConfig, fileAuthConfig } from "../data/config.js";
import globalSuccess from "./success";
import firebaseStorage from "../firebase";
import globalError from "./error";
import { ref, deleteObject } from "firebase/storage";
export const getAllProjects =
  ({}) =>
  async (dispatch) => {
    dispatch({
      type: GET_ALL_PROJECT_START,
    });
    try {
      const res = await axios.get(`${GET_ALL_PROJECT_URL}`, config());
      dispatch({
        type: GET_ALL_PROJECT_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: GET_ALL_PROJECT_FAIL,
      });
    }
  };

//admin
export const createProject =
  ({ enTitle, arTitle, krTitle, enType, arType, krType, url, image, setInputs, userId }) =>
  async (dispatch) => {
    dispatch({
      type: CREATE_PROJECT_START,
    });
    try {
      let data = { enTitle, arTitle, krTitle, enType, arType, krType, url, user: userId };
      if (image) {
        const file = new FormData();
        const filename = Date.now() + image.name;
        file.append("name", filename);
        file.append("project", image);
        const imageURL = await saveProjectImage({ file });
        data.image = imageURL;
      }
      const res = await axios.post(`${CREATE_PROJECT_URL}`, data, authConfig(getCookie("admin")));
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: res.data,
      });
      globalSuccess({ dispatch, text: "project created successfully" });
      setInputs({
        enTitle: "",
        krTitle: "",
        arTitle: "",
        enType: "",
        arType: "",
        krType: "",
        url: "",
      });
      dispatch({
        type: PROJECT_IMAGE,
        payload: null,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: CREATE_PROJECT_FAIL,
      });
    }
  };

export const updateProject =
  ({ enTitle, arTitle, krTitle, enType, arType, krType, url, image, projectId, oldImage, setInputs, setUpdate, imageChanged }) =>
  async (dispatch) => {
    dispatch({
      type: UPDATE_PROJECT_START,
    });
    try {
      if (oldImage && imageChanged) {
        //delete any old images if there exist
        const imageRef = ref(firebaseStorage, oldImage);
        deleteObject(imageRef)
          .then(() => {
            globalSuccess({ dispatch, text: "project old image deleted in storage" });
          })
          .catch((err) => {
            globalError({
              dispatch,
              text: err.message,
              FAIL: null,
            });
          });
      }
      let data = { enTitle, arTitle, krTitle, enType, arType, krType, url };
      if (image) {
        const file = new FormData();
        const filename = Date.now() + image.name;
        file.append("name", filename);
        file.append("project", image);
        const imageURL = await saveProjectImage({ file });
        data.image = imageURL;
      } else data.image = oldImage;
      const res = await axios.put(`${UPDATE_PROJECT_URL}/${projectId}`, data, authConfig(getCookie("admin")));
      dispatch({
        type: UPDATE_PROJECT_SUCCESS,
        payload: res.data,
      });
      globalSuccess({ dispatch, text: "Project updated successfully" });
      setInputs({
        enTitle: "",
        krTitle: "",
        arTitle: "",
        enType: "",
        arType: "",
        krType: "",
      });
      dispatch({
        type: PROJECT_UPDATE_IMAGE,
        payload: null,
      });
      setUpdate(false);
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: UPDATE_PROJECT_FAIL,
      });
    }
  };
export const deleteProject =
  ({ projectId, image, userId, setWantToDelete }) =>
  async (dispatch) => {
    dispatch({
      type: DELETE_PROJECT_START,
    });
    try {
      if (image) {
        //delete any old images if there exist
        const imageRef = ref(firebaseStorage, image);
        deleteObject(imageRef)
          .then(() => {
            globalSuccess({ dispatch, text: "blog image deleted in storage" });
          })
          .catch((err) => {
            globalError({
              dispatch,
              text: err.message,
              FAIL: null,
            });
          });
      }
      const res = await axios.delete(`${DELETE_PROJECT_URL}/${projectId}`, authConfig(getCookie("admin")));
      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: res.data,
      });
      setWantToDelete(false);
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: DELETE_PROJECT_FAIL,
      });
    }
  };
const saveProjectImage = async ({ file }) => {
  const res = await axios.post(`${UPLOAD_PROJECT_IMAGE}`, file, fileAuthConfig(getCookie("admin")));
  return res.data.url;
};
