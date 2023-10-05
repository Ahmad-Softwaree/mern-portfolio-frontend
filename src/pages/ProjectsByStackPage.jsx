import React, { useState, useEffect, useContext, Fragment } from "react";
import { AlertContext } from "../context/AlertContext";
import { ProjectContext } from "../context/ProjectContext";
import { LanguageContext } from "../context/LanguageContext";
import Opacity from "../components/Opacity";
import SearchBox from "../components/global/SearchBox";
import NoData from "../components/global/NoData";
import RefreshData from "../components/global/RefreshData";
import { getProjectsByStack } from "../context/actions/projectAction";
import ProjectCard from "../components/projects/ProjectCard";
import LoadingProjectSkeleton from "../components/loading/LoadingProjectSkeleton";
import { Link, useParams } from "react-router-dom";
import { StackContext } from "../context/StackContext";
import { getOneStack } from "../context/actions/stackAction";
import ReturnBack from "../components/global/ReturnBack";
import ReturnHome from "../components/global/ReturnHome";
export default function ProjectsByStackPage() {
  const { stack_id } = useParams();
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: projectDispatch,
    state: { projects, getProjectsLoading },
  } = useContext(ProjectContext);
  const {
    state: { file, language },
  } = useContext(LanguageContext);
  const {
    dispatch: stackDispatch,
    state: { stack, getOneStackLoading },
  } = useContext(StackContext);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    getProjectsByStack(projectDispatch, alertDispatch, stack_id);
  }, [projectDispatch, stack_id]);

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

  useEffect(() => {
    getOneStack(stackDispatch, alertDispatch, stack_id);
  }, [stackDispatch, stack_id]);

  return (
    <section className="w-full min-h-screen flex flex-col justify-left items-center gap-10">
      {search && <Opacity />}
      {search && <SearchBox method={`project`} setSearch={setSearch} />}
      <div className="w-full flex flex-row justify-left items-center gap-5">
        <ReturnBack />
        <ReturnHome />
      </div>
      <div className="flex flex-col md:flex-row gap-5 justify-between items-start md:items-center w-full px-5 md:px-10">
        <div className="flex flex-row justify-left items-center gap-5">
          {language === "en" ? (
            <h1 className="text-white font-bold">
              {stack?.name}
              {file.nav.projects}
            </h1>
          ) : (
            <h1 className="text-white font-bold">
              {language === "kr"
                ? file.nav.projects.concat("ی")
                : file.nav.projects}{" "}
              &nbsp;
              {stack?.name}
            </h1>
          )}
          <Link
            to={`/`}
            className="!text-[20px] text-white transition-all duration-300 hover:text-purple cursor-pointer"
          >
            <i className="fa-solid fa-house"></i>
          </Link>
        </div>
        <div
          onClick={() => setSearch(true)}
          className="searchBox w-[200px] md:w-[300px] p-2 px-4 bg-lightBlack text-white rounded-md flex flex-row justify-left items-center gap-2 border-2 border-solid border-lightBlack transition-all duration-300 hover:border-purple cursor-pointer hover:text-purple"
        >
          <span className="!text-[14px] searchBox">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <span className="!text-[14px] searchBox">{file.search.search}</span>
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
              setter={() =>
                getProjectsByStack(projectDispatch, alertDispatch, stack_id)
              }
            />
          </div>
        )}
      </div>
    </section>
  );
}
