import { BACKEND_HOST } from "../../util/enum";

const ADMIN_URL = `${BACKEND_HOST}/api/admin`;

export const GET_AUTH_TOKEN = `${ADMIN_URL}/jwt_token`;
export const ADMIN_LOGIN_URL = `${ADMIN_URL}/login`;
export const ADMIN_GET_ALL_BLOGS = `${ADMIN_URL}/all`;
export const GET_ALL_ADMINS = `${ADMIN_URL}`;
export const ADD_ADMIN = `${ADMIN_URL}`;
export const DELETE_ADMIN = `${ADMIN_URL}`;
export const UPDATE_ADMIN = `${ADMIN_URL}`;
