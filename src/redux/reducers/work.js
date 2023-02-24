import { FETCH_WORKS_FAIL, FETCH_WORKS_START, FETCH_WORKS_SUCCESS, REMOVE_WORKS_ERRORS } from "../../actions/types";

const initialState = {
  works: [],
  loading: false,
  error: null,
};

export default function work(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_WORKS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_WORKS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_WORKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        works: payload,
      };

    case REMOVE_WORKS_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
