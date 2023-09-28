import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ProjectCard from "../../components/projects/ProjectCard";
import { Element } from "react-scroll";
import LoadingProjectSkeleton from "../../components/loading/LoadingProjectSkeleton";
import { AlertContext } from "../../context/AlertContext";
import { ProjectContext } from "../../context/ProjectContext";
import { getHomeProjects } from "../../context/actions/projectAction";
import NoData from "../../components/global/NoData";
import { LanguageContext } from "../../context/LanguageContext";
import { Link } from "react-router-dom";

export default function Projects() {
  const {
    state: { file, language },
  } = useContext(LanguageContext);
  const projectRef = useRef();
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: projectDispatch,
    state: { projects, getProjectsLoading },
  } = useContext(ProjectContext);
  const [way, setWay] = useState("right");

  useEffect(() => {
    getHomeProjects(projectDispatch, alertDispatch);
  }, [projectDispatch]);

  const scroll = (dist) => {
    if (projectRef.current) {
      let width;
      if (window.innerWidth > 770) {
        width = 550 + 50;
      } else {
        width = 350 + 50;
      }

      if (dist === "right") {
        projectRef.current.scrollTo({
          left: projectRef.current.scrollLeft + width,
          behaviour: "smooth",
        });
      } else {
        projectRef.current.scrollTo({
          left: projectRef.current.scrollLeft - width,
          behaviour: "smooth",
        });
      }
      projectRef.current.addEventListener("scroll", behaviour);
    }
  };

  const behaviour = () => {
    if (projectRef.current) {
      const isAtEnd =
        projectRef.current.scrollLeft + projectRef.current.clientWidth >=
        projectRef.current.scrollWidth;
      if (projectRef.current.scrollLeft === 0) setWay("right");
      if (isAtEnd) setWay("left");
      if (projectRef.current.scrollLeft > 0 && !isAtEnd) setWay("middle");
    }
  };

  return (
    <Element
      data-aos-offset="-400"
      data-aos="fade-up"
      className="w-full"
      name="projects"
    >
      <section
        id="projects"
        className="projects flex flex-col justify-left items-center w-full gap-2 overflow-auto !px-0"
      >
        <h1 className="text-white font-bold">{file.nav.projects}</h1>

        <div
          ref={projectRef}
          id="projectCards"
          className={`projectCards flex flex-col justify-left items-start max-h-[900px] flex-wrap gap-[50px] !px-5 md:!px-10 py-[50px] overflow-auto ${
            language !== "en" && "flex-row-reverse"
          }`}
        >
          {getProjectsLoading ? (
            <LoadingProjectSkeleton card={3} />
          ) : projects.length > 0 ? (
            <Fragment>
              {projects.map((val, index) => {
                return <ProjectCard key={index} index={index} val={val} />;
              })}
            </Fragment>
          ) : (
            <NoData />
          )}
        </div>

        <div
          className={`flex flex-row justify-center items-center gap-2 w-full ${
            language !== "en" && "flex-row-reverse"
          }`}
        >
          <span
            onClick={() => scroll("left")}
            className={`!text-[15px] text-white opacity-80 2-[40px] h-[40px] rounded-full p-2 transition-all duration-300 cursor-pointer hover:opacity-100 flex flex-row justify-center items-center px-4 ${
              (way === "left" || way === "middle") && "bg-purple"
            }`}
          >
            <i className={`fa-solid fa-angle-left`}></i>{" "}
          </span>
          <span
            onClick={() => scroll("right")}
            className={`!text-[15px] text-white opacity-80 2-[40px] h-[40px] rounded-full p-2 transition-all duration-300 cursor-pointer hover:opacity-100 flex flex-row justify-center items-center px-4 ${
              (way === "right" || way === "middle") && "bg-purple"
            }`}
          >
            <i className={`fa-solid fa-angle-right`}></i>
          </span>
        </div>
        <Link
          className="p-2 px-6 rounded-lg cursor-pointer text-white bg-transparent border-2 border-purple border-solid transition-all duration-300 my-5 hover:bg-purple hover:text-white"
          to={`/projects`}
        >
          {file.blog.seeMore}
        </Link>
      </section>
    </Element>
  );
}
