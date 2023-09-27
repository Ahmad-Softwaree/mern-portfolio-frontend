import { getCookie, removeCookie, setCookie } from "../../util/cookie";
import { setAxiosConfig } from "../../util/axiosConfig";
import {
  AUTH_ERROR,
  ADD_ADMIN_FAIL,
  ADD_ADMIN_START,
  ADD_ADMIN_SUCCESS,
  DELETE_ADMIN_FAIL,
  DELETE_ADMIN_START,
  DELETE_ADMIN_SUCCESS,
  GET_ALL_ADMINS_FAIL,
  GET_ALL_ADMINS_START,
  GET_ALL_ADMINS_SUCCESS,
  GET_STORAGE_SIZE_FAIL,
  GET_STORAGE_SIZE_START,
  GET_STORAGE_SIZE_SUCCESS,
  AUTH_ADMIN,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_START,
  ADMIN_LOGIN_SUCCESS,
  UPDATE_ADMIN_FAIL,
  UPDATE_ADMIN_START,
  UPDATE_ADMIN_SUCCESS,
  ADMIN_LOGOUT_START,
  ADMIN_LOGOUT_FAIL,
  ADMIN_LOGOUT_SUCCESS,
} from "../types/admin_types";

import {
  GET_AUTH_TOKEN,
  ADMIN_LOGIN_URL,
  GET_ALL_ADMINS,
  DELETE_ADMIN,
  ADD_ADMIN,
  UPDATE_ADMIN,
} from "../url/admin_url";
import axios from "axios";
import { authConfig } from "../../util/config";
import firebaseStorage from "../../firebase_storage";
import { ref, deleteObject, getMetadata, listAll } from "firebase/storage";
import { adminAuthApi, api } from "../../util/api";
import { ADMIN_COOKIE_NAME } from "../../util/enum";
import { generateAlert } from "../../util/generateAlert";
import { setAlert } from "./alertAction";

export const getStorageUsage = async (adminDispatch, alertDispatch) => {
  try {
    adminDispatch({
      type: GET_STORAGE_SIZE_START,
    });
    const listRef = ref(
      firebaseStorage,
      import.meta.env.VITE_FIREBASE_FIREBASE_STORAGE_PATH
    );
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

    const listResult = await listAll(listRef);
    await getAllFiles(listResult);

    adminDispatch({
      type: GET_STORAGE_SIZE_SUCCESS,
      payload: size,
    });
  } catch (error) {
    generateAlert(
      error,
      adminDispatch,
      alertDispatch,
      GET_STORAGE_SIZE_FAIL,
      null,
      "error"
    );
  }
};

export const getAuthAdmin = async (adminDispatch, alertDispatch) => {
  try {
    const { data } = await adminAuthApi.get(`${GET_AUTH_TOKEN}`);
    setAxiosConfig(`Bearer ${getCookie(ADMIN_COOKIE_NAME)}`);
    adminDispatch({
      type: AUTH_ADMIN,
      payload: { admin: data, token: getCookie(ADMIN_COOKIE_NAME) },
    });
  } catch (error) {
    removeCookie(ADMIN_COOKIE_NAME);
    setAxiosConfig(null);
    adminDispatch({
      type: AUTH_ERROR,
    });
  }
};
export const adminLogin = async (
  adminDispatch,
  alertDispatch,
  form,
  navigate
) => {
  adminDispatch({
    type: ADMIN_LOGIN_START,
  });
  try {
    const { data } = await api.post(`${ADMIN_LOGIN_URL}`, form);
    adminDispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });
    setCookie(ADMIN_COOKIE_NAME, data.token);
    setAxiosConfig(`Bearer ${data.token}`);
    navigate("/panel");
  } catch (error) {
    removeCookie(ADMIN_COOKIE_NAME);
    setAxiosConfig(null);
    generateAlert(
      error,
      adminDispatch,
      alertDispatch,
      ADMIN_LOGIN_FAIL,
      null,
      "error"
    );
  }
};

export const adminLogout = async (adminDispatch, alertDispatch, navigate) => {
  try {
    adminDispatch({
      type: ADMIN_LOGOUT_START,
    });
    setAxiosConfig(null);
    removeCookie(ADMIN_COOKIE_NAME);
    setAlert(
      adminDispatch,
      alertDispatch,
      ADMIN_LOGOUT_SUCCESS,
      null,
      "Admin Logout Successfully",
      "success"
    );

    navigate("/");
  } catch (error) {
    generateAlert(
      error,
      adminDispatch,
      alertDispatch,
      ADMIN_LOGOUT_FAIL,
      null,
      "error"
    );
  }
};

