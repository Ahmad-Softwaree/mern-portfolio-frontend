import React, { Fragment, useEffect } from "react";
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
    <Fragment>
      <Header isHome={isHome} />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default Layout;
