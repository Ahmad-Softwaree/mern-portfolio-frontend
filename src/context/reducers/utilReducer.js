import { TOGGLE_WANT_TO_DELETE } from "../types/util_types";

export const utilInitialState = {
  wantToDelete: false,
  method: null,
  id: null,
  type: null,
  image: "",
};

export const utilReducer = (state = utilInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_WANT_TO_DELETE:
      return {
        ...state,
        wantToDelete: !state.wantToDelete,
        method: payload?.method,
        id: payload?.id,
        image: payload?.image,
        type: payload?.type,
      };

    default:
      return state;
  }
};
