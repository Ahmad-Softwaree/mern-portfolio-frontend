import { ADD_ERROR, DECREASE_TIME, REMOVE_ALL_ERRORS, REMOVE_ERROR } from "../../actions/types";
const initialState = {
  errors: [],
};

export default function error(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_ERROR:
      state.errors = state.errors.filter((error) => error.text !== payload.text);
      return {
        errors: [...state.errors, payload],
      };

    case DECREASE_TIME:
      let errors = state.errors;
      let index = errors.findIndex((error) => error.id === payload);
      if (index !== -1) errors[index].time--;
      return {
        errors: errors,
      };
    case REMOVE_ERROR:
      let filter = state.errors.filter((error) => error.id !== payload);
      return {
        errors: filter,
      };
    case REMOVE_ALL_ERRORS:
      return {
        errors: [],
      };
    default:
      return state;
  }
}
