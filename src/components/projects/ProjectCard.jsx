import React, { Fragment, useContext, useState } from "react";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";
import DateMoment from "../global/DateMoment";
import { LanguageContext } from "../../context/LanguageContext";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ProjectStack from "./ProjectStack";
import ProjectGit from "./ProjectGit";
import ProjectType from "./ProjectType";
import { UiContext } from "../../context/UiContext";
import { PRIVATE } from "../../context/types/ui_types";
export default function ProjectCard({ index, val }) {
  const {
    state: { file, language },
  } = useContext(LanguageContext);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const { dispatch: uiDispatch } = useContext(UiContext);
  const moveBackground = (e) => {
    const { clientX, clientY } = e;
    const projectCardRect = e.currentTarget.getBoundingClientRect();

    const relativeX = clientX - projectCardRect.left;
    const relativeY = clientY - projectCardRect.top;
    let timeoutId;
    clearTimeout(timeoutId); // Clear the previous timeout

    timeoutId = setTimeout(() => {
      setMousePosition({ x: relativeX, y: relativeY });
    }, 100); // Delay in milliseconds
  };

  const { x, y } = mousePosition;
  const blurStyle = { left: `${x - 120}px`, top: `${y - 140}px` };
  return (
    <Element
      onMouseMove={moveBackground}
      name={`project-${index}`}
      data-aos="fade-right"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      id={`projectCardId-${index}`}
      className={`project-${index} projectCard relative bg-niceBlack flex flex-col justify-center items-end gap-5  flex-wrap  w-[350px] md:w-[550px] h-[650px] md:h-[600px] shadow-xl p-5 rounded-lg  ${
        language !== "en" && "items-start"
      }`}
    >
      {show && (
        <div
          className="w-fit absolute z-[100] flex flex-row justify-center items-center gap-2"
          style={blurStyle}
        >
          <div className="w-[40px] md:w-[60px] h-[40px] md:h-[60px] blur-[55px] bg-purple  opacity-70 transition-all duration-200 rounded-full"></div>
        </div>
      )}

      <div className="flex flex-col justify-left items-start gap-5 w-full">
        <span className="text-white !text-[14px] md:!text-[16px] font-Poppins">
          <DateMoment date={val.date} />
        </span>
        <img
          className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded-full object-cover"
          src={`${val.imageURL}`}
          alt="Project Image"
        />

        <div className="flex flex-col justify-left items-center gap-1 w-full">
          <h2 className="text-white !text-[16px] md:!text-[18px] font-[500] w-full">
            {language === "en"
              ? val.enTitle
              : language === "ar"
              ? val.arTitle
              : val.krTitle}
          </h2>
          <h2 className="text-niceGray !text-[16px] md:!text-[18px] font-[500] w-full ">
            {language === "en"
              ? val.enDesc.substring(0, 60).concat("...")
              : language === "ar"
              ? val.arDesc.substring(0, 60).concat("...")
              : val.krDesc.substring(0, 60).concat("...")}
            &nbsp;
            <Link
              to={`/projects/${val._id}`}
              className="!text-[14px] text-purple"
            >
              {file.blog.seeMore}
            </Link>
          </h2>
        </div>
      </div>
      <div className="types w-full flex flex-row justify-left items-center gap-5 flex-wrap">
        <div className="w-full flex flex-row justify-left items-center gap-5">
          <span className="!text-[16px] md:!text-[18px] text-white">
            <i className="fa-solid fa-diagram-project"></i>{" "}
          </span>
          <span className="!text-[16px] md:!text-[18px] text-white">
            {file.projects.types}
          </span>
        </div>
        {val.types.map((val, index) => {
          return index < 2 && <ProjectType val={val} key={index} />;
        })}
        <Link
          to={`/projects/${val._id}`}
          className="p-1 px-2 border-[3px] hover:bg-purple border-solid border-purple transition-all duration-300 w-fit  text-white !text-[12px] md:!text-[14px] rounded-md bg-transparent  cursor-pointer"
        >
          {file.blog.seeMore}..
        </Link>
      </div>

      <div className="gits w-full flex flex-row justify-left items-center gap-5 flex-wrap">
        <div className="w-full flex flex-row justify-left items-center gap-5">
          <span className="!text-[16px] md:!text-[18px] text-white">
            <i className="fa-brands fa-github"></i>
          </span>
          <span className="!text-[16px] md:!text-[18px] text-white">
            {file.projects.gits}
          </span>
        </div>
        {val.gits.length > 0 ? (
          <Fragment>
            {val.gits.map((val, index) => {
              return index < 1 && <ProjectGit val={val} key={index} />;
            })}
            <Link
              to={`/projects/${val._id}`}
              className="p-1 px-2 border-[3px] hover:bg-purple border-solid border-purple transition-all duration-300 w-fit  text-white !text-[12px] md:!text-[14px] rounded-md bg-transparent  cursor-pointer"
            >
              {file.blog.seeMore}..
            </Link>
          </Fragment>
        ) : (
          <span className="!text-[14px] md:!text-[16px] text-purple">
            {file.projects.privateGit}
          </span>
        )}
      </div>
      <div className="stacks w-full flex flex-row justify-left items-center gap-5 flex-wrap">
        <div className="w-full flex flex-row justify-left items-center gap-5">
          <span className="!text-[16px] md:!text-[18px] text-white">
            <i className="fa-solid fa-cubes"></i>
          </span>
          <span className="!text-[16px] md:!text-[18px] text-white">
            {file.projects.stacks}
          </span>
        </div>

        {val.stacks.map((val, index) => {
          return index < 4 && <ProjectStack val={val} key={index} />;
        })}
        <Link
          to={`/projects/${val._id}`}
          className="p-1 px-2 border-[3px] hover:bg-purple border-solid border-purple transition-all duration-300 w-fit  text-white !text-[12px] md:!text-[14px] rounded-md bg-transparent  cursor-pointer"
        >
          {file.blog.seeMore}..
        </Link>
      </div>
      <div className="w-full flex flex-row justify-between items-center gap-5">
        {val.url ? (
          <a
            href={`${val.url}`}
            target="_blank"
            className="preview flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1"
          >
            <span className="!text-[14px] text-white">
              {file.projects.preview}
            </span>
            <OpenInNewIcon className="text-white" fontSize="14px" />
          </a>
        ) : (
          <button
            onClick={() => {
              uiDispatch({ type: PRIVATE });
            }}
            className="flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1"
          >
            <span className="!text-[14px] text-white">
              {file.projects.private}
            </span>
            <OpenInNewIcon className="text-white" fontSize="14px" />
          </button>
        )}
        <Link
          to={`/projects/${val._id}`}
          className="more flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1"
        >
          <span className="!text-[14px] text-white">{file.projects.more}</span>
          <ReadMoreIcon className="text-white" fontSize="14px" />
        </Link>
      </div>
    </Element>
  );
}
