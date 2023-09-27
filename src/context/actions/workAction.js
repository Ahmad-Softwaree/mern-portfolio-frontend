import {
  GET_ALL_WORK_FAIL,
  GET_ALL_WORK_START,
  GET_ALL_WORK_SUCCESS,
  ADD_WORK_START,
  ADD_WORK_FAIL,
  ADD_WORK_SUCCESS,
  DELETE_WORK_START,
  DELETE_WORK_FAIL,
  DELETE_WORK_SUCCESS,
  UPDATE_WORK_START,
  UPDATE_WORK_FAIL,
  UPDATE_WORK_SUCCESS,
} from "../../context/types/work_types";
import {
  GET_ALL_WORK_URL,
  ADD_WORK_URL,
  DELETE_WORK_URL,
  UPDATE_WORK_URL,
} from "../../context/url/work_url";
import { WORK_IMAGE } from "../types/image_types";
import { adminAuthApi, api } from "../../util/api";
import { generateAlert } from "../../util/generateAlert";
import { addWorkImage } from "./imageAction";
import { ADD_WORK, UPDATE_WORK } from "../types/ui_types";
import { deleteImage } from "../../util/deleteFirebaseImage";
import { TOGGLE_WANT_TO_DELETE } from "../types/util_types";
import { setAlert } from "./alertAction";
export const getAllWorks = async (workDispatch, alertDispatch) => {
  try {
    workDispatch({
      type: GET_ALL_WORK_START,
    });
    const { data } = await api.get(`${GET_ALL_WORK_URL}`);
    workDispatch({
      type: GET_ALL_WORK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      workDispatch,
      alertDispatch,
      GET_ALL_WORK_FAIL,
      null,
      "error"
    );
  }
};

//admin
export const addWork = async (
  workDispatch,
  alertDispatch,
  imageDispatch,
  uiDispatch,
  form,
  image,
  setInputs,
  setCont
) => {
  try {
    workDispatch({
      type: ADD_WORK_START,
    });
    var { imageURL, imageName } = await addWorkImage(
      workDispatch,
      imageDispatch,
      alertDispatch,
      image
    );
    const {
      data: { data, message },
    } = await adminAuthApi.post(`${ADD_WORK_URL}`, {
      ...form,
      imageURL,
      imageName,
    });
    setAlert(
      workDispatch,
      alertDispatch,
      ADD_WORK_SUCCESS,
      data,
      message,
      "success"
    );
    setInputs({
      enTitle: "",
      arTitle: "",
      krTitle: "",
      company: "",
      link: "",
      from: "",
      to: "",
    });
    imageDispatch({
      type: WORK_IMAGE,
      payload: "",
    });
    setCont(false);
    uiDispatch({
      type: ADD_WORK,
    });
  } catch (error) {
    if (imageName) deleteImage("work", imageName, workDispatch, alertDispatch);

    generateAlert(
      error,
      workDispatch,
      alertDispatch,
      ADD_WORK_FAIL,
      null,
      "error"
    );
  }
};

export const updateWork = async (
  workDispatch,
  alertDispatch,
  uiDispatch,
  imageDispatch,
  form,
  id,
  setInputs,
  setCont,
  image,
  oldImageURL,
  oldImageName,
  imageChanged
) => {
  try {
    workDispatch({
      type: UPDATE_WORK_START,
    });

    if (imageChanged && oldImageName && oldImageURL && image)
      await deleteImage("work", oldImageName, workDispatch, alertDispatch);

    var imageURL = "";
    var imageName = "";
    if (image) {
      let data = await addWorkImage(
        workDispatch,
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
    } = await adminAuthApi.put(`${UPDATE_WORK_URL}/${id}`, finalData);
    setAlert(
      workDispatch,
      alertDispatch,
      UPDATE_WORK_SUCCESS,
      data,
      message,
      "success"
    );
    setInputs({
      enTitle: "",
      arTitle: "",
      krTitle: "",
      company: "",
      link: "",
      from: "",
      to: "",
    });

    imageDispatch({
      type: WORK_IMAGE,
      payload: "",
    });
    setCont(false);
    uiDispatch({
      type: UPDATE_WORK,
    });
  } catch (error) {
    console.log(error);
    //delete the image
    if (imageName) deleteImage("work", imageName, workDispatch, alertDispatch);
    generateAlert(
      error,
      workDispatch,
      alertDispatch,
      UPDATE_WORK_FAIL,
      null,
      "error"
    );
  }
};
export const deleteWork = async (
  workDispatch,
  alertDispatch,
  utilDispatch,
  id,
  imageName
) => {
  try {
    workDispatch({
      type: DELETE_WORK_START,
    });
    const {
      data: { data, message },
    } = await adminAuthApi.delete(`${DELETE_WORK_URL}/${id}`);
    setAlert(
      workDispatch,
      alertDispatch,
      DELETE_WORK_SUCCESS,
      data,
      message,
      "success"
    );
    if (imageName)
      await deleteImage("work", imageName, workDispatch, alertDispatch);
    utilDispatch({
      type: TOGGLE_WANT_TO_DELETE,
      payload: null,
    });
  } catch (error) {
    generateAlert(
      error,
      workDispatch,
      alertDispatch,
      DELETE_WORK_FAIL,
      null,
      "error"
    );
  }
};
