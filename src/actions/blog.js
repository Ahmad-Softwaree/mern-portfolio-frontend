import axios from "axios";
import globalError from "./error";
import {
  GET_ALL_BLOG_FAIL,
  GET_ALL_BLOG_START,
  GET_HOME_BLOG_FAIL,
  GET_HOME_BLOG_START,
  GET_HOME_BLOG_SUCCESS,
  GET_ALL_BLOG_SUCCESS,
  CREATE_BLOG_START,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_SUCCESS,
  BLOG_IMAGE,
  DELETE_BLOG_START,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_SUCCESS,
  UPDATE_BLOG_START,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_SUCCESS,
  BLOG_UPDATE_IMAGE,
  GET_ONE_BLOG_START,
  GET_ONE_BLOG_FAIL,
  GET_ONE_BLOG_SUCCESS,
  INSIDE_BLOG_IMAGE,
  UPLOAD_INNER_BLOG_IMAGE_START,
  UPLOAD_INNER_BLOG_IMAGE_SUCCESS,
  UPLOAD_INNER_BLOG_IMAGE_FAIL,
} from "./types";
import {
  CREATE_BLOG_URL,
  DELETE_BLOG_URL,
  GET_ALL_BLOG_URL,
  GET_HOME_BLOG_URL,
  GET_ONE_BLOG,
  UPLOAD_BLOG_IMAGE,
  UPLOAD_INNER_BLOG_IMAGE,
} from "./url";
import { getCookie } from "../data/cookie";
import { config, authConfig, fileAuthConfig } from "../data/config.js";
import globalSuccess from "./success";
import firebaseStorage from "../firebase_storage";
import { ref, deleteObject } from "firebase/storage";
import { UPDATE_BLOG_URL } from "./url";
export const getHomeBlogs =
  ({}) =>
  async (dispatch) => {
    dispatch({
      type: GET_HOME_BLOG_START,
    });
    try {
      const res = await axios.get(`${GET_HOME_BLOG_URL}`, config());
      dispatch({
        type: GET_HOME_BLOG_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: GET_HOME_BLOG_FAIL,
      });
    }
  };

export const getAllBlogs = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_BLOG_START,
  });
  try {
    const res = await axios.get(`${GET_ALL_BLOG_URL}`, config());
    dispatch({
      type: GET_ALL_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    globalError({
      dispatch,
      text: error?.response?.data?.error ? error.response.data.error : error?.message,
      FAIL: GET_ALL_BLOG_FAIL,
    });
  }
};

export const getOneBlog =
  ({ blogId }) =>
  async (dispatch) => {
    dispatch({
      type: GET_ONE_BLOG_START,
    });
    try {
      const res = await axios.get(`${GET_ONE_BLOG}/${blogId}`, config());
      dispatch({
        type: GET_ONE_BLOG_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: GET_ONE_BLOG_FAIL,
      });
    }
  };

//admin
export const createBlog =
  ({ enTitle, arTitle, krTitle, enBody, arBody, krBody, image, userId, setInputs }) =>
  async (dispatch) => {
    dispatch({
      type: CREATE_BLOG_START,
    });
    try {
      let data = { enTitle, arTitle, krTitle, enBody, arBody, krBody, user: userId };
      if (image) {
        const file = new FormData();
        const filename = Date.now() + image.name;
        file.append("name", filename);
        file.append("blog", image);
        const imageURL = await saveBlogImage({ file });
        data.image = imageURL;
      }
      const res = await axios.post(`${CREATE_BLOG_URL}/${userId}`, data, authConfig(getCookie("admin")));
      dispatch({
        type: CREATE_BLOG_SUCCESS,
        payload: res.data,
      });
      globalSuccess({ dispatch, text: "Blog created successfully" });
      setInputs({
        enTitle: "",
        krTitle: "",
        arTitle: "",
        enBody: "",
        arBody: "",
        krBody: "",
      });
      dispatch({
        type: BLOG_IMAGE,
        payload: null,
      });
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: CREATE_BLOG_FAIL,
      });
    }
  };

export const updateBlog =
  ({ enTitle, arTitle, krTitle, enBody, arBody, krBody, image, blogId, oldImage, imageChanged, setUpdate }) =>
  async (dispatch) => {
    dispatch({
      type: UPDATE_BLOG_START,
    });
    try {
      if (oldImage && imageChanged) {
        //delete any old images if there exist
        const imageRef = ref(firebaseStorage, oldImage);
        deleteObject(imageRef)
          .then(() => {
            globalSuccess({ dispatch, text: "blog old image deleted in storage" });
          })
          .catch((err) => {
            globalError({
              dispatch,
              text: err.message,
              FAIL: null,
            });
          });
      }
      let data = { enTitle, arTitle, krTitle, enBody, arBody, krBody };

      if (image) {
        const file = new FormData();
        const filename = Date.now() + image.name;
        file.append("name", filename);
        file.append("blog", image);
        const imageURL = await saveBlogImage({ file });
        data.image = imageURL;
      } else data.image = oldImage;
      const res = await axios.put(`${UPDATE_BLOG_URL}/${blogId}`, data, authConfig(getCookie("admin")));
      dispatch({
        type: UPDATE_BLOG_SUCCESS,
        payload: res.data,
      });
      globalSuccess({ dispatch, text: "Blog updated successfully" });

      dispatch({
        type: BLOG_UPDATE_IMAGE,
        payload: null,
      });
      setUpdate((prev) => !prev);
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: UPDATE_BLOG_FAIL,
      });
    }
  };
export const deleteBlog =
  ({ blogId, image, userId, setWantToDelete }) =>
  async (dispatch) => {
    dispatch({
      type: DELETE_BLOG_START,
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
      const res = await axios.delete(`${DELETE_BLOG_URL}/${blogId}`, authConfig(getCookie("admin")));
      dispatch({
        type: DELETE_BLOG_SUCCESS,
        payload: res.data,
      });
      setWantToDelete(false);
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: DELETE_BLOG_FAIL,
      });
    }
  };
const saveBlogImage = async ({ file }) => {
  const res = await axios.post(`${UPLOAD_BLOG_IMAGE}`, file, fileAuthConfig(getCookie("admin")));
  return res.data.url;
};

export const uploadInnerBlogImage = (image, ref, setImageUrl) => async (dispatch) => {
  dispatch({
    type: UPLOAD_INNER_BLOG_IMAGE_START,
  });
  try {
    const file = new FormData();
    const filename = Date.now() + image.name;
    file.append("name", filename);
    file.append("innerBlog", image);
    let url = await saveInnerBlogImage({ file });
    setImageUrl(url);
    dispatch({
      type: INSIDE_BLOG_IMAGE,
      payload: null,
    });
    ref.current = "";
    globalSuccess({
      dispatch,
      text: "Image Uploaded to firebase",
    });
    dispatch({
      type: UPLOAD_INNER_BLOG_IMAGE_SUCCESS,
    });
  } catch (error) {
    globalError({
      dispatch,
      text: error?.response?.data?.error ? error.response.data.error : error?.message,
      FAIL: UPLOAD_INNER_BLOG_IMAGE_FAIL,
    });
  }
};

const saveInnerBlogImage = async ({ file }) => {
  const res = await axios.post(`${UPLOAD_INNER_BLOG_IMAGE}`, file, fileAuthConfig(getCookie("admin")));
  return res.data.url;
};
