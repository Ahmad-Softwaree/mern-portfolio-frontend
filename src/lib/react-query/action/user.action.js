import { authApi } from "@/lib/config/api.config";
import { generateAlert } from "@/lib/functions";
import { URLs } from "../url";

export const getUsers = async (dispatch) => {
  try {
    const { data } = await authApi.get(URLs.GET_USERS);
    return data;
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};

export const addUser = async (form) => {
  try {
    const { data } = await authApi.post(URLs.ADD_USER, form);
    return data;
  } catch (error) {
    throw error;
  }
};
export const updateUser = async (id, form) => {
  try {
    const { data } = await authApi.put(`${URLs.UPDATE_USER}/${id}`, form);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await authApi.delete(`${URLs.DELETE_USER}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
