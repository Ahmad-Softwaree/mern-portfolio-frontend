import { authApi } from "@/lib/config/api.config";
import { generateAlert } from "@/lib/functions";
import { URLs } from "../url";

export const getProjects = async (dispatch, pageParam, filter = "default") => {
  try {
    const { data } = await authApi.get(
      `${URLs.GET_PROJECTS}/${filter ? filter : "default"}?pages=${pageParam}`
    );
    return data;
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};
export const getProject = async (dispatch, id) => {
  try {
    const { data } = await authApi.get(`${URLs.GET_PROJECT}/${id}`);
    return data;
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};
export const searchProject = async (dispatch, search) => {
  try {
    const { data } = await authApi.get(
      `${URLs.SEARCH_PROJECTS}?search=${search}`
    );
    return data;
  } catch (error) {
    throw generateAlert(error, "error", dispatch);
  }
};

export const addProject = async (form) => {
  try {
    const { data } = await authApi.post(URLs.ADD_PROJECT, form);
    return data;
  } catch (error) {
    throw error;
  }
};
export const updateProject = async (id, form) => {
  try {
    const { data } = await authApi.put(`${URLs.UPDATE_PROJECT}/${id}`, form);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const { data } = await authApi.delete(`${URLs.DELETE_PROJECT}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
