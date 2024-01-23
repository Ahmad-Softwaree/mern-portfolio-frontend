import { api, authApi } from "@/lib/config/api.config";
import { URLs } from "../url";
import { generateAlert } from "@/lib/functions";

export const getConfig = async (dispatch, type) => {
  try {
    const { data } = await api.get(`${URLs.GET_CONFIG}/${type}`);
    return data;
  } catch (error) {
    throw generateAlert(error, "error", dispatch);
  }
};

export const addConfig = async (form) => {
  try {
    const { data } = await authApi.post(`${URLs.ADD_CONFIG}`, form);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateConfig = async (form, id) => {
  try {
    const { data } = await authApi.put(`${URLs.UPDATE_CONFIG}/${id}`, form);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteConfig = async (id) => {
  try {
    const { data } = await authApi.delete(`${URLs.GET_CONFIG}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
