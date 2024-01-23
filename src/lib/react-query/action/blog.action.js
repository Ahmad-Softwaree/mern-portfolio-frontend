import { authApi } from "@/lib/config/api.config";
import { generateAlert } from "@/lib/functions";
import { URLs } from "../url";

export const getBlogs = async (dispatch, pageParam, filter = "default") => {
  try {
    const { data } = await authApi.get(
      `${URLs.GET_BLOGS}/${filter ? filter : "default"}?pages=${pageParam}`
    );
    return data;
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};
export const getRelatedBlogs = async (dispatch, category, id) => {
  try {
    const { data } = await authApi.get(
      `${URLs.GET_RELATED_BLOGS}/${category}/${id}`
    );
    return data;
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};
export const getBlog = async (dispatch, id) => {
  try {
    const { data } = await authApi.get(`${URLs.GET_BLOG}/${id}`);
    return data;
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};

export const searchBlog = async (dispatch, search) => {
  try {
    const { data } = await authApi.get(`${URLs.SEARCH_BLOGS}?search=${search}`);
    return data;
  } catch (error) {
    throw generateAlert(error, "error", dispatch);
  }
};

export const addBlog = async (form) => {
  try {
    const { data } = await authApi.post(URLs.ADD_BLOG, form);
    return data;
  } catch (error) {
    throw error;
  }
};
export const updateBlog = async (id, form) => {
  try {
    const { data } = await authApi.put(`${URLs.UPDATE_BLOG}/${id}`, form);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const { data } = await authApi.delete(`${URLs.DELETE_BLOG}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
