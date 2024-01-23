import { authApi, fileApi } from "./api.config";

export const setAxiosConfig = (token) => {
  if (token) {
    authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    authApi.defaults.headers.Authorization = `Bearer ${token}`;
    fileApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    fileApi.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete authApi.defaults.headers.common.Authorization;
    delete authApi.defaults.headers.Authorization;
    delete fileApi.defaults.headers.common.Authorization;
    delete authApi.defaults.headers.Authorization;
  }
};
