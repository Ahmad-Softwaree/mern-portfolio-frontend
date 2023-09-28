import React, { useState, useEffect, useContext, Fragment } from "react";
import { AlertContext } from "../context/AlertContext";
import { ProjectContext } from "../context/ProjectContext";
import { LanguageContext } from "../context/LanguageContext";
import Opacity from "../components/Opacity";
import SearchBox from "../components/global/SearchBox";
import NoData from "../components/global/NoData";
import RefreshData from "../components/global/RefreshData";
import { getAllProjects } from "../context/actions/projectAction";
import ProjectCard from "../components/projects/ProjectCard";
import LoadingProjectSkeleton from "../components/loading/LoadingProjectSkeleton";
import ReturnBack from "../components/global/ReturnBack";
import ReturnHome from "../components/global/ReturnHome";
export default function ProjectsPage() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: projectDispatch,
    state: { projects, getProjectsLoading },
  } = useContext(ProjectContext);
  const {
    state: { file, language },
  } = useContext(LanguageContext);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    getAllProjects(projectDispatch, alertDispatch);
  }, [projectDispatch]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.classList.contains("searchBox")) {
        setSearch(false);
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        setSearch(false);
      }
    });

    return () => {
      window.removeEventListener("click", () => {});
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-left items-center gap-10">
      {search && <Opacity />}
      {search && <SearchBox method={`project`} setSearch={setSearch} />}

      <div className="w-full flex flex-row justify-left items-center gap-5">
        <ReturnBack />
        <ReturnHome />
      </div>
      <div className="flex flex-row justify-between items-center w-full px-5 md:px-10">
        <h1 className="text-white font-bold">{file.nav.projects}</h1>
        <div
          onClick={() => setSearch(true)}
          className="searchBox w-[200px] md:w-[300px] p-2 px-4 bg-lightBlack text-white rounded-md flex flex-row justify-left items-center gap-2 border-2 border-solid border-lightBlack transition-all duration-300 hover:border-purple cursor-pointer hover:text-purple"
        >
          <span className="!text-[14px] searchBox">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <span className="!text-[14px] searchBox">click to search</span>
        </div>
      </div>

      <div className="allBlogs flex flex-row justify-center align-center gap-3 w-full flex-wrap">
        {getProjectsLoading ? (
          <LoadingProjectSkeleton card={3} />
        ) : projects.length > 0 ? (
          <Fragment>
            {projects?.map((val, index) => {
              return <ProjectCard key={index} val={val} />;
            })}
          </Fragment>
        ) : (
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <NoData />
            <RefreshData
              setter={() => getAllProjects(projectDispatch, alertDispatch)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