export const getAllAdmins =
  ({}) =>
  async (adminDispatch) => {
    adminDispatch({
      type: GET_ALL_ADMINS_START,
    });
    try {
      const res = await axios.get(
        `${GET_ALL_ADMINS}`,
        authConfig(getCookie("admin"))
      );
      adminDispatch({
        type: GET_ALL_ADMINS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      generateAlert({
        adminDispatch,
        text: error?.response?.data?.error
          ? error.response.data.error
          : error?.message,
        FAIL: GET_ALL_ADMINS_FAIL,
      });
    }
  };

export const createAdmin =
  ({ userId, name, email, password, image, setInputs }) =>
  async (adminDispatch) => {
    adminDispatch({
      type: ADD_ADMIN_START,
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
      const res = await axios.post(
        `${ADD_ADMIN}`,
        data,
        authConfig(getCookie("admin"))
      );
      adminDispatch({
        type: ADD_ADMIN_SUCCESS,
        payload: res.data,
      });
      generateAlert({ adminDispatch, text: "admin successfully created" });
      setInputs({
        name: "",
        email: "",
        password: "",
      });
      adminDispatch({
        type: ADMIN_IMAGE,
        payload: null,
      });
    } catch (error) {
      generateAlert({
        adminDispatch,
        text: error?.response?.data?.error
          ? error.response.data.error
          : error?.message,
        FAIL: ADD_ADMIN_FAIL,
      });
    }
  };

export const updateAdmin =
  ({
    name,
    email,
    image,
    adminId,
    oldImage,
    setInputs,
    setUpdate,
    imageChanged,
  }) =>
  async (adminDispatch) => {
    adminDispatch({
      type: UPDATE_ADMIN_START,
    });
    try {
      if (oldImage && imageChanged) {
        //delete any old images if there exist
        const imageRef = ref(firebaseStorage, oldImage);
        deleteObject(imageRef)
          .then(() => {
            generateAlert({
              adminDispatch,
              text: "admin old image deleted in storage",
            });
          })
          .catch((err) => {
            generateAlert({
              adminDispatch,
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
      const res = await axios.put(
        `${UPDATE_ADMIN}/${adminId}`,
        data,
        authConfig(getCookie("admin"))
      );
      adminDispatch({
        type: UPDATE_ADMIN_SUCCESS,
        payload: res.data,
      });
      generateAlert({ adminDispatch, text: "Admin updated successfully" });
      setInputs({
        name: "",
        email: "",
      });
      adminDispatch({
        type: ADMIN_UPDATE_IMAGE,
        payload: null,
      });
      setUpdate(false);
    } catch (error) {
      generateAlert({
        adminDispatch,
        text: error?.response?.data?.error
          ? error.response.data.error
          : error?.message,
        FAIL: UPDATE_ADMIN_FAIL,
      });
    }
  };

export const deleteAdmin =
  ({ userId, currentUser, navigate, image, setWantToDelete }) =>
  async (adminDispatch) => {
    adminDispatch({
      type: DELETE_ADMIN_START,
    });
    try {
      if (image) {
        //delete any old images if there exist
        const imageRef = ref(firebaseStorage, image);
        deleteObject(imageRef)
          .then(() => {
            generateAlert({
              adminDispatch,
              text: "admin image deleted in storage",
            });
          })
          .catch((err) => {
            generateAlert({
              adminDispatch,
              text: err.message,
              FAIL: null,
            });
          });
      }
      const res = await axios.delete(
        `${DELETE_ADMIN}/${userId}`,
        authConfig(getCookie("admin"))
      );
      adminDispatch({
        type: DELETE_ADMIN_SUCCESS,
        payload: res.data,
      });
      generateAlert({ adminDispatch, text: "Admin Deleted successfully" });
      setWantToDelete(false);
      if (userId === currentUser) {
        removeCookie("admin");
        setAuthConfig(null);
        navigate("/");
      }
    } catch (error) {
      generateAlert({
        adminDispatch,
        text: error?.response?.data?.error
          ? error.response.data.error
          : error?.message,
        FAIL: DELETE_ADMIN_FAIL,
      });
    }
  };
