import { getCookie, removeCookie, setCookie } from "../data/cookie";
import setAuthToken from "../data/setAuthToken";
import {
  ADMIN_IMAGE,
  ADMIN_UPDATE_IMAGE,
  AUTH_ERROR,
  CREATE_ADMIN_FAIL,
  CREATE_ADMIN_START,
  CREATE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAIL,
  DELETE_ADMIN_START,
  DELETE_ADMIN_SUCCESS,
  GET_ALL_ADMINS_FAIL,
  GET_ALL_ADMINS_START,
  GET_ALL_ADMINS_SUCCESS,
  GET_ALL_BLOG_FAIL,
  GET_ALL_BLOG_START,
  GET_ALL_BLOG_SUCCESS,
  GET_STORAGE_SIZE_FAIL,
  GET_STORAGE_SIZE_START,
  GET_STORAGE_SIZE_SUCCESS,
  LOAD_USER,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  UPDATE_ADMIN_FAIL,
  UPDATE_ADMIN_START,
  UPDATE_ADMIN_SUCCESS,
} from "./types";
import globalError from "./error";
import {
  GET_AUTH_TOKEN,
  LOGIN_URL,
  ADMIN_GET_ALL_BLOGS,
  GET_ALL_ADMINS,
  DELETE_ADMIN,
  CREATE_ADMIN,
  UPLOAD_ADMIN_IMAGE,
  UPDATE_ADMIN,
} from "./url";
import axios from "axios";
import { authConfig, config, fileAuthConfig } from "../data/config";
import globalSuccess from "./success";
import firebaseStorage from "../firebase_storage";
import { ref, deleteObject, getMetadata, listAll } from "firebase/storage";

export const getStorageUsage = () => async (dispatch) => {
  dispatch({
    type: GET_STORAGE_SIZE_START,
  });
  const listRef = ref(firebaseStorage, import.meta.env.VITE_FIREBASE_FIREBASE_STORAGE_PATH);
  let size = 0;

  const getAllFiles = async (listResult) => {
    for (const item of listResult.items) {
      const metadata = await getMetadata(item);
      const fileSize = metadata.size;
      size += fileSize / (1024 * 1024);
    }
    for (const prefix of listResult.prefixes) {
      const folderResult = await listAll(prefix);
      await getAllFiles(folderResult);
    }
  };

  try {
    const listResult = await listAll(listRef);
    await getAllFiles(listResult);
    dispatch({
      type: GET_STORAGE_SIZE_SUCCESS,
      payload: size,
    });
  } catch (error) {
    globalError({ dispatch, text: error?.response?.data?.error ? error.response.data.error : error?.message, FAIL: GET_STORAGE_SIZE_FAIL });
  }
};

export const loadUser = () => async (dispatch) => {
  if (!getCookie("admin")) {
    return globalError({ dispatch, text: "There is no token", FAIL: AUTH_ERROR });
  }
  setAuthToken(getCookie("admin"));
  try {
    const res = await axios.get(`${GET_AUTH_TOKEN}`, config());
    dispatch({
      type: LOAD_USER,
      payload: {
        user: res.data,
        token: getCookie("admin"),
      },
    });
  } catch (error) {
    globalError({ dispatch, text: error?.response?.data?.error ? error.response.data.error : error?.message, FAIL: AUTH_ERROR });
    removeCookie("admin");
    setAuthToken(null);
  }
};

export const login =
  ({ email, password, navigate }) =>
  async (dispatch) => {
    dispatch({
      type: LOGIN_START,
    });
    try {
      const res = await axios.post(`${LOGIN_URL}`, { email, password }, config());
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      setCookie("admin", res.data.token);
      navigate("/panel");
    } catch (error) {
      globalError({ dispatch, text: error?.response?.data?.error ? error.response.data.error : error?.message, FAIL: LOGIN_FAIL });
    }
  };

export const logout =
  ({ navigate }) =>
  async (dispatch) => {
    setCookie("admin", null);
    setAuthToken(null);
    navigate("/");
  };

