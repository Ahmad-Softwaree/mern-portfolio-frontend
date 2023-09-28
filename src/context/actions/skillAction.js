import {
  GET_ALL_SKILL_FAIL,
  GET_ALL_SKILL_START,
  GET_ALL_SKILL_SUCCESS,
  ADD_SKILL_START,
  ADD_SKILL_FAIL,
  ADD_SKILL_SUCCESS,
  DELETE_SKILL_START,
  DELETE_SKILL_FAIL,
  DELETE_SKILL_SUCCESS,
  UPDATE_SKILL_START,
  UPDATE_SKILL_FAIL,
  UPDATE_SKILL_SUCCESS,
} from "../../context/types/skill_types";
import {
  GET_ALL_SKILL_URL,
  ADD_SKILL_URL,
  DELETE_SKILL_URL,
  UPDATE_SKILL_URL,
} from "../../context/url/skill_url";
import { SKILL_IMAGE } from "../types/image_types";
import { adminAuthApi, api } from "../../util/api";
import { generateAlert } from "../../util/generateAlert";
import { addSkillImage } from "./imageAction";
import { ADD_SKILL, UPDATE_SKILL } from "../types/ui_types";
import { deleteImage } from "../../util/deleteFirebaseImage";
import { TOGGLE_WANT_TO_DELETE } from "../types/util_types";
import { setAlert } from "./alertAction";
export const getAllSkills = async (skillDispatch, alertDispatch) => {
  try {
    skillDispatch({
      type: GET_ALL_SKILL_START,
    });
    const { data } = await api.get(`${GET_ALL_SKILL_URL}`);
    skillDispatch({
      type: GET_ALL_SKILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      skillDispatch,
      alertDispatch,
      GET_ALL_SKILL_FAIL,
      null,
      "error"
    );
  }
};

//admin
export const addSkill = async (
  skillDispatch,
  alertDispatch,
  imageDispatch,
  uiDispatch,
  form,
  image,
  setSelectedTypes,
  setName
) => {
  try {
    skillDispatch({
      type: ADD_SKILL_START,
    });
    var { imageURL, imageName } = await addSkillImage(
      skillDispatch,
      imageDispatch,
      alertDispatch,
      image
    );
    const {
      data: { data, message },
    } = await adminAuthApi.post(`${ADD_SKILL_URL}`, {
      ...form,
      imageURL,
      imageName,
    });
    setAlert(
      skillDispatch,
      alertDispatch,
      ADD_SKILL_SUCCESS,
      data,
      message,
      "success"
    );
    setName("");
    setSelectedTypes([]);
    imageDispatch({
      type: SKILL_IMAGE,
      payload: "",
    });
    uiDispatch({
      type: ADD_SKILL,
    });
  } catch (error) {
    if (imageName)
      deleteImage("skill", imageName, skillDispatch, alertDispatch);

    generateAlert(
      error,
      skillDispatch,
      alertDispatch,
      ADD_SKILL_FAIL,
      null,
      "error"
    );
  }
};

export const updateSkill = async (
  skillDispatch,
  alertDispatch,
  uiDispatch,
  imageDispatch,
  form,
  id,
  setSelectedTypes,
  setName,
  image,
  oldImageURL,
  oldImageName,
  imageChanged
) => {
  try {
    skillDispatch({
      type: UPDATE_SKILL_START,
    });

    if (imageChanged && oldImageName && oldImageURL && image)
      await deleteImage("skill", oldImageName, skillDispatch, alertDispatch);

    var imageURL = "";
    var imageName = "";
    if (image) {
      let data = await addSkillImage(
        skillDispatch,
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
    } = await adminAuthApi.put(`${UPDATE_SKILL_URL}/${id}`, finalData);
    setAlert(
      skillDispatch,
      alertDispatch,
      UPDATE_SKILL_SUCCESS,
      data,
      message,
      "success"
    );

    imageDispatch({
      type: SKILL_IMAGE,
      payload: "",
    });
    setName("");
    setSelectedTypes([]);
    uiDispatch({
      type: UPDATE_SKILL,
    });
  } catch (error) {
    //delete the image
    if (imageName)
      deleteImage("skill", imageName, skillDispatch, alertDispatch);
    generateAlert(
      error,
      skillDispatch,
      alertDispatch,
      UPDATE_SKILL_FAIL,
      null,
      "error"
    );
  }
};
export const deleteSkill = async (
  skillDispatch,
  alertDispatch,
  utilDispatch,
  id,
  imageName
) => {
  try {
    skillDispatch({
      type: DELETE_SKILL_START,
    });
    const {
      data: { data, message },
    } = await adminAuthApi.delete(`${DELETE_SKILL_URL}/${id}`);
    setAlert(
      skillDispatch,
      alertDispatch,
      DELETE_SKILL_SUCCESS,
      data,
      message,
      "success"
    );
    if (imageName)
      await deleteImage("skill", imageName, skillDispatch, alertDispatch);
    utilDispatch({
      type: TOGGLE_WANT_TO_DELETE,
      payload: null,
    });
  } catch (error) {
    generateAlert(
      error,
      skillDispatch,
      alertDispatch,
      DELETE_SKILL_FAIL,
      null,
      "error"
    );
  }
};
