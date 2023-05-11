import { ADD_ERROR, DECREASE_TIME, REMOVE_ERROR } from "./types";
const uuid = () => {
  return crypto.randomUUID();
};

const removeError = ({ dispatch, id }) => {
  setTimeout(() => {
    dispatch({
      type: REMOVE_ERROR,
      payload: id,
    });
  }, 5000);
};

const addError = ({ dispatch, text, FAIL }) => {
  const id = uuid();
  dispatch({
    type: ADD_ERROR,
    payload: {
      id: id,
      text: text,
      time: 5,
    },
  });
  dispatch({
    type: FAIL,
  });
  return id;
};

const decreaseTime = async ({ dispatch, id }) => {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch({
      type: DECREASE_TIME,
      payload: id,
    });
  }
};

const globalError = ({ dispatch, text, FAIL }) => {
  const id = addError({ dispatch, text, FAIL });
  decreaseTime({ dispatch, id });
  removeError({ dispatch, id });
};

export default globalError;