export const getAllBlogsForPanel =
  ({}) =>
  async (dispatch) => {
    dispatch({
      type: GET_ALL_BLOG_START,
    });
    try {
      const res = await axios.get(`${ADMIN_GET_ALL_BLOGS}`, config());
      dispatch({
        type: GET_ALL_BLOG_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({ dispatch, text: error?.response?.data?.error ? error.response.data.error : error?.message, FAIL: GET_ALL_BLOG_FAIL });
    }
  };

export const getAllAdmins =
  ({}) =>
  async (dispatch) => {
    dispatch({
      type: GET_ALL_ADMINS_START,
    });
    try {
      const res = await axios.get(`${GET_ALL_ADMINS}`, authConfig(getCookie("admin")));
      dispatch({
        type: GET_ALL_ADMINS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      globalError({ dispatch, text: error?.response?.data?.error ? error.response.data.error : error?.message, FAIL: GET_ALL_ADMINS_FAIL });
    }
  };

export const createAdmin =
  ({ userId, name, email, password, image, setInputs }) =>
  async (dispatch) => {
    dispatch({
      type: CREATE_ADMIN_START,
    });
    try {
      let data = { name, email, password };
      if (image) {
        const file = new FormData();
        const filename = Date.now() + image.name;
        file.append("name", filename);
        file.append("admin", image);
        const imageURL = await saveAdminImage({ file });
        data.image = imageURL;
      }
      const res = await axios.post(`${CREATE_ADMIN}`, data, authConfig(getCookie("admin")));
      dispatch({
        type: CREATE_ADMIN_SUCCESS,
        payload: res.data,
      });
      globalSuccess({ dispatch, text: "admin successfully created" });
      setInputs({
        name: "",
        email: "",
        password: "",
      });
      dispatch({
        type: ADMIN_IMAGE,
        payload: null,
      });
    } catch (error) {
      globalError({ dispatch, text: error?.response?.data?.error ? error.response.data.error : error?.message, FAIL: CREATE_ADMIN_FAIL });
    }
  };

export const updateAdmin =
  ({ name, email, image, adminId, oldImage, setInputs, setUpdate, imageChanged }) =>
  async (dispatch) => {
    dispatch({
      type: UPDATE_ADMIN_START,
    });
    try {
      if (oldImage && imageChanged) {
        //delete any old images if there exist
        const imageRef = ref(firebaseStorage, oldImage);
        deleteObject(imageRef)
          .then(() => {
            globalSuccess({ dispatch, text: "admin old image deleted in storage" });
          })
          .catch((err) => {
            globalError({
              dispatch,
              text: err.message,
              FAIL: null,
            });
          });
      }
      let data = { name, email };
      if (image) {
        const file = new FormData();
        const filename = Date.now() + image.name;
        file.append("name", filename);
        file.append("admin", image);
        const imageURL = await saveAdminImage({ file });
        data.image = imageURL;
      } else data.image = oldImage;
      const res = await axios.put(`${UPDATE_ADMIN}/${adminId}`, data, authConfig(getCookie("admin")));
      dispatch({
        type: UPDATE_ADMIN_SUCCESS,
        payload: res.data,
      });
      globalSuccess({ dispatch, text: "Admin updated successfully" });
      setInputs({
        name: "",
        email: "",
      });
      dispatch({
        type: ADMIN_UPDATE_IMAGE,
        payload: null,
      });
      setUpdate(false);
    } catch (error) {
      globalError({
        dispatch,
        text: error?.response?.data?.error ? error.response.data.error : error?.message,
        FAIL: UPDATE_ADMIN_FAIL,
      });
    }
  };

export const deleteAdmin =
  ({ userId, currentUser, navigate, image, setWantToDelete }) =>
  async (dispatch) => {
    dispatch({
      type: DELETE_ADMIN_START,
    });
    try {
      if (image) {
        //delete any old images if there exist
        const imageRef = ref(firebaseStorage, image);
        deleteObject(imageRef)
          .then(() => {
            globalSuccess({ dispatch, text: "admin image deleted in storage" });
          })
          .catch((err) => {
            globalError({
              dispatch,
              text: err.message,
              FAIL: null,
            });
          });
      }
      const res = await axios.delete(`${DELETE_ADMIN}/${userId}`, authConfig(getCookie("admin")));
      dispatch({
        type: DELETE_ADMIN_SUCCESS,
        payload: res.data,
      });
      globalSuccess({ dispatch, text: "Admin Deleted successfully" });
      setWantToDelete(false);
      if (userId === currentUser) {
        removeCookie("admin");
        setAuthToken(null);
        navigate("/");
      }
    } catch (error) {
      globalError({ dispatch, text: error?.response?.data?.error ? error.response.data.error : error?.message, FAIL: DELETE_ADMIN_FAIL });
    }
  };

const saveAdminImage = async ({ file }) => {
  const res = await axios.post(`${UPLOAD_ADMIN_IMAGE}`, file, fileAuthConfig(getCookie("admin")));
  return res.data.url;
};
