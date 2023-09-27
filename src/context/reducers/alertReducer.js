import {
  ADD_ALERT,
  DECREASE_ALERT_TIME,
  REMOVE_ALERT,
  REMOVE_ALL_ALERTS,
  TOGGLE_ALERT_SHOW,
} from "../types/alert_types";

export const alertInitialState = {
  alerts: [],
};

export const alertReducer = (state = alertInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ALERT:
      return {
        ...state,
        alerts: [
          ...state.alerts.filter((val) => val.text !== payload.text),
          payload,
        ],
      };
    case DECREASE_ALERT_TIME:
      var data = state.alerts;
      var index = data.findIndex((val) => val.id === payload);
      if (index !== -1) {
        data[index].time--;
      }
      return {
        ...state,
        alerts: data,
      };

    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((val) => val.id !== payload),
      };
    case TOGGLE_ALERT_SHOW:
      var data = state.alerts;
      var index = data.findIndex((val) => val.id === payload);
      if (index !== -1) {
        data[index].show = false;
      }
      return {
        ...state,
        alerts: data,
      };
    case REMOVE_ALL_ALERTS:
      return {
        ...state,
        alerts: [],
      };
    default:
      return state;
  }
};
