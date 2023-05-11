import Cookies from "js-cookie";

export const removeCookie = (name) => {
  return Cookies.remove(name);
};

export const getCookie = (name) => {
  return Cookies.get(name);
};

export const setCookie = (name, token) => {
  Cookies.set(name, token, {
    sameSite: "strict",
    path: "/",
    expires: new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000),
  });
};
