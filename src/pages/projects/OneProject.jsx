import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { ProjectContext } from "../../context/ProjectContext";
import { getOneProject } from "../../context/actions/projectAction";
import { AlertContext } from "../../context/AlertContext";
import DateMoment from "../../components/global/DateMoment";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ProjectType from "../../components/projects/ProjectType";
import ProjectGit from "../../components/projects/ProjectGit";
import ProjectStack from "../../components/projects/ProjectStack";
import LoadingOneProjectSkeleton from "../../components/loading/LoadingOneProjectSkeleton";
import ReturnBack from "../../components/global/ReturnBack";
import ReturnHome from "../../components/global/ReturnHome";
export default function OneProject() {
  const { project_id } = useParams();
  const {
    state: { file, language },
  } = useContext(LanguageContext);

  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: projectDispatch,
    state: { getOneProjectLoading, project },
  } = useContext(ProjectContext);

  useEffect(() => {
    getOneProject(projectDispatch, alertDispatch, project_id);
  }, [projectDispatch]);
  return (
    <section className="relative w-full flex flex-col justify-center items-center gap-5 min-h-screen text-white p-10 pb-[200px]">
      {getOneProjectLoading ? (
        <LoadingOneProjectSkeleton />
      ) : (
        <Fragment>
          <div className="w-full flex flex-row justify-left items-center gap-5">
            <ReturnBack />
            <ReturnHome />
          </div>
          <div className="flex flex-col justify-left items-start gap-[30px] w-full">
            <img
              className="w-full h-[340px] md:h-[450px] rounded-md object-contain border-2 border-solid border-niceBlack"
              src={`${project.imageURL}`}
              alt="Project Image"
            />
            <div className="w-full flex flex-row justify-between items-center gap-5">
              <span className="text-white font-bold !text-[14px] md:!text-[16px]">
                {file.date}: <DateMoment date={project.date} />
              </span>
              {project.url && (
                <a
                  target="_blank"
                  href={`${project.url}`}
                  className="flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1"
                >
                  <span className="!text-[14px] text-white">
                    {file.projects.preview}
                  </span>
                  <OpenInNewIcon className="text-white" fontSize="14px" />
                </a>
              )}
            </div>

            <div className="flex flex-col justify-left items-center gap-1 w-full">
              <h2 className="text-white !text-[16px] md:!text-[18px] font-[500] w-full">
                {language === "en"
                  ? project.enTitle
                  : language === "ar"
                  ? project.arTitle
                  : project.krTitle}
              </h2>
              <h2 className="text-niceGray !text-[16px] md:!text-[18px] font-[500] w-full ">
                {language === "en"
                  ? project.enDesc
                  : language === "ar"
                  ? project.arDesc
                  : project.krDesc}
              </h2>
            </div>
          </div>
          <div className="w-full flex flex-row justify-left items-center gap-5 flex-wrap">
            <div className="w-full flex flex-row justify-left items-center gap-5">
              <span className="!text-[16px] md:!text-[18px] text-white">
                <i className="fa-solid fa-diagram-project"></i>{" "}
              </span>
              <span className="!text-[16px] md:!text-[18px] text-white">
                {file.projects.types}
              </span>
            </div>
            {project.types.map((val, index) => {
              return <ProjectType val={val} key={index} />;
            })}
          </div>

          <div className="w-full flex flex-row justify-left items-center gap-5 flex-wrap">
            <div className="w-full flex flex-row justify-left items-center gap-5">
              <span className="!text-[16px] md:!text-[18px] text-white">
                <i className="fa-brands fa-github"></i>
              </span>
              <span className="!text-[16px] md:!text-[18px] text-white">
                {file.projects.gits}
              </span>
            </div>
            {project.gits.length > 0 ? (
              <Fragment>
                {project.gits.map((val, index) => {
                  return <ProjectGit val={val} key={index} />;
                })}
              </Fragment>
            ) : (
              <span className="!text-[14px] md:!text-[16px] text-purple">
                {file.projects.privateGit}
              </span>
            )}
          </div>
          <div className="w-full flex flex-row justify-left items-center gap-5 flex-wrap">
            <div className="w-full flex flex-row justify-left items-center gap-5">
              <span className="!text-[16px] md:!text-[18px] text-white">
                <i className="fa-solid fa-cubes"></i>
              </span>
              <span className="!text-[16px] md:!text-[18px] text-white">
                {file.projects.stacks}
              </span>
            </div>

            {project.stacks.map((val, index) => {
              return <ProjectStack val={val} key={index} />;
            })}
          </div>
        </Fragment>
      )}
    </section>
  );
}
