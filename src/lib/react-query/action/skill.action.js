import { authApi } from "@/lib/config/api.config";
import { generateAlert } from "@/lib/functions";
import { URLs } from "../url";

export const getSkills = async (dispatch) => {
  try {
    const { data } = await authApi.get(URLs.GET_SKILLS);
    return data;
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};

export const addSkill = async (form) => {
  try {
    const { data } = await authApi.post(URLs.ADD_SKILL, form);
    return data;
  } catch (error) {
    throw error;
  }
};
export const updateSkill = async (id, form) => {
  try {
    const { data } = await authApi.put(`${URLs.UPDATE_SKILL}/${id}`, form);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteSkill = async (id) => {
  try {
    const { data } = await authApi.delete(`${URLs.DELETE_SKILL}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
