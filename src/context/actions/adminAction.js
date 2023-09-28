import { getCookie, removeCookie, setCookie } from "../../util/cookie";
import { setAxiosConfig } from "../../util/axiosConfig";
import {
  AUTH_ERROR,
  DELETE_ADMIN_FAIL,
  DELETE_ADMIN_START,
  DELETE_ADMIN_SUCCESS,
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
  GET_AUTH_TOKEN_URL,
  ADMIN_LOGIN_URL,
  DELETE_ADMIN_URL,
  UPDATE_ADMIN_URL,
} from "../url/admin_url";
import firebaseStorage from "../../firebase_storage";
import { ref, getMetadata, listAll } from "firebase/storage";
import { adminAuthApi, api } from "../../util/api";
import { ADMIN_COOKIE_NAME } from "../../util/enum";
import { generateAlert } from "../../util/generateAlert";
import { setAlert } from "./alertAction";
import { ADMIN_IMAGE } from "../types/image_types";
import { addAdminImage } from "./imageAction";
import { deleteImage } from "../../util/deleteFirebaseImage";
import { TOGGLE_WANT_TO_DELETE } from "../types/util_types";
import { UPDATE_ADMIN } from "../types/ui_types";

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
    const { data } = await adminAuthApi.get(`${GET_AUTH_TOKEN_URL}`);
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

export const updateAdmin = async (
  adminDispatch,
  alertDispatch,
  imageDispatch,
  uiDispatch,
  form,
  id,
  setName,
  image,
  oldImageURL,
  oldImageName,
  imageChanged
) => {
  try {
    adminDispatch({
      type: UPDATE_ADMIN_START,
    });

    if (imageChanged && oldImageName && oldImageURL && image)
      await deleteImage("admin", oldImageName, adminDispatch, alertDispatch);

    var imageURL = "";
    var imageName = "";
    if (image) {
      let data = await addAdminImage(
        adminDispatch,
        imageDispatch,
        alertDispatch,
        image
      );
      imageURL = data.imageURL;
      imageName = data.imageName;
    }

    let finalData = form;
    if (imageURL && imageURL !== "") {
      finalData.imageURL = imageURL;
      finalData.imageName = imageName;
    }
    if (imageChanged && !image) {
      finalData.imageURL = "";
      finalData.imageName = "";
    }

    const {
      data: { data, message },
    } = await adminAuthApi.put(`${UPDATE_ADMIN_URL}/${id}`, finalData);
    setAlert(
      adminDispatch,
      alertDispatch,
      UPDATE_ADMIN_SUCCESS,
      data,
      message,
      "success"
    );
    setName("");

    imageDispatch({
      type: ADMIN_IMAGE,
      payload: "",
    });
    uiDispatch({
      type: UPDATE_ADMIN,
    });
  } catch (error) {
    //delete the image
    if (imageName)
      deleteImage("admin", imageName, adminDispatch, alertDispatch);
    generateAlert(
      error,
      adminDispatch,
      alertDispatch,
      UPDATE_ADMIN_FAIL,
      null,
      "error"
    );
  }
};

export const deleteAdmin = async (
  adminDispatch,
  alertDispatch,
  utilDispatch,
  id,
  imageName
) => {
  try {
    adminDispatch({
      type: DELETE_ADMIN_START,
    });
    const {
      data: { data, message },
    } = await adminAuthApi.delete(`${DELETE_ADMIN_URL}/${id}`);
    setAlert(
      adminDispatch,
      alertDispatch,
      DELETE_ADMIN_SUCCESS,
      data,
      message,
      "success"
    );
    if (imageName)
      await deleteImage("admin", imageName, adminDispatch, alertDispatch);
    utilDispatch({
      type: TOGGLE_WANT_TO_DELETE,
      payload: null,
    });
  } catch (error) {
    generateAlert(
      error,
      adminDispatch,
      alertDispatch,
      DELETE_ADMIN_FAIL,
      null,
      "error"
    );
  }
};
