import { TOGGLE_WANT_TO_DELETE } from "../types/util_types";

export const toggleDelete = (utilDispatch, payload) => {
  utilDispatch({
    type: TOGGLE_WANT_TO_DELETE,
    payload,
  });
};
