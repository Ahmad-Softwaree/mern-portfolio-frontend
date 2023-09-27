import axios from "axios";
import { getCookie } from "./cookie";
import { ADMIN_COOKIE_NAME } from "./enum";

import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { ADMIN_LOGOUT } from "../context/types/admin_types";

function performAdminAction() {
  const { dispatch: authDispatch } = useContext(AdminContext);
  const navigate = useNavigate();
  authDispatch({ type: ADMIN_LOGOUT });
  navigate("/admin_login");
}
export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const adminApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const adminAuthApi = axios.create({
  baseURL: "/api",
  headers: {
    common: {
      Authorization: `Bearer ${getCookie(ADMIN_COOKIE_NAME)}`,
    },
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie(ADMIN_COOKIE_NAME)}`,
  },
});

export const adminPdfFileApi = axios.create({
  baseURL: "/api",
  responseType: "arraybuffer",
  headers: {
    common: {
      Authorization: `Bearer ${getCookie(ADMIN_COOKIE_NAME)}`,
    },
    "Content-Type": "application/pdf",
    Authorization: `Bearer ${getCookie(ADMIN_COOKIE_NAME)}`,
  },
});

export const adminFileApi = axios.create({
  baseURL: "/api",
  headers: {
    common: {
      Authorization: `Bearer ${getCookie(ADMIN_COOKIE_NAME)}`,
    },
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${getCookie(ADMIN_COOKIE_NAME)}`,
  },
});

adminAuthApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      performAdminAction();
    }
    return Promise.reject(err);
  }
);
