import {
  AUTH_ERROR,
  CREATE_ADMIN_FAIL,
  CREATE_ADMIN_START,
  CREATE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAIL,
  DELETE_ADMIN_START,
  DELETE_ADMIN_SUCCESS,
  GET_ALL_ADMINS_FAIL,
  GET_ALL_ADMINS_START,
  GET_ALL_ADMINS_SUCCESS,
  GET_STORAGE_SIZE_FAIL,
  GET_STORAGE_SIZE_START,
  GET_STORAGE_SIZE_SUCCESS,
  LOAD_USER,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  UPDATE_ADMIN_FAIL,
  UPDATE_ADMIN_START,
  UPDATE_ADMIN_SUCCESS,
} from "../../actions/types";

const initialState = {
  user: {},
  token: null,
  storageSize: 0,
  storageSizeLoading: false,
  loginLoading: false,
  loading: true,
  users: [],
  usersLoading: false,
  deleteLoading: false,
  updateLoading: false,
  createLoading: false,
};

export default function admin(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
      };
    case LOGIN_START:
      return {
        ...state,
        loginLoading: true,
        loading: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginLoading: false,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        user: payload.user,
        token: payload.token,
        loading: false,
      };
    case GET_ALL_ADMINS_START:
      return {
        ...state,
        usersLoading: true,
      };
    case GET_ALL_ADMINS_FAIL:
      return {
        ...state,
        usersLoading: false,
      };
    case GET_ALL_ADMINS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        users: payload,
      };
    case CREATE_ADMIN_START:
      return {
        ...state,
        createLoading: true,
      };
    case CREATE_ADMIN_FAIL:
      return {
        ...state,
        createLoading: false,
      };
    case CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        createLoading: false,
        users: [...state.users, payload.user],
      };
    case DELETE_ADMIN_START:
      return {
        ...state,
        deleteLoading: true,
      };
    case DELETE_ADMIN_FAIL:
      return {
        ...state,
        deleteLoading: false,
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        users: state.users.filter((user) => user._id !== payload),
      };
    case UPDATE_ADMIN_START:
      return {
        ...state,
        updateLoading: true,
      };
    case UPDATE_ADMIN_FAIL:
      return {
        ...state,
        updateLoading: false,
      };
    case UPDATE_ADMIN_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        users: [...state.users.filter((user) => user._id !== payload._id), payload],
        user: payload.isMe ? payload.user : state.user,
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
}
