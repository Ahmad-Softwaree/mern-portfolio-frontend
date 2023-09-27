import {
  ADD_ALERT,
  DECREASE_ALERT_TIME,
  REMOVE_ALERT,
  TOGGLE_ALERT_SHOW,
} from "../types/alert_types";

export const setAlert = (
  actionDispatch,
  alertDispatch,
  dispatchType,
  payload,
  text,
  type
) => {
  let id = crypto.randomUUID();
  alertDispatch({
    type: ADD_ALERT,
    payload: {
      id,
      text,
      type,
      time: 5,
      show: true,
    },
  });
  if (dispatchType) actionDispatch({ type: dispatchType, payload });
  countAlert(alertDispatch, id);
  removeAlertAutomatically(alertDispatch, id);
};

const countAlert = async (dispatch, id) => {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (i == 3) {
      dispatch({
        type: TOGGLE_ALERT_SHOW,
        payload: id,
      });
    }
    dispatch({
      type: DECREASE_ALERT_TIME,
      payload: id,
    });
  }
};

const removeAlertAutomatically = (dispatch, id) => {
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, 5000);
};
