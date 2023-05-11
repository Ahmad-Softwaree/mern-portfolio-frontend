import React, { useEffect } from "react";
import { Element } from "react-scroll";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Home = ({ language, file }) => {
  return (
    <Element className="w-100" name="home">
      <section id="home" className="home flex flex-row justify-between align-center w-100 position-relative">
        <div className="leftHome flex flex-column justify-left align-start gap-2 position-relative">
          <p>{file.home.welcome}</p>
          <h1 className="heading">
            {file.home.who}
            <span className="ahmadSoftware position-relative">
              {file.home.name}
              <img src="/images/rect.svg" alt="" className="position-absolute" />
            </span>
          </h1>
          <h1 className="heading">{file.home.job}</h1>
          <a href="/pdf/Resume.pdf" download className="showCV">
            {file.home.cv}
          </a>
        </div>

        <div className="rightHome position-relative">
          <img src="/images/ahmad.svg" alt="" className="myImage position-relative" />
        </div>
        <div className="blurs position-absolute flex flex-row justify-center align-center">
          <div className="greenBlur blur"></div>
          <div className="purpleBlur blur"></div>
        </div>
      </section>
    </Element>
  );
};

Home.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
