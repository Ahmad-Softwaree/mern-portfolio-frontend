import React, { useEffect, useState, useRef } from "react";
import { scroller } from "react-scroll";
import MobileNav from "./MobileNav";
import { useTranslation } from "react-i18next";
import axios from "axios";
const Header = ({ isHome, BACKEND_HOST }) => {
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

  const [canSeeBlog, setCanSeeBlog] = useState(true);
  const [canSeeProjects, setCanSeeProjects] = useState(true);
  const [canSeeWorks, setCanSeeWorks] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axios.get(`${BACKEND_HOST}/api/blog/`);
        const data = res.data;
        if (data.length === 0) setCanSeeBlog(false);
      } catch (err) {
        console.log(err);
      }
    };
    getBlogs();

    return () => {
      //
    };
  }, []);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(`${BACKEND_HOST}/api/project/`);
        const data = res.data;
        if (data.length === 0) setCanSeeProjects(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProjects();

    return () => {
      //
    };
  }, []);

  useEffect(() => {
    const getWorks = async () => {
      try {
        const res = await axios.get(`${BACKEND_HOST}/api/work/`);
        const data = res.data;
        if (data.length === 0) setCanSeeWorks(false);
      } catch (err) {
        console.log(err);
      }
    };
    getWorks();

    return () => {
      //
    };
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

              {canSeeBlog && (
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

              {canSeeProjects && (
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

              {canSeeWorks && (
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

export default Header;
