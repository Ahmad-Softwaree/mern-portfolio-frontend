import { ADD_SUCCESS, DECREASE_SUCCESS_TIME, REMOVE_SUCCESS } from "./types";
const uuid = () => {
  return crypto.randomUUID();
};

const removeSuccess = ({ dispatch, id }) => {
  setTimeout(() => {
    dispatch({
      type: REMOVE_SUCCESS,
      payload: id,
    });
  }, 5000);
};

const addSuccess = ({ dispatch, text, FAIL }) => {
  const id = uuid();
  dispatch({
    type: ADD_SUCCESS,
    payload: {
      id: id,
      text: text,
      time: 5,
    },
  });
  return id;
};

const decreaseTime = async ({ dispatch, id }) => {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch({
      type: DECREASE_SUCCESS_TIME,
      payload: id,
    });
  }
};

const globalSuccess = ({ dispatch, text }) => {
  const id = addSuccess({ dispatch, text });
  decreaseTime({ dispatch, id });
  removeSuccess({ dispatch, id });
};

export default globalSuccess;
