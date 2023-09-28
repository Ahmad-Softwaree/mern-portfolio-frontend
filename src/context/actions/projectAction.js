import {
  ADD_PROJECT_START,
  ADD_PROJECT_FAIL,
  ADD_PROJECT_SUCCESS,
  DELETE_PROJECT_START,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  UPDATE_PROJECT_START,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_SUCCESS,
  GET_ONE_PROJECT_START,
  GET_ONE_PROJECT_FAIL,
  GET_ONE_PROJECT_SUCCESS,
  GET_PROJECTS_START,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAIL,
} from "../types/project_types";
import { PROJECT_IMAGE } from "../types/image_types";
import {
  ADD_PROJECT_URL,
  DELETE_PROJECT_URL,
  GET_ALL_PROJECTS_URL,
  GET_HOME_PROJECTS_URL,
  GET_ONE_PROJECT,
  GET_PANEL_PROJECTS_URL,
  GET_RANDOM_PROJECTS_URL,
  SEARCH_PROJECT_URL,
  GET_PROJECTS_BY_STACK,
  GET_PROJECTS_BY_TYPE,
} from "../url/project_url";
import { generateAlert } from "../../util/generateAlert";
import { UPDATE_PROJECT_URL } from "../url/project_url";
import { adminAuthApi, api } from "../../util/api";
import { setAlert } from "./alertAction";
import { deleteImage } from "../../util/deleteFirebaseImage";
import { addProjectImage } from "./imageAction";
import { ADD_PROJECT, UPDATE_PROJECT } from "../types/ui_types";
import { TOGGLE_WANT_TO_DELETE } from "../types/util_types";

export const getHomeProjects = async (projectDispatch, alertDispatch) => {
  try {
    projectDispatch({
      type: GET_PROJECTS_START,
    });
    const { data } = await api.get(`${GET_HOME_PROJECTS_URL}`);
    projectDispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      projectDispatch,
      alertDispatch,
      GET_PROJECTS_FAIL,
      null,
      "error"
    );
  }
};

export const getAllProjects = async (projectDispatch, alertDispatch) => {
  try {
    projectDispatch({
      type: GET_PROJECTS_START,
    });
    const { data } = await api.get(`${GET_ALL_PROJECTS_URL}`);
    projectDispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      projectDispatch,
      alertDispatch,
      GET_PROJECTS_FAIL,
      null,
      "error"
    );
  }
};

export const searchProjects = async (
  projectDispatch,
  alertDispatch,
  search
) => {
  try {
    projectDispatch({
      type: GET_PROJECTS_START,
    });
    if (search === "")
      setAlert(
        projectDispatch,
        alertDispatch,
        GET_PROJECTS_FAIL,
        null,
        "please enter something",
        "error"
      );
    const { data } = await api.get(`${SEARCH_PROJECT_URL}/${search}`);
    projectDispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      projectDispatch,
      alertDispatch,
      GET_PROJECTS_FAIL,
      null,
      "error"
    );
  }
};

