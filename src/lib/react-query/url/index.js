import { ENUMs } from "@/lib/enum";
const API = ENUMs.API;
export const URLs = {
  //AUTH
  LOGIN: `${API}/auth/login`,
  GET_AUTH: `${API}/auth/current`,

  //USER

  GET_USERS: `${API}/user`,
  ADD_USER: `${API}/user`,
  UPDATE_USER: `${API}/user`,
  DELETE_USER: `${API}/user`,

  //SKILL

  GET_SKILLS: `${API}/skill`,
  ADD_SKILL: `${API}/skill`,
  UPDATE_SKILL: `${API}/skill`,
  DELETE_SKILL: `${API}/skill`,

  //WORK

  GET_WORKS: `${API}/work`,
  ADD_WORK: `${API}/work`,
  UPDATE_WORK: `${API}/work`,
  DELETE_WORK: `${API}/work`,

  //PROJECT

  GET_PROJECTS: `${API}/project`,
  GET_PROJECT: `${API}/project/one`,

  SEARCH_PROJECTS: `${API}/project/search`,

  ADD_PROJECT: `${API}/project`,
  UPDATE_PROJECT: `${API}/project`,
  DELETE_PROJECT: `${API}/project`,

  //CERTIFICATE

  GET_CERTIFICATES: `${API}/certificate`,
  GET_CERTIFICATE: `${API}/certificate/one`,

  SEARCH_CERTIFICATES: `${API}/certificate/search`,

  ADD_CERTIFICATE: `${API}/certificate`,
  UPDATE_CERTIFICATE: `${API}/certificate`,
  DELETE_CERTIFICATE: `${API}/certificate`,

  //BLOG

  GET_INFINITE_BLOGS: `${API}/blog/infinite`,
  GET_BLOGS: `${API}/blog`,

  GET_BLOG: `${API}/blog/one`,
  GET_RELATED_BLOGS: `${API}/blog/related`,

  SEARCH_BLOGS: `${API}/blog/search`,

  ADD_BLOG: `${API}/blog`,
  UPDATE_BLOG: `${API}/blog`,
  DELETE_BLOG: `${API}/blog`,

  //SUBSCRIBER

  GET_SUBSCRIBERS: `${API}/subscribe`,
  ADD_SUBSCRIBER: `${API}/subscribe`,

  //CONFIG

  GET_CONFIG: `${API}/config`,
  ADD_CONFIG: `${API}/config`,
  DELETE_CONFIG: `${API}/config`,
  UPDATE_CONFIG: `${API}/config`,
};
