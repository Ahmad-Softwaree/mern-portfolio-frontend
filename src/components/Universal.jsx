import PropTypes from "prop-types";
import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import Popup from "./Popup";

export const Universal = ({ language: { file, language } }) => {
  useLayoutEffect(() => {
    if (language === "en") {
      document.body.style.direction = "ltr";
      document.body.classList.remove("kurdish_font");
      document.body.classList.add("english_font");
    } else {
      document.body.style.direction = "rtl";
      document.body.classList.remove("english_font");
      document.body.classList.add("kurdish_font");
    }
  }, [language]);
  return (
    <>
      <Popup />
      <Outlet />
    </>
  );
};

Universal.propTypes = {
  language: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Universal);