export const getRandomProjects = async (projectDispatch, alertDispatch) => {
  try {
    projectDispatch({
      type: GET_PROJECTS_START,
    });
    const { data } = await api.get(`${GET_RANDOM_PROJECTS_URL}`);
    projectDispatch({
      type: GET_PROJECTS_START,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      projectDispatch,
      alertDispatch,
      GET_PROJECTS_FAIL,
      null,
      "error"
    );
  }
};

export const getPanelProjects = async (projectDispatch, alertDispatch) => {
  projectDispatch({
    type: GET_PROJECTS_START,
  });
  try {
    const { data } = await adminAuthApi.get(`${GET_PANEL_PROJECTS_URL}`);
    projectDispatch({
      type: GET_PROJECTS_START,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      projectDispatch,
      alertDispatch,
      GET_PROJECTS_FAIL,
      null,
      "error"
    );
  }
};

export const getOneProject = async (
  projectDispatch,
  alertDispatch,
  project_id
) => {
  projectDispatch({
    type: GET_ONE_PROJECT_START,
  });
  try {
    const { data } = await api.get(`${GET_ONE_PROJECT}/${project_id}`);
    projectDispatch({
      type: GET_ONE_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      projectDispatch,
      alertDispatch,
      GET_ONE_PROJECT_FAIL,
      null,
      "error"
    );
  }
};

export const getProjectsByStack = async (
  projectDispatch,
  alertDispatch,
  category
) => {
  projectDispatch({
    type: GET_PROJECTS_START,
  });
  try {
    const { data } = await api.get(`${GET_PROJECTS_BY_STACK}/${category}`);
    projectDispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      projectDispatch,
      alertDispatch,
      GET_PROJECTS_FAIL,
      null,
      "error"
    );
  }
};

export const getProjectsByType = async (
  projectDispatch,
  alertDispatch,
  category
) => {
  projectDispatch({
    type: GET_PROJECTS_START,
  });
  try {
    const { data } = await api.get(`${GET_PROJECTS_BY_TYPE}/${category}`);
    projectDispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      projectDispatch,
      alertDispatch,
      GET_PROJECTS_FAIL,
      null,
      "error"
    );
  }
};

export const addProject = async (
  projectDispatch,
  alertDispatch,
  imageDispatch,
  uiDispatch,
  form,
  image,
  setInputs,
  setStacks,
  setTypes,
  setGits
) => {
  try {
    projectDispatch({
      type: ADD_PROJECT_START,
    });
    var { imageURL, imageName } = await addProjectImage(
      projectDispatch,
      imageDispatch,
      alertDispatch,
      image
    );

    const {
      data: { data, message },
    } = await adminAuthApi.post(`${ADD_PROJECT_URL}`, {
      ...form,
      imageURL,
      imageName,
    });

    setAlert(
      projectDispatch,
      alertDispatch,
      ADD_PROJECT_SUCCESS,
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
    setGits([]);
    setTypes([]);
    imageDispatch({
      type: PROJECT_IMAGE,
      payload: "",
    });
    uiDispatch({
      type: ADD_PROJECT,
    });
  } catch (error) {
    if (imageName)
      deleteImage("project", imageName, projectDispatch, alertDispatch);

    generateAlert(
      error,
      projectDispatch,
      alertDispatch,
      ADD_PROJECT_FAIL,
      null,
      "error"
    );
  }
};

export const updateProject = async (
  projectDispatch,
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
  setTypes,
  setGits
) => {
  try {
    projectDispatch({
      type: UPDATE_PROJECT_START,
    });

    if (imageChanged && oldImageName && oldImageURL && image)
      await deleteImage(
        "project",
        oldImageName,
        projectDispatch,
        alertDispatch
      );

    var imageURL = "";
    var imageName = "";
    if (image) {
      let data = await addProjectImage(
        projectDispatch,
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
    } = await adminAuthApi.put(`${UPDATE_PROJECT_URL}/${id}`, finalData);
    setAlert(
      projectDispatch,
      alertDispatch,
      UPDATE_PROJECT_SUCCESS,
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
    setGits([]);
    setTypes([]);
    imageDispatch({
      type: PROJECT_IMAGE,
      payload: "",
    });
    uiDispatch({
      type: UPDATE_PROJECT,
    });
  } catch (error) {
    //delete the image
    if (imageName)
      deleteImage("project", imageName, projectDispatch, alertDispatch);
    generateAlert(
      error,
      projectDispatch,
      alertDispatch,
      UPDATE_PROJECT_FAIL,
      null,
      "error"
    );
  }
};

export const deleteProject = async (
  projectDispatch,
  alertDispatch,
  utilDispatch,
  id,
  imageName
) => {
  try {
    projectDispatch({
      type: DELETE_PROJECT_START,
    });
    const {
      data: { data, message },
    } = await adminAuthApi.delete(`${DELETE_PROJECT_URL}/${id}`);
    setAlert(
      projectDispatch,
      alertDispatch,
      DELETE_PROJECT_SUCCESS,
      data,
      message,
      "success"
    );
    if (imageName)
      await deleteImage("project", imageName, projectDispatch, alertDispatch);
    utilDispatch({
      type: TOGGLE_WANT_TO_DELETE,
      payload: null,
    });
  } catch (error) {
    generateAlert(
      error,
      projectDispatch,
      alertDispatch,
      DELETE_PROJECT_FAIL,
      null,
      "error"
    );
  }
};
