import React, { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Home = ({ file }) => {
  //make the background goes with the mouse
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const jobs = useRef();
  const jobsArray = file.home.job;
  const moveBackground = (e) => {
    const { clientX, clientY } = e;
    let timeoutId;
    clearTimeout(timeoutId); // Clear the previous timeout

    timeoutId = setTimeout(() => {
      setMousePosition({ x: clientX, y: clientY });
    }, 100); // Delay in milliseconds
  };

  useEffect(() => {
    const animateJobs = async () => {
      for (let i = 1; i <= jobsArray.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const currentTop = parseInt(jobs.current?.style.top || "0", 10);

        if (i === jobsArray.length) {
          i = 0;
          jobs.current.style.top = 0 + "px";
        } else {
          jobs.current.style.top = currentTop - 60 + "px";
        }
      }
    };

    animateJobs();
  }, [jobs]);

  const { x, y } = mousePosition;
  const blurStyle = { left: `${x - 180}px`, top: `${y - 70}px` };
  return (
    <Element className="w-100" name="home">
      <section
        onMouseMove={moveBackground}
        id="home"
        className="home flex flex-row justify-between align-center w-100 position-relative gap-6 "
      >
        <div className="leftHome flex flex-column justify-left align-start gap-2 position-relative">
          <p>{file.home.welcome}</p>
          <h1 className="heading">
            {file.home.who}
            <span className="ahmadSoftware position-relative">
              {file.home.name}
              <img
                alt="Rect Image"
                src="/images/rect.svg"
                className="position-absolute"
              />
            </span>
          </h1>
          <div className="jobs">
            <div ref={jobs} className="innerJobs">
              {jobsArray.map((val, index) => {
                return <span key={index}>{val}</span>;
              })}
            </div>
          </div>
          <a href="/pdf/Resume.pdf" download className="showCV">
            {file.home.cv}
          </a>
        </div>

        <div className="rightHome position-relative">
          <img
            src="/images/ahmad.svg"
            alt="Ahmad Image"
            className="myImage position-relative"
          />
        </div>
        <div
          className="blurs position-absolute flex flex-row justify-center align-center"
          style={blurStyle}
        >
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
