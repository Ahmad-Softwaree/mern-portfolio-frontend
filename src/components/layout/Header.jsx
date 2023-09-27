import React, {
  useEffect,
  useState,
  useCallback,
  Fragment,
  useContext,
} from "react";
import { scroller } from "react-scroll";
import MobileNav from "./MobileNav";
import { ARABIC, ENGLISH, KURDISH } from "../../context/types/language_types";
import Opacity from "../Opacity";
import { LanguageContext } from "../../context/LanguageContext";
import { BlogContext } from "../../context/BlogContext";
import { ProjectContext } from "../../context/ProjectContext";
import { WorkContext } from "../../context/WorkContext";

export default function Header({ isHome }) {
  const {
    dispatch: languageDispatch,
    state: { language, file },
  } = useContext(LanguageContext);
  const {
    state: { blogs, getBlogsLoading },
  } = useContext(BlogContext);
  const {
    state: { projects, getProjectsLoading },
  } = useContext(ProjectContext);
  const {
    state: { works, getWorksLoading },
  } = useContext(WorkContext);
  const [languages, setLanguages] = useState(false);
  const [mobNav, setMobNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = useCallback(() => {
    const home = document.getElementById("home")?.getBoundingClientRect();
    const blog = document.getElementById("blogs")?.getBoundingClientRect();
    const skills = document.getElementById("skills")?.getBoundingClientRect();
    const about = document.getElementById("about")?.getBoundingClientRect();
    const services = document
      .getElementById("services")
      ?.getBoundingClientRect();

    const projects = document
      .getElementById("projects")
      ?.getBoundingClientRect();
    const certificate = document
      .getElementById("certificate")
      ?.getBoundingClientRect();
    const works = document.getElementById("works")?.getBoundingClientRect();
    const contact = document.getElementById("contact")?.getBoundingClientRect();

    const pageArray = [
      home,
      blog,
      about,
      services,
      skills,
      projects,
      certificate,
      works,
      contact,
    ];
    const pageString = [
      "home",
      "blogs",
      "about",
      "services",
      "skills",
      "projects",
      "certificate",
      "works",
      "contact",
    ];
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
    <Fragment>
      <MobileNav
        goNav={goNav}
        activeSection={activeSection}
        mobNav={mobNav}
        setMobNav={setMobNav}
      />

      {mobNav && <Opacity />}
      {isHome && (
        <header
          className={`w-full fixed top-0 right-0 left-0 bg-black text-white  flex flex-row justify-between items-center gap-5 px-5 min-h-[60px] z-[900] shadow-xl`}
        >
          <div
            onClick={() => setMobNav((prev) => !prev)}
            className="flex xl:hidden cursor-pointer flex-col justify-center items-center gap-2 z-[900]"
          >
            <div
              className={`w-[30px] h-[3px] bg-white rounded-lg transition-all duration-200 ${
                mobNav && "rotate-45 translate-y-[5px]"
              }`}
            ></div>
            <div
              className={`w-[30px] h-[3px] bg-white rounded-lg transition-all duration-200 ${
                mobNav && "hidden"
              }`}
            ></div>
            <div
              className={`w-[30px] h-[3px] bg-white rounded-lg transition-all duration-200 ${
                mobNav && "-rotate-45 -translate-y-[5px]"
              }`}
            ></div>
          </div>

          <nav className="flex-row justify-center  items-center  w-full hidden xl:flex">
            <li
              onClick={() => goNav("home")}
              className={`${
                activeSection === "home" && "border-purple text-purple"
              }`}
            >
              <span>{file.nav.home}</span>
            </li>

            <li
              onClick={() => goNav("blogs")}
              className={`${
                activeSection === "blogs" && "border-purple text-purple"
              }`}
            >
              <span>{file.nav.blogs}</span>
            </li>
            <li
              onClick={() => goNav("about")}
              className={`${
                activeSection === "about" && "border-purple text-purple"
              }`}
            >
              <span>{file.nav.about}</span>
            </li>
            <li
              onClick={() => goNav("services")}
              className={`${
                activeSection === "services" && "border-purple text-purple"
              }`}
            >
              <span>{file.nav.services}</span>
            </li>
            <li
              onClick={() => goNav("skills")}
              className={`${
                activeSection === "skills" && "border-purple text-purple"
              }`}
            >
              <span>{file.nav.skills}</span>
            </li>

            <li
              onClick={() => goNav("projects")}
              className={`${
                activeSection === "projects" && "border-purple text-purple"
              }`}
            >
              <span>{file.nav.projects}</span>
            </li>
            <li
              onClick={() => goNav("certificate")}
              className={`${
                activeSection === "certificate" && "border-purple text-purple"
              }`}
            >
              <span>{file.nav.certificate}</span>
            </li>
            <li
              onClick={() => goNav("works")}
              className={`${
                activeSection === "works" && "border-purple text-purple"
              }`}
            >
              <span>{file.nav.works}</span>
            </li>

            <li
              onClick={() => goNav("contact")}
              className={`${
                activeSection === "contact" && "border-purple text-purple"
              }`}
            >
              <span>{file.nav.contact}</span>
            </li>
          </nav>
          {/* <div
            onClick={() => setLanguages((prev) => !prev)}
            className={`absolute ${
              language === "en" ? "right-5" : "left-5"
            } top-0 bottom-0 my-auto h-fit z-[900]`}
          >
            <div className="flex flex-row border-purple text-purple border-2 border-solid gap-2 rounded-lg p-1 transition-all duration-200 cursor-pointer px-3 hover:text-white hover:bg-purple">
              <span className="!text-[14px] font-bold">
                {language === "en" ? "EN" : language === "kr" ? "KR" : "AR"}
              </span>
              <span className="!text-[14px] font-bold">
                <i className="fa-solid fa-globe"></i>
              </span>
            </div>

            {languages && (
              <div
                data-aos="fade-up"
                className="absolute top-[100%] right-0 left-0 bg-black text-white rounded-t-lg rounded-b-lg flex flex-col justify-left items-center z-[900] shadow-xl"
              >
                <span
                  className={`p-2 !text-[12px] w-full hover:bg-purple hover:text-white text-center cursor-pointer transition-all duration-200 rounded-t-lg ${
                    language === "en" && "bg-purple"
                  }`}
                  onClick={() => {
                    languageDispatch({
                      type: ENGLISH,
                    });
                    setLanguages(true);
                  }}
                >
                  EN
                </span>
                <span
                  className={`p-2 !text-[12px] w-full hover:bg-purple hover:text-white text-center cursor-pointer transition-all duration-200  ${
                    language === "kr" && "bg-purple"
                  }`}
                  onClick={() => {
                    languageDispatch({
                      type: KURDISH,
                    });
                  }}
                >
                  KR
                </span>
                <span
                  className={`p-1 py-2 !text-[12px] w-full hover:bg-purple hover:text-white text-center cursor-pointer rounded-b-lg transition-all duration-200 ${
                    language === "ar" && "bg-purple"
                  }`}
                  onClick={() => {
                    languageDispatch({
                      type: ARABIC,
                    });
                    setLanguages(true);
                  }}
                >
                  AR
                </span>
              </div>
            )}
          </div> */}
        </header>
      )}
    </Fragment>
  );
}
