import { FETCH_PROJECTS_FAIL, FETCH_PROJECTS_START, FETCH_PROJECTS_SUCCESS, REMOVE_PROJECTS_ERRORS } from "./types";
import { PROJECT_URL } from "./url";
import axios from "axios";
export const getProjects = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PROJECTS_START,
    });
    const res = await axios.get(`${PROJECT_URL}`);
    const data = res.data;
    dispatch({
      type: FETCH_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROJECTS_FAIL,
    });
    S;
    setTimeout(() => {
      dispatch({
        type: REMOVE_PROJECTS_ERRORS,
      });
    }, 3000);
  }
};
