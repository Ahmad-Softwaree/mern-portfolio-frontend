import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigator = useNavigate();
  useEffect(() => {
    if (Cookies.get("adminToken")) {
      Cookies.remove("adminToken");
    }
    if (Cookies.get("adminId")) {
      Cookies.remove("adminId");
    }
    navigator("/");
  }, []);
};

export default Logout;
