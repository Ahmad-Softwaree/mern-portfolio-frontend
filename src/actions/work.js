import { FETCH_WORKS_FAIL, FETCH_WORKS_START, FETCH_WORKS_SUCCESS, REMOVE_WORKS_ERRORS } from "./types";
import { WORK_URL } from "./url";
import axios from "axios";
export const getWorks = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_WORKS_START,
    });
    const res = await axios.get(`${WORK_URL}`);
    const data = res.data;
    dispatch({
      type: FETCH_WORKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_WORKS_FAIL,
    });
    S;
    setTimeout(() => {
      dispatch({
        type: REMOVE_WORKS_ERRORS,
      });
    }, 3000);
  }
};
