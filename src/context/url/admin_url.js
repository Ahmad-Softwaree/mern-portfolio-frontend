import { BACKEND_HOST } from "../../util/enum";

const ADMIN_URL = `${BACKEND_HOST}/api/admin`;

export const GET_AUTH_TOKEN_URL = `${ADMIN_URL}/jwt_token`;
export const ADMIN_LOGIN_URL = `${ADMIN_URL}/login`;
export const ADMIN_GET_ALL_BLOGS_URL = `${ADMIN_URL}/all`;
export const GET_ALL_ADMINS_URL = `${ADMIN_URL}`;
export const ADD_ADMIN_URL = `${ADMIN_URL}`;
export const DELETE_ADMIN_URL = `${ADMIN_URL}`;
export const UPDATE_ADMIN_URL = `${ADMIN_URL}`;
