import axios from "axios";
import {
  ADD_BLOG_START,
  ADD_BLOG_FAIL,
  ADD_BLOG_SUCCESS,
  DELETE_BLOG_START,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_SUCCESS,
  UPDATE_BLOG_START,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_SUCCESS,
  GET_ONE_BLOG_START,
  GET_ONE_BLOG_FAIL,
  GET_ONE_BLOG_SUCCESS,
  GET_BLOGS_START,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAIL,
} from "../types/blog_types";
import { BLOG_IMAGE } from "../types/image_types";
import {
  ADD_BLOG_URL,
  DELETE_BLOG_URL,
  GET_ALL_BLOGS_URL,
  GET_BLOGS_BY_CATEGORY,
  GET_HOME_BLOGS_URL,
  GET_ONE_BLOG,
  GET_PANEL_BLOGS_URL,
  GET_RANDOM_BLOGS_URL,
  SEARCH_BLOG_URL,
} from "../url/blog_url";
import { generateAlert } from "../../util/generateAlert";
import { UPDATE_BLOG_URL } from "../url/blog_url";
import { adminAuthApi, api } from "../../util/api";
import { setAlert } from "./alertAction";
import { deleteImage } from "../../util/deleteFirebaseImage";
import { addBlogImage } from "./imageAction";

export const getHomeBlogs = async (blogDispatch, alertDispatch) => {
  blogDispatch({
    type: GET_BLOGS_START,
  });
  try {
    const { data } = await api.get(`${GET_HOME_BLOGS_URL}`);
    console.log(data);
    blogDispatch({
      type: GET_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      GET_BLOGS_FAIL,
      null,
      "error"
    );
  }
};

export const getAllBlogs = async (blogDispatch, alertDispatch) => {
  blogDispatch({
    type: GET_BLOGS_START,
  });
  try {
    const { data } = await api.get(`${GET_ALL_BLOGS_URL}`);
    blogDispatch({
      type: GET_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      GET_BLOGS_FAIL,
      null,
      "error"
    );
  }
};

export const searchBlogs = async (blogDispatch, alertDispatch, search) => {
  blogDispatch({
    type: GET_BLOGS_START,
  });
  try {
    const { data } = await api.get(`${SEARCH_BLOG_URL}/${search}`);
    blogDispatch({
      type: GET_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      GET_BLOGS_FAIL,
      null,
      "error"
    );
  }
};

export const getRandomBlogs = async (blogDispatch, alertDispatch) => {
  blogDispatch({
    type: GET_BLOGS_START,
  });
  try {
    const { data } = await api.get(`${GET_RANDOM_BLOGS_URL}`);
    blogDispatch({
      type: GET_BLOGS_START,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      GET_BLOGS_FAIL,
      null,
      "error"
    );
  }
};

export const getPanelBlogs = async (blogDispatch, alertDispatch) => {
  blogDispatch({
    type: GET_BLOGS_START,
  });
  try {
    const { data } = await adminAuthApi.get(`${GET_PANEL_BLOGS_URL}`);
    blogDispatch({
      type: GET_BLOGS_START,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      GET_BLOGS_FAIL,
      null,
      "error"
    );
  }
};

export const getOneBlog = async (blogDispatch, alertDispatch, blog_id) => {
  blogDispatch({
    type: GET_ONE_BLOG_START,
  });
  try {
    const { data } = await api.get(`${GET_ONE_BLOG}/${blog_id}`);
    blogDispatch({
      type: GET_ONE_BLOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      GET_ONE_BLOG_FAIL,
      null,
      "error"
    );
  }
};

export const getBlogsByCategory = async (
  blogDispatch,
  alertDispatch,
  category
) => {
  blogDispatch({
    type: GET_BLOGS_START,
  });
  try {
    const { data } = await api.get(`${GET_BLOGS_BY_CATEGORY}/${category}`);
    blogDispatch({
      type: GET_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      GET_BLOGS_FAIL,
      null,
      "error"
    );
  }
};

export const addBlog = async (
  blogDispatch,
  alertDispatch,
  imageDispatch,
  form,
  image,
  setInputs,
  setActiveCategories,
  navigate
) => {
  try {
    blogDispatch({
      type: ADD_BLOG_START,
    });
    var { imageURL, imageName } = await addBlogImage(
      imageDispatch,
      alertDispatch,
      image
    );

    const {
      data: { data, message },
    } = await adminAuthApi.post(`${ADD_BLOG_URL}`, {
      ...form,
      imageURL,
      imageName,
    });
    blogDispatch({
      type: ADD_BLOG_SUCCESS,
      payload: res.data,
    });
    setAlert(
      blogDispatch,
      alertDispatch,
      ADD_BLOG_SUCCESS,
      data,
      message,
      "success"
    );
    setInputs({
      enTitle: "",
      krTitle: "",
      arTitle: "",
      enBody: "",
      arBody: "",
      krBody: "",
    });
    setActiveCategories([]);
    blogDispatch({
      type: BLOG_IMAGE,
      payload: "",
    });
    navigate("/panel");
  } catch (error) {
    if (imageName) deleteImage("blog", imageName, blogDispatch, alertDispatch);
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      ADD_BLOG_FAIL,
      null,
      "error"
    );
  }
};

export const updateBlog = async (
  blogDispatch,
  alertDispatch,
  imageDispatch,
  form,
  id,
  setInputs,
  image,
  oldImageURL,
  oldImageName,
  imageChanged,
  navigate
) => {
  try {
    blogDispatch({
      type: UPDATE_BLOG_START,
    });

    if (imageChanged && oldImageName && oldImageURL && image)
      await deleteImage("blog", oldImageName, blogDispatch, alertDispatch);

    var imageURL = "";
    var imageName = "";
    if (image) {
      let data = await addBlogImage(imageDispatch, alertDispatch, image);
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
    } = await adminAuthApi.put(`${UPDATE_BLOG_URL}/${id}`, finalData);
    setAlert(
      blogDispatch,
      alertDispatch,
      UPDATE_BLOG_SUCCESS,
      data,
      message,
      "success"
    );
    setInputs({
      class: "",
      type: "",
      subject: "",
      classType: "",
      link: "",
    });
    setTutor("");
    navigate("/panel");
  } catch (error) {
    //delete the image
    if (imageName) deleteImage("blog", imageName, blogDispatch, alertDispatch);
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      UPDATE_BLOG_FAIL,
      null,
      "error"
    );
  }
};

export const deleteData = async (
  blogDispatch,
  alertDispatch,
  utilDispatch,
  id,
  imageName
) => {
  try {
    blogDispatch({
      type: DELETE_BLOG_START,
    });
    const {
      data: { data, message },
    } = await adminAuthApi.delete(`${DELETE_BLOG_URL}/${id}`);
    setAlert(
      blogDispatch,
      alertDispatch,
      DELETE_BLOG_SUCCESS,
      data,
      message,
      "success"
    );
    if (imageName)
      await deleteImage("blog", imageName, blogDispatch, alertDispatch);
    utilDispatch({
      type: TOGGLE_WANT_TO_DELETE,
      payload: null,
    });
  } catch (error) {
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      DELETE_BLOG_FAIL,
      null,
      "error"
    );
  }
};
