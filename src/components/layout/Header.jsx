import React, { useEffect, useState, useRef } from "react";
import { scroller } from "react-scroll";
import MobileNav from "./MobileNav";
import { useTranslation } from "react-i18next";
import { getBlogs } from "../../actions/blog";
import { getProjects } from "../../actions/project";
import { getWorks } from "../../actions/work";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Header = ({ isHome, BACKEND_HOST, blog, project, work, getBlogs, getProjects, getWorks }) => {
  //languages

  const [languages, setLanguages] = useState(false);

  //mobile navigation

  const [mobNav, setMobNav] = useState(false);

  //detecting active page part useEffect

  const [activeSection, setActiveSection] = useState("home");

  const handleSetActiveSection = (sectionId) => {
    //put the active section depend on the top and bottom of each of them
    setActiveSection(sectionId);
  };

  useEffect(() => {
    if (isHome) {
      //this if so we don't have error in other pages says that those element are not defined
      const handleScroll = () => {
        //we have all the domes every time
        const home = document.getElementById("home")?.getBoundingClientRect();
        const blog = document.getElementById("blogs")?.getBoundingClientRect();
        const whyUs = document.getElementById("skills")?.getBoundingClientRect();
        const services = document.getElementById("projects")?.getBoundingClientRect();
        const works = document.getElementById("works")?.getBoundingClientRect();

        const contact = document.getElementById("contact")?.getBoundingClientRect();

        const pageArray = [home, blog, whyUs, services, works, contact];
        const pageString = ["home", "blogs", "skills", "projects", "works", "contact"];

        // loop thorugh all of them and check for the top and the bottom
        pageArray.forEach((page, index) => {
          if (!page) return;
          if (page.top <= 150 && page.bottom > 150) {
            handleSetActiveSection(`${pageString[index]}`);
            return;
          }
        });
        //...and so on for all sections
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [activeSection, isHome]);

  //to show blogs or not

  useEffect(() => {
    getBlogs();
    getWorks();
    getProjects();
  }, []);

  const goNav = (name) => {
    setMobNav(false);
    scroller.scrollTo(name, {
      duration: 50,
      delay: 0,
      smooth: "linear",
    });
  };

  const { t, i18n } = useTranslation();

  return (
    <>
      {isHome && (
        <header className="header w-100 position-relative">
          {mobNav && (
            <MobileNav
              t={t}
              i18n={i18n}
              isHome={isHome}
              goNav={goNav}
              activeSection={activeSection}
              mobNav={mobNav}
              setMobNav={setMobNav}
            />
          )}

          {mobNav ? (
            <span
              onClick={() => {
                setMobNav(false);
              }}
              style={{
                position: "absolute",
                left: "30px",
                top: "0",
                bottom: "0",
                marginTop: "auto",
                marginBottom: "auto",
                fontSize: "1.5rem",
                height: "fit-content",
              }}
              className="xMobNav"
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          ) : (
            <span
              onClick={() => {
                setMobNav(true);
              }}
              className="humb"
              style={{
                position: "absolute",
                left: "30px",
                top: "0",
                bottom: "0",
                marginTop: "auto",
                marginBottom: "auto",
                fontSize: "1.5rem",
                height: "fit-content",
              }}
            >
              <i className="fa-solid fa-bars"></i>
            </span>
          )}

          <nav className="navigation flex flex-row justify-center align-center  w-100">
            <ul className="flex flex-row justify-center align-center gap-2 w-100">
              <li className="navItem">
                <span
                  onClick={() => {
                    goNav("home");
                  }}
                  className={`${activeSection === "home" && "activeNav"}`}
                >
                  {t("nav.home")}
                </span>
              </li>

              {blog.blogs.length !== 0 && (
                <li className="navItem">
                  <span
                    onClick={() => {
                      goNav("blogs");
                    }}
                    className={`${activeSection === "blogs" && "activeNav"}`}
                  >
                    {t("nav.blogs")}
                  </span>
                </li>
              )}

              <li className="navItem">
                <span
                  onClick={() => {
                    goNav("skills");
                  }}
                  className={`${activeSection === "skills" && "activeNav"}`}
                >
                  {t("nav.skills")}
                </span>
              </li>

              {project.projects.length !== 0 && (
                <li className="navItem">
                  <span
                    onClick={() => {
                      goNav("projects");
                    }}
                    className={`${activeSection === "projects" && "activeNav"}`}
                  >
                    {t("nav.projects")}
                  </span>
                </li>
              )}

              {work.works.length !== 0 && (
                <li className="navItem">
                  <span
                    onClick={() => {
                      goNav("works");
                    }}
                    className={`${activeSection === "works" && "activeNav"}`}
                  >
                    {t("nav.works")}
                  </span>
                </li>
              )}

              <li className="navItem">
                <span
                  onClick={() => {
                    goNav("contact");
                  }}
                  className={`${activeSection === "contact" && "activeNav"}`}
                >
                  {t("nav.contact")}
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
              <span>{i18n.language === "en" ? "EN" : i18n.language === "kr" ? "KR" : "AR"}</span>
              <span>
                <i className="fa-solid fa-globe"></i>
              </span>
            </div>

            {languages && (
              <div className="position-absolute languagesList flex flex-column justify-center align-center gap-1">
                <span
                  onClick={() => {
                    i18n.changeLanguage("en");
                    localStorage.setItem("lang", "en");
                    setLanguages(true);
                  }}
                >
                  EN
                </span>
                <span
                  onClick={() => {
                    setLanguages(true);
                    localStorage.setItem("lang", "kr");

                    i18n.changeLanguage("kr");
                  }}
                >
                  KR
                </span>
                <span
                  onClick={() => {
                    i18n.changeLanguage("ar");
                    localStorage.setItem("lang", "ar");

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
};

Header.propTypes = {
  getBlogs: PropTypes.func.isRequired,
  getWorks: PropTypes.func.isRequired,
  getProjects: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  work: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  work: state.work,
  project: state.project,
});

export default connect(mapStateToProps, {
  getBlogs,
  getProjects,
  getWorks,
})(Header);
