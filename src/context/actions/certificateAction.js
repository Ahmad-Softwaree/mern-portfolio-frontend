import {
  ADD_CERTIFICATE_START,
  ADD_CERTIFICATE_FAIL,
  ADD_CERTIFICATE_SUCCESS,
  DELETE_CERTIFICATE_START,
  DELETE_CERTIFICATE_FAIL,
  DELETE_CERTIFICATE_SUCCESS,
  UPDATE_CERTIFICATE_START,
  UPDATE_CERTIFICATE_FAIL,
  UPDATE_CERTIFICATE_SUCCESS,
  GET_ONE_CERTIFICATE_START,
  GET_ONE_CERTIFICATE_FAIL,
  GET_ONE_CERTIFICATE_SUCCESS,
  GET_CERTIFICATES_START,
  GET_CERTIFICATES_SUCCESS,
  GET_CERTIFICATES_FAIL,
} from "../types/certificate_types";
import { CERTIFICATE_IMAGE } from "../types/image_types";
import {
  ADD_CERTIFICATE_URL,
  DELETE_CERTIFICATE_URL,
  GET_ALL_CERTIFICATES_URL,
  GET_HOME_CERTIFICATES_URL,
  GET_ONE_CERTIFICATE,
  GET_PANEL_CERTIFICATES_URL,
  GET_RANDOM_CERTIFICATES_URL,
  SEARCH_CERTIFICATE_URL,
  GET_CERTIFICATES_BY_STACK,
  GET_CERTIFICATES_BY_TYPE,
} from "../url/certificate_url";
import { generateAlert } from "../../util/generateAlert";
import { UPDATE_CERTIFICATE_URL } from "../url/certificate_url";
import { adminAuthApi, api } from "../../util/api";
import { setAlert } from "./alertAction";
import { deleteImage } from "../../util/deleteFirebaseImage";
import { addCertificateImage } from "./imageAction";
import { ADD_CERTIFICATE, UPDATE_CERTIFICATE } from "../types/ui_types";
import { TOGGLE_WANT_TO_DELETE } from "../types/util_types";

