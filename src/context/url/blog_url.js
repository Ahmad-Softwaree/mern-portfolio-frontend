import { BACKEND_HOST } from "../../util/enum";

const BLOG_URL = `${BACKEND_HOST}/api/blogs`;

export const GET_HOME_BLOGS_URL = `${BLOG_URL}/home`;
export const GET_ALL_BLOGS_URL = `${BLOG_URL}/all`;
export const GET_RANDOM_BLOGS_URL = `${BLOG_URL}/random`;
export const SEARCH_BLOG_URL = `${BLOG_URL}`;

export const GET_PANEL_BLOGS_URL = `${BLOG_URL}/panel`;
export const GET_ONE_BLOG = `${BLOG_URL}/one`;
export const GET_BLOGS_BY_CATEGORY = `${BLOG_URL}/category`;
export const ADD_BLOG_URL = `${BLOG_URL}`;
export const UPDATE_BLOG_URL = `${BLOG_URL}`;
export const DELETE_BLOG_URL = `${BLOG_URL}`;
