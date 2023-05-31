import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Blogs from "./blogs/Blogs";
import Contact from "./contact/Contact";
import Home from "./home/Home";
import Projects from "./projects/Projects";
import Skills from "./skills/Skills";
import Works from "./work/Works";
import ScrollReveal from "scrollreveal";
import { connect } from "react-redux";

const Landing = ({ language: { language, file } }) => {
  //scroll nice animation

  useEffect(() => {
    const pageString = ["home", "blogs", "skills", "projects", "works", "contact"];
    pageString.forEach((page, index) => {
      ScrollReveal().reveal(`.${page}`, {
        duration: 1000,
        origin: "bottom",
        distance: "20px",
        reverse: true,
        opacity: 1,
      });
    });
  }, []);

  return (
    <div className="landing w-100 p-0 m-0 flex flex-column justify-center align-center">
      <Home file={file} />
      <Blogs language={language} file={file} />
      <Skills language={language} file={file} />
      <Projects language={language} file={file} />
      <Works language={language} file={file} />
      <Contact file={file} />
    </div>
  );
};

Landing.propTypes = {
  language: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps, {})(Landing);
