import axios from "axios";
import { adminAuthApi, adminFileApi, adminPdfFileApi, api } from "./api";

export const setAxiosConfig = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
    axios.defaults.headers.Authorization = token;
    api.defaults.headers.common.Authorization = token;
    api.defaults.headers.Authorization = token;
    adminAuthApi.defaults.headers.common.Authorization = token;
    adminAuthApi.defaults.headers.Authorization = token;
    adminFileApi.defaults.headers.common.Authorization = token;
    adminFileApi.defaults.headers.Authorization = token;
    adminPdfFileApi.defaults.headers.Authorization = token;
    adminPdfFileApi.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
    delete axios.defaults.headers.Authorization;
    delete api.defaults.headers.common.Authorization;
    delete api.defaults.headers.Authorization;
    delete adminAuthApi.defaults.headers.common.Authorization;
    delete adminAuthApi.defaults.headers.Authorization;
    delete adminFileApi.defaults.headers.common.Authorization;
    delete adminAuthApi.defaults.headers.Authorization;
  }
};
