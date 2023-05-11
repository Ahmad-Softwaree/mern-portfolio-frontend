import { ADD_SUCCESS, DECREASE_SUCCESS_TIME, REMOVE_ALL_SUCCESS, REMOVE_SUCCESS } from "../../actions/types";
const initialState = {
  success: [],
};

export default function success(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_SUCCESS:
      state.success = state.success.filter((succes) => succes.text !== payload.text);
      return {
        success: [...state.success, payload],
      };

    case DECREASE_SUCCESS_TIME:
      let success = state.success;
      let index = success.findIndex((succes) => succes.id === payload);
      if (index !== -1) success[index].time--;
      return {
        success: success,
      };
    case REMOVE_SUCCESS:
      let filter = state.success.filter((succes) => succes.id !== payload);
      return {
        success: filter,
      };
    case REMOVE_ALL_SUCCESS:
      return {
        success: [],
      };
    default:
      return state;
  }
}
