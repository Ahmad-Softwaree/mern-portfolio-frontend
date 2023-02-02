import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ isHome, BACKEND_HOST }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.hash !== "") {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="layout w-100">
      <Header isHome={isHome} BACKEND_HOST={BACKEND_HOST} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
