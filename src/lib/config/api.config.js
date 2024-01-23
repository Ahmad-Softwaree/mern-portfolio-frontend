import axios from "axios";
import { getCookie } from "./cookie.config";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ENUMs } from "../enum";
import { CONTEXT_TYPEs } from "@/context";

function performAction() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  dispatch({ type: CONTEXT_TYPEs.REMOVE_USER });
  navigate("/login");
}

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: "/api",
  headers: {
    common: {
      Authorization: `Bearer ${getCookie(ENUMs.COOKIE_NAME)}`,
    },
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie(ENUMs.COOKIE_NAME)}`,
  },
});

export const fileApi = axios.create({
  baseURL: "/api",
  headers: {
    common: {
      Authorization: `Bearer ${getCookie(ENUMs.COOKIE_NAME)}`,
    },
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${getCookie(ENUMs.COOKIE_NAME)}`,
  },
});

authApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      performAction();
    }
    return Promise.reject(err);
  }
);

fileApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      performAction();
    }
    return Promise.reject(err);
  }
);
