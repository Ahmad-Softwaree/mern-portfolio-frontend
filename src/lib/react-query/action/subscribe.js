import { api, authApi } from "@/lib/config/api.config";
import { generateAlert } from "@/lib/functions";
import { URLs } from "../url";

export const getSubscribers = async (dispatch) => {
  try {
    const { data } = await authApi.get(URLs.GET_SUBSCRIBERS);
    return data;
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};
export const addSubscriber = async (form) => {
  try {
    const { data } = await api.post(URLs.ADD_SUBSCRIBER, form);
    return data;
  } catch (error) {
    throw error;
  }
};
