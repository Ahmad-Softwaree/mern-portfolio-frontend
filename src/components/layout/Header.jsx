import React, { useEffect, useState, useRef, useCallback } from "react";
import { scroller } from "react-scroll";
import MobileNav from "./MobileNav";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { ARABIC, ENGLISH, KURDISH } from "../../actions/types";
const Header = React.memo(({ isHome, blog, project, work, language: { language, file } }) => {
  const [languages, setLanguages] = useState(false);
  const [mobNav, setMobNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const dispatch = useDispatch();

  const handleScroll = useCallback(() => {
    const home = document.getElementById("home")?.getBoundingClientRect();
    const blog = document.getElementById("blogs")?.getBoundingClientRect();
    const whyUs = document.getElementById("skills")?.getBoundingClientRect();
    const services = document.getElementById("projects")?.getBoundingClientRect();
    const works = document.getElementById("works")?.getBoundingClientRect();
    const contact = document.getElementById("contact")?.getBoundingClientRect();

    const pageArray = [home, blog, whyUs, services, works, contact];
    const pageString = ["home", "blogs", "skills", "projects", "works", "contact"];
    pageArray.forEach((page, index) => {
      if (!page) return;
      if (page.top <= 150 && page.bottom > 150) {
        setActiveSection(`${pageString[index]}`);
        return;
      }
    });
    //...and so on for all sections
  }, []);

  useEffect(() => {
    if (isHome) {
      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [activeSection, isHome]);

  //to show blogs or not

  const goNav = useCallback((name) => {
    setMobNav(false);
    scroller.scrollTo(name, {
      duration: 50,
      delay: 0,
      smooth: "linear",
    });
  }, []);
  return (
    <>
      {isHome && (
        <header className="header w-100 position-relative">
          <MobileNav goNav={goNav} activeSection={activeSection} mobNav={mobNav} setMobNav={setMobNav} />

          <div
            onClick={() => setMobNav((prev) => !prev)}
            className={`humb flex flex-column justify-left align-center  ${mobNav && "xMobNav"}`}
          >
            <div className="x-1"></div>
            <div className="x-2"></div>
            <div className="x-3"></div>
          </div>

          <nav className="navigation flex flex-row justify-center align-center  w-100">
            <ul className="flex flex-row justify-center align-center  w-100">
              <li className="navItem">
                <span onClick={() => goNav("home")} className={`${activeSection === "home" && "activeNav"}`}>
                  {file.nav.home}
                </span>
              </li>

              {blog.blogs.length > 0 && !blog.blogLoading ? (
                <li className="navItem">
                  <span onClick={() => goNav("blogs")} className={`${activeSection === "blogs" && "activeNav"}`}>
                    {file.nav.blogs}
                  </span>
                </li>
              ) : blog.blogs.length === 0 && blog.blogLoading ? (
                <li className="navItem animatedNavItem">
                  <span>{file.nav.blogs}</span>
                </li>
              ) : null}

              <li className="navItem">
                <span onClick={() => goNav("skills")} className={`${activeSection === "skills" && "activeNav"}`}>
                  {file.nav.skills}
                </span>
              </li>

              {project.projects.length > 0 && !project.projectLoading ? (
                <li className="navItem">
                  <span onClick={() => goNav("projects")} className={`${activeSection === "projects" && "activeNav"}`}>
                    {file.nav.projects}
                  </span>
                </li>
              ) : project.projects.length === 0 && project.projectLoading ? (
                <li className="navItem animatedNavItem">
                  <span>{file.nav.projects}</span>
                </li>
              ) : null}

              {work.works.length > 0 && !work.worksLoading ? (
                <li className="navItem">
                  <span onClick={() => goNav("works")} className={`${activeSection === "works" && "activeNav"}`}>
                    {file.nav.works}
                  </span>
                </li>
              ) : work.works.length === 0 && work.workLoading ? (
                <li className="navItem animatedNavItem">
                  <span>{file.nav.works}</span>
                </li>
              ) : null}

              <li className="navItem">
                <span onClick={() => goNav("contact")} className={`${activeSection === "contact" && "activeNav"}`}>
                  {file.nav.contact}
                </span>
              </li>
            </ul>
          </nav>
          <div
            onClick={() => setLanguages((prev) => !prev)}
            className="languageDiv position-absolute flex flex-row justify-center align-center"
          >
            <div className="languageDivBox flex  flex-row justify-center align-center">
              {" "}
              <span>{language === "en" ? "EN" : language === "kr" ? "KR" : "AR"}</span>
              <span>
                <i className="fa-solid fa-globe"></i>
              </span>
            </div>

            {languages && (
              <div className="position-absolute languagesList flex flex-column justify-center align-center gap-1">
                <span
                  onClick={() => {
                    dispatch({
                      type: ENGLISH,
                    });
                    setLanguages(true);
                  }}
                >
                  EN
                </span>
                <span
                  onClick={() => {
                    dispatch({
                      type: KURDISH,
                    });
                  }}
                >
                  KR
                </span>
                <span
                  onClick={() => {
                    dispatch({
                      type: ARABIC,
                    });
                    setLanguages(true);
                  }}
                >
                  AR
                </span>
              </div>
            )}
          </div>
        </header>
      )}
    </>
  );
});

Header.propTypes = {
  blog: PropTypes.object.isRequired,
  work: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  language: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  work: state.work,
  project: state.project,
  language: state.language,
});

export default connect(mapStateToProps, {})(Header);
