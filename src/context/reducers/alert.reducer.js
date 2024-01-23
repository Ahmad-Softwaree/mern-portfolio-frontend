import { CONTEXT_TYPEs } from "..";

export const alertState = {
  alerts: [],
};

export const alertReducer = (state = alertState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONTEXT_TYPEs.ADD_ALERT:
      return {
        ...state,
        alerts: [
          ...state.alerts.filter((val) => val.text !== payload.text),
          payload,
        ],
      };
    case CONTEXT_TYPEs.DECREASE_ALERT_TIME:
      var data = state.alerts;
      var index = data.findIndex((val) => val.id === payload);
      if (index !== -1) {
        data[index].time--;
      }
      return {
        ...state,
        alerts: data,
      };

    case CONTEXT_TYPEs.DELETE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((val) => val.id !== payload),
      };
    case CONTEXT_TYPEs.TOGGLE_ALERT_SHOW:
      var data = state.alerts;
      var index = data.findIndex((val) => val.id === payload);
      if (index !== -1) {
        data[index].show = false;
      }
      return {
        ...state,
        alerts: data,
      };
    case CONTEXT_TYPEs.DELETE_ALL_ALERT:
      return {
        ...state,
        alerts: [],
      };
    default:
      return state;
  }
};
