import { BACKEND_HOST } from "../../util/enum";

const PROJECT_URL = `${BACKEND_HOST}/api/projects`;

export const GET_HOME_PROJECTS_URL = `${PROJECT_URL}/home`;
export const GET_ALL_PROJECTS_URL = `${PROJECT_URL}/all`;
export const GET_RANDOM_PROJECTS_URL = `${PROJECT_URL}/random`;
export const SEARCH_PROJECT_URL = `${PROJECT_URL}`;

export const GET_PANEL_PROJECTS_URL = `${PROJECT_URL}/panel`;
export const GET_ONE_PROJECT = `${PROJECT_URL}/one`;
export const GET_PROJECTS_BY_STACK = `${PROJECT_URL}/stack`;
export const GET_PROJECTS_BY_TYPE = `${PROJECT_URL}/type`;

export const ADD_PROJECT_URL = `${PROJECT_URL}`;
export const UPDATE_PROJECT_URL = `${PROJECT_URL}`;
export const DELETE_PROJECT_URL = `${PROJECT_URL}`;
