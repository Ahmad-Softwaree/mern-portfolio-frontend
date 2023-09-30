import {
  GET_ALL_SUBSCRIBE_FAIL,
  GET_ALL_SUBSCRIBE_START,
  GET_ALL_SUBSCRIBE_SUCCESS,
  ADD_SUBSCRIBE_FAIL,
  ADD_SUBSCRIBE_START,
  ADD_SUBSCRIBE_SUCCESS,
  DELETE_SUBSCRIBE_FAIL,
  DELETE_SUBSCRIBE_START,
  DELETE_SUBSCRIBE_SUCCESS,
} from "../../context/types/subscribe_types";

export const subscribeInitialState = {
  subscribes: [],
  getSubscribesLoading: false,
  addSubscribeLoading: false,
  deleteSubscribeLoading: false,
};

export const subscribeReducer = (state = subscribeInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_SUBSCRIBE_START:
      return {
        ...state,
        getSubscribesLoading: true,
      };
    case GET_ALL_SUBSCRIBE_FAIL:
      return {
        ...state,
        getSubscribesLoading: false,
      };
    case GET_ALL_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        subscribes: payload,

        getSubscribesLoading: false,
      };
    case ADD_SUBSCRIBE_START:
      return {
        ...state,
        addSubscribeLoading: true,
      };
    case ADD_SUBSCRIBE_FAIL:
      return {
        ...state,
        addSubscribeLoading: false,
      };
    case ADD_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        subscribes: [...state.subscribes, payload],

        addSubscribeLoading: false,
      };
    case DELETE_SUBSCRIBE_START:
      return {
        ...state,
        deleteSubscribeLoading: true,
      };
    case DELETE_SUBSCRIBE_FAIL:
      return {
        ...state,
        deleteSubscribeLoading: false,
      };
    case DELETE_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        subscribes: state.subscribes.filter((val) => val._id !== payload),

        deleteSubscribeLoading: false,
      };

    default:
      return state;
  }
};
