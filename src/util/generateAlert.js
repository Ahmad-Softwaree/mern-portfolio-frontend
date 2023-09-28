import { setAlert } from "../context/actions/alertAction";
export const generateAlert = (
  error,
  dispatch1,
  dispatch2,
  dispatchType,
  payload,
  alertType
) => {
  const errors = error?.response?.data;
  if (Array.isArray(errors)) {
    errors.forEach((val) => {
      setAlert(
        dispatch1,
        dispatch2,
        dispatchType,
        payload,
        val.value,
        alertType
      );
    });
  } else {
    setAlert(
      dispatch1,
      dispatch2,
      dispatchType,
      payload,
      errors?.error || errors,
      alertType
    );
  }
};
