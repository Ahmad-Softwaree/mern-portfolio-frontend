import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ isHome }) => {
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
      <Header isHome={isHome} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
