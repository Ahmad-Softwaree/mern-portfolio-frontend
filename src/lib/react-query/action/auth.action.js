import { ENUMs } from "@/lib/enum";
import { setAxiosConfig } from "@/lib/config/axios.config";
import { getCookie, removeCookie } from "@/lib/config/cookie.config";
import { URLs } from "../url";
import { CONTEXT_TYPEs } from "@/context";
import { api, authApi } from "@/lib/config/api.config";

export const getCurrentUser = async (dispatch) => {
  try {
    const { data } = await authApi.get(URLs.GET_AUTH);
    setAxiosConfig(getCookie(ENUMs.COOKIE_NAME));
    dispatch({
      type: CONTEXT_TYPEs.SET_USER,
      payload: {
        user: data,
        token: `Bearer ${getCookie(ENUMs.COOKIE_NAME)}`,
      },
    });
    return data;
  } catch (error) {
    setAxiosConfig(null);
    removeCookie(ENUMs.COOKIE_NAME);
    dispatch({ type: CONTEXT_TYPEs.REMOVE_USER });
    //generateAlert(error);
  }
};

export const login = async (form) => {
  try {
    const { data } = await api.post(`${URLs.LOGIN}`, form);
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  setAxiosConfig(null);
  removeCookie(ENUMs.COOKIE_NAME);
  return;
};
