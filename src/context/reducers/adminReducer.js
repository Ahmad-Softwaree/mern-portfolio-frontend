import {
  AUTH_ERROR,
  ADD_ADMIN_FAIL,
  ADD_ADMIN_START,
  ADD_ADMIN_SUCCESS,
  DELETE_ADMIN_FAIL,
  DELETE_ADMIN_START,
  DELETE_ADMIN_SUCCESS,
  GET_ALL_ADMINS_FAIL,
  GET_ALL_ADMINS_START,
  GET_ALL_ADMINS_SUCCESS,
  GET_STORAGE_SIZE_FAIL,
  GET_STORAGE_SIZE_START,
  GET_STORAGE_SIZE_SUCCESS,
  AUTH_ADMIN,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_START,
  ADMIN_LOGIN_SUCCESS,
  UPDATE_ADMIN_FAIL,
  UPDATE_ADMIN_START,
  UPDATE_ADMIN_SUCCESS,
  ADMIN_LOGOUT_START,
  ADMIN_LOGOUT_FAIL,
  ADMIN_LOGOUT_SUCCESS,
} from "../types/admin_types";

export const adminInitialState = {
  admin: null,
  token: null,
  storageSize: 0,
  storageSizeLoading: true,
  loginLoading: false,
  logoutLoading: false,
  loading: true,
  admins: [],
  getAdminsLoading: true,
  deleteAdminLoading: false,
  updateAdminLoading: false,
  createAdminLoading: false,
};

export const adminReducer = (state = adminInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_ADMIN:
      return {
        ...state,
        admin: payload.admin,
        token: payload.token,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        admin: null,
        token: null,
        loading: false,
      };
    case ADMIN_LOGIN_START:
      return {
        ...state,
        loginLoading: true,
      };
    case ADMIN_LOGIN_FAIL:
      return {
        ...state,
        loginLoading: false,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        admin: payload.admin,
        token: payload.token,
        loginLoading: false,
        loading: false,
      };

    case ADMIN_LOGOUT_START:
      return {
        ...state,
        logoutLoading: true,
      };
    case ADMIN_LOGOUT_FAIL:
      return {
        ...state,
        logoutLoading: false,
      };
    case ADMIN_LOGOUT_SUCCESS:
      return {
        ...state,
        admin: null,
        token: null,
        logoutLoading: false,
        loading: false,
      };
    case GET_ALL_ADMINS_START:
      return {
        ...state,
        getAdminsLoading: true,
      };
    case GET_ALL_ADMINS_FAIL:
      return {
        ...state,
        getAdminsLoading: false,
      };
    case GET_ALL_ADMINS_SUCCESS:
      return {
        ...state,
        getAdminsLoading: false,
        admins: payload,
      };
    case ADD_ADMIN_START:
      return {
        ...state,
        createAdminLoading: true,
      };
    case ADD_ADMIN_FAIL:
      return {
        ...state,
        createAdminLoading: false,
      };
    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        createAdminLoading: false,
        admins: [...state.admins, payload.admin],
      };
    case DELETE_ADMIN_START:
      return {
        ...state,
        deleteAdminLoading: true,
      };
    case DELETE_ADMIN_FAIL:
      return {
        ...state,
        deleteAdminLoading: false,
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        deleteAdminLoading: false,
        admins: state.admins.filter((admin) => admin._id !== payload),
      };
    case UPDATE_ADMIN_START:
      return {
        ...state,
        updateAdminLoading: true,
      };
    case UPDATE_ADMIN_FAIL:
      return {
        ...state,
        updateAdminLoading: false,
      };
    case UPDATE_ADMIN_SUCCESS:
      return {
        ...state,
        updateAdminLoading: false,
        admins: [
          ...state.admins.filter((admin) => admin._id !== payload._id),
          payload,
        ],
        admin: payload.isMe ? payload.admin : state.admin,
      };
    case GET_STORAGE_SIZE_START:
      return {
        ...state,
        storageSizeLoading: true,
      };
    case GET_STORAGE_SIZE_FAIL:
      return {
        ...state,
        storageSizeLoading: false,
      };
    case GET_STORAGE_SIZE_SUCCESS:
      return {
        ...state,
        storageSizeLoading: false,
        storageSize: payload,
      };
    default:
      return state;
  }
};
