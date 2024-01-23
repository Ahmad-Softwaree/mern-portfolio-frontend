import { authApi } from "@/lib/config/api.config";
import { generateAlert } from "@/lib/functions";
import { URLs } from "../url";

export const getWorks = async (dispatch) => {
  try {
    const { data } = await authApi.get(URLs.GET_WORKS);
    return data;
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};

export const addWork = async (form) => {
  try {
    const { data } = await authApi.post(URLs.ADD_WORK, form);
    return data;
  } catch (error) {
    throw error;
  }
};
export const updateWork = async (id, form) => {
  try {
    const { data } = await authApi.put(`${URLs.UPDATE_WORK}/${id}`, form);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteWork = async (id) => {
  try {
    const { data } = await authApi.delete(`${URLs.DELETE_WORK}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
