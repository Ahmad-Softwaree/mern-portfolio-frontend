import { authApi } from "@/lib/config/api.config";
import { generateAlert } from "@/lib/functions";
import { URLs } from "../url";

export const getInfiniteCertificates = async (
  dispatch,
  pageParam,
  filter = "default"
) => {
  try {
    const { data } = await authApi.get(
      `${URLs.GET_INFINITE_CERTIFICATES}/${
        filter ? filter : "default"
      }/default?pages=${pageParam}`
    );
    return data;
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};
export const getCertificates = async (dispatch) => {
  try {
    const { data } = await authApi.get(URLs.GET_CERTIFICATES);
    return data;
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};
export const getCertificate = async (dispatch, id) => {
  try {
    const { data } = await authApi.get(`${URLs.GET_CERTIFICATE}/${id}`);
    return data;
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};
export const searchCertificate = async (dispatch, search) => {
  try {
    const { data } = await authApi.get(
      `${URLs.SEARCH_CERTIFICATES}?search=${search}`
    );
    return data;
  } catch (error) {
    throw generateAlert(error, "error", dispatch);
  }
};

export const addCertificate = async (form) => {
  try {
    const { data } = await authApi.post(URLs.ADD_CERTIFICATE, form);
    return data;
  } catch (error) {
    throw error;
  }
};
export const updateCertificate = async (id, form) => {
  try {
    const { data } = await authApi.put(
      `${URLs.UPDATE_CERTIFICATE}/${id}`,
      form
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteCertificate = async (id) => {
  try {
    const { data } = await authApi.delete(`${URLs.DELETE_CERTIFICATE}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