export const getHomeCertificates = async (
  certificateDispatch,
  alertDispatch
) => {
  try {
    certificateDispatch({
      type: GET_CERTIFICATES_START,
    });
    const { data } = await api.get(`${GET_HOME_CERTIFICATES_URL}`);
    certificateDispatch({
      type: GET_CERTIFICATES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      certificateDispatch,
      alertDispatch,
      GET_CERTIFICATES_FAIL,
      null,
      "error"
    );
  }
};

export const getAllCertificates = async (
  certificateDispatch,
  alertDispatch
) => {
  try {
    certificateDispatch({
      type: GET_CERTIFICATES_START,
    });
    const { data } = await api.get(`${GET_ALL_CERTIFICATES_URL}`);
    certificateDispatch({
      type: GET_CERTIFICATES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      certificateDispatch,
      alertDispatch,
      GET_CERTIFICATES_FAIL,
      null,
      "error"
    );
  }
};

export const searchCertificates = async (
  certificateDispatch,
  alertDispatch,
  search
) => {
  try {
    certificateDispatch({
      type: GET_CERTIFICATES_START,
    });
    const { data } = await api.get(`${SEARCH_CERTIFICATE_URL}/${search}`);
    certificateDispatch({
      type: GET_CERTIFICATES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      certificateDispatch,
      alertDispatch,
      GET_CERTIFICATES_FAIL,
      null,
      "error"
    );
  }
};

export const getRandomCertificates = async (
  certificateDispatch,
  alertDispatch
) => {
  try {
    certificateDispatch({
      type: GET_CERTIFICATES_START,
    });
    const { data } = await api.get(`${GET_RANDOM_CERTIFICATES_URL}`);
    certificateDispatch({
      type: GET_CERTIFICATES_START,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      certificateDispatch,
      alertDispatch,
      GET_CERTIFICATES_FAIL,
      null,
      "error"
    );
  }
};

export const getPanelCertificates = async (
  certificateDispatch,
  alertDispatch
) => {
  certificateDispatch({
    type: GET_CERTIFICATES_START,
  });
  try {
    const { data } = await adminAuthApi.get(`${GET_PANEL_CERTIFICATES_URL}`);
    certificateDispatch({
      type: GET_CERTIFICATES_START,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      certificateDispatch,
      alertDispatch,
      GET_CERTIFICATES_FAIL,
      null,
      "error"
    );
  }
};

export const getOneCertificate = async (
  certificateDispatch,
  alertDispatch,
  certificate_id
) => {
  certificateDispatch({
    type: GET_ONE_CERTIFICATE_START,
  });
  try {
    const { data } = await api.get(`${GET_ONE_CERTIFICATE}/${certificate_id}`);
    certificateDispatch({
      type: GET_ONE_CERTIFICATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      certificateDispatch,
      alertDispatch,
      GET_ONE_CERTIFICATE_FAIL,
      null,
      "error"
    );
  }
};

export const getCertificatesByStack = async (
  certificateDispatch,
  alertDispatch,
  category
) => {
  certificateDispatch({
    type: GET_CERTIFICATES_START,
  });
  try {
    const { data } = await api.get(`${GET_CERTIFICATES_BY_STACK}/${category}`);
    certificateDispatch({
      type: GET_CERTIFICATES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      certificateDispatch,
      alertDispatch,
      GET_CERTIFICATES_FAIL,
      null,
      "error"
    );
  }
};

export const getCertificatesByType = async (
  certificateDispatch,
  alertDispatch,
  category
) => {
  certificateDispatch({
    type: GET_CERTIFICATES_START,
  });
  try {
    const { data } = await api.get(`${GET_CERTIFICATES_BY_TYPE}/${category}`);
    certificateDispatch({
      type: GET_CERTIFICATES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      certificateDispatch,
      alertDispatch,
      GET_CERTIFICATES_FAIL,
      null,
      "error"
    );
  }
};

export const addCertificate = async (
  certificateDispatch,
  alertDispatch,
  imageDispatch,
  uiDispatch,
  form,
  image,
  setInputs,
  setStacks,
  setTypes
) => {
  try {
    certificateDispatch({
      type: ADD_CERTIFICATE_START,
    });
    var { imageURL, imageName } = await addCertificateImage(
      certificateDispatch,
      imageDispatch,
      alertDispatch,
      image
    );

    const {
      data: { data, message },
    } = await adminAuthApi.post(`${ADD_CERTIFICATE_URL}`, {
      ...form,
      imageURL,
      imageName,
    });

    setAlert(
      certificateDispatch,
      alertDispatch,
      ADD_CERTIFICATE_SUCCESS,
      data,
      message,
      "success"
    );
    setInputs({
      enTitle: "",
      arTitle: "",
      krTitle: "",
      enType: "",
      arType: "",
      krType: "",
      url: "",
      date: "",
    });
    setStacks([]);
    setTypes([]);
    imageDispatch({
      type: CERTIFICATE_IMAGE,
      payload: "",
    });
    uiDispatch({
      type: ADD_CERTIFICATE,
    });
  } catch (error) {
    if (imageName)
      deleteImage("certificate", imageName, certificateDispatch, alertDispatch);

    generateAlert(
      error,
      certificateDispatch,
      alertDispatch,
      ADD_CERTIFICATE_FAIL,
      null,
      "error"
    );
  }
};

export const updateCertificate = async (
  certificateDispatch,
  alertDispatch,
  imageDispatch,
  uiDispatch,
  form,
  id,
  setInputs,
  image,
  oldImageURL,
  oldImageName,
  imageChanged,
  setStacks,
  setTypes
) => {
  try {
    certificateDispatch({
      type: UPDATE_CERTIFICATE_START,
    });

    if (imageChanged && oldImageName && oldImageURL && image)
      await deleteImage(
        "certificate",
        oldImageName,
        certificateDispatch,
        alertDispatch
      );

    var imageURL = "";
    var imageName = "";
    if (image) {
      let data = await addCertificateImage(imageDispatch, alertDispatch, image);
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
    } = await adminAuthApi.put(`${UPDATE_CERTIFICATE_URL}/${id}`, finalData);
    setAlert(
      certificateDispatch,
      alertDispatch,
      UPDATE_CERTIFICATE_SUCCESS,
      data,
      message,
      "success"
    );
    setInputs({
      enTitle: "",
      arTitle: "",
      krTitle: "",
      enType: "",
      arType: "",
      krType: "",
      url: "",
      date: "",
    });
    setStacks([]);
    setTypes([]);
    imageDispatch({
      type: CERTIFICATE_IMAGE,
      payload: "",
    });
    uiDispatch({
      type: UPDATE_CERTIFICATE,
    });
  } catch (error) {
    //delete the image
    if (imageName)
      deleteImage("certificate", imageName, certificateDispatch, alertDispatch);
    generateAlert(
      error,
      certificateDispatch,
      alertDispatch,
      UPDATE_CERTIFICATE_FAIL,
      null,
      "error"
    );
  }
};

export const deleteCertificate = async (
  certificateDispatch,
  alertDispatch,
  utilDispatch,
  id,
  imageName
) => {
  try {
    certificateDispatch({
      type: DELETE_CERTIFICATE_START,
    });
    const {
      data: { data, message },
    } = await adminAuthApi.delete(`${DELETE_CERTIFICATE_URL}/${id}`);
    setAlert(
      certificateDispatch,
      alertDispatch,
      DELETE_CERTIFICATE_SUCCESS,
      data,
      message,
      "success"
    );
    if (imageName)
      await deleteImage(
        "certificate",
        imageName,
        certificateDispatch,
        alertDispatch
      );
    utilDispatch({
      type: TOGGLE_WANT_TO_DELETE,
      payload: null,
    });
  } catch (error) {
    generateAlert(
      error,
      certificateDispatch,
      alertDispatch,
      DELETE_CERTIFICATE_FAIL,
      null,
      "error"
    );
  }
};
