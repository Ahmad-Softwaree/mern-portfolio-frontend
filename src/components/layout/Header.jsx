import React, { useEffect, useState, useRef } from "react";
import { scroller } from "react-scroll";
import MobileNav from "./MobileNav";
import { useTranslation } from "react-i18next";

const Header = ({ isHome }) => {
  //languages

  const [languages, setLanguages] = useState(false);

  //mobile navigation

  const [mobNav, setMobNav] = useState(false);

  //detecting active page part useEffect

  const [activeSection, setActiveSection] = useState("");

  const handleSetActiveSection = (sectionId) => {
    //put the active section depend on the top and bottom of each of them
    setActiveSection(sectionId);
  };

  useEffect(() => {
    if (isHome) {
      //this if so we don't have error in other pages says that those element are not defined
      const handleScroll = () => {
        //we have all the domes every time
        const home = document.getElementById("home").getBoundingClientRect();
        const blog = document.getElementById("blogs").getBoundingClientRect();
        const whyUs = document.getElementById("skills").getBoundingClientRect();
        const services = document.getElementById("projects").getBoundingClientRect();
        const contact = document.getElementById("contact").getBoundingClientRect();

        const pageArray = [home, blog, whyUs, services, contact];
        const pageString = ["home", "blogs", "skills", "projects", "contact"];

        // loop thorugh all of them and check for the top and the bottom
        pageArray.forEach((page, index) => {
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
            <span>
              <i className="fa-solid fa-globe"></i>
            </span>
            <span>{i18n.language === "en" ? "EN" : i18n.language === "kr" ? "KR" : "AR"}</span>

            {languages && (
              <div
                style={{
                  top: "2rem",
                }}
                className="position-absolute languagesList flex flex-column justify-center align-center gap-1"
              >
                <span
                  onClick={() => {
                    i18n.changeLanguage("en");
                    setLanguages(true);
                  }}
                >
                  EN
                </span>
                <span
                  onClick={() => {
                    setLanguages(true);
                    i18n.changeLanguage("kr");
                  }}
                >
                  KR
                </span>
                <span
                  onClick={() => {
                    i18n.changeLanguage("ar");
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
