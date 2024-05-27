import { UiContext } from "@/context/UiContext";
import { UtilContext } from "@/context/UtilContext";
import { CONTEXT_TYPEs } from "@/context";
import {
  Card,
  Image,
  CardBody,
  Stack as ChakraStack,
  CardFooter,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Text,
} from "@chakra-ui/react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

import { useContext, useState } from "react";
import { AdminPath } from "../providers/_user";
import { RootPath } from "../providers/_root";
import { Link } from "react-router-dom";
import { LanguageContext } from "@/context/LanguageContext";
import { convertTimeStampToDate } from "@/lib/functions";
import { Type, Stack } from "../shared";
import ProjectGit from "../shared/ProjectGit";
export const ProjectCard = ({ val, index }) => {
  const {
    state: { lang, file },
  } = useContext(LanguageContext);
  const { dispatch } = useContext(UiContext);
  const { dispatch: util } = useContext(UtilContext);
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
    <>
      <AdminPath>
        {({}) => {
          return (
            <Card className="!w-full col-span-full md:col-span-4 lg:col-span-3 !bg-black-600 !text-white-500">
              <CardBody>
                <Image
                  src={val.imageURL}
                  alt="Green double couch with wooden legs"
                  className="!w-[100px] !h-[100px] !object-contain !rounded-full"
                />
                <ChakraStack mt="6" spacing="3">
                  <Heading size="md">
                    {" "}
                    {lang === "en"
                      ? val.enTitle
                      : lang === "ar"
                      ? val.arTitle
                      : val.krTitle}
                  </Heading>
                </ChakraStack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button
                    onClick={() => {
                      dispatch({
                        type: CONTEXT_TYPEs.PROJECT_FORM,
                        payload: {
                          data: val,
                          id: val._id,
                          type: "update",
                        },
                      });
                    }}
                    variant="solid"
                    colorScheme="teal"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() =>
                      util({
                        type: CONTEXT_TYPEs.DELETE,
                        payload: {
                          method: CONTEXT_TYPEs.DELETE_PROJECT,
                          id: val._id,
                          image: val.imageName,
                        },
                      })
                    }
                    variant="ghost"
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        }}
      </AdminPath>
      <RootPath>
        {({}) => {
          return (
            <div
              onMouseMove={moveBackground}
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              className={`project-${index} projectCard h-full relative bg-black-500 col-span-full md:col-span-6 ld:col-span-4 flex flex-col justify-center items-end gap-5  flex-wrap w-full shadow-xl p-5 rounded-lg  ${
                lang !== "en" && "items-start"
              }`}
            >
              {show && (
                <div
                  className="w-fit absolute z-[100] flex flex-row justify-center items-center gap-2"
                  style={blurStyle}
                >
                  <div className="w-[40px] md:w-[60px] h-[40px] md:h-[60px] blur-[55px] bg-primary-500  opacity-70 transition-all duration-200 rounded-full"></div>
                </div>
              )}

              <div className="flex flex-col justify-left items-start gap-5 w-full">
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-10">
                  <div className="flex flex-row justify-left items-center gap-5">
                    <img
                      className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded-full object-cover"
                      src={`${val.imageURL}`}
                      alt="Project Image"
                    />
                    <h2 className="text-white !text-[16px] md:!text-[18px] font-[500] w-full">
                      {lang === "en"
                        ? val.enTitle
                        : lang === "ar"
                        ? val.arTitle
                        : val.krTitle}
                    </h2>
                  </div>
                  <span className="text-white !text-[14px] md:!text-[16px] font-Poppins">
                    {convertTimeStampToDate(val.date)}
                  </span>
                </div>

                <div className="flex flex-col justify-left items-center gap-1 w-full">
                  <h2 className="text-niceGray !text-[16px] md:!text-[18px] font-[500] w-full ">
                    {lang === "en"
                      ? val.enDesc.substring(0, 60).concat("...")
                      : lang === "ar"
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
              <div className="hidden md:flex types w-full  flex-row justify-left items-center gap-5 flex-wrap">
                <div className="w-full flex flex-row justify-left items-center gap-5">
                  <span className="!text-[16px] md:!text-[18px] text-white">
                    <i className="fa-solid fa-diagram-project"></i>{" "}
                  </span>
                  <span className="!text-[16px] md:!text-[18px] text-white">
                    {file.projects.types}
                  </span>
                </div>
                {val.types.length > 0 &&
                  val.types.map((one, index) => {
                    return (
                      index < 2 && (
                        <Type
                          to={`/projects?type=${val.types[0]?._id}`}
                          val={one}
                          key={index}
                        />
                      )
                    );
                  })}
                <Link
                  to={`/projects/${val._id}`}
                  className="p-1 px-2 border-[3px] hover:bg-purple border-solid border-purple transition-all duration-300 w-fit  text-white !text-[12px] md:!text-[14px] rounded-md bg-transparent  cursor-pointer"
                >
                  {file.blog.seeMore}..
                </Link>
              </div>

              <div className="hidden md:flex gits w-full  flex-row justify-left items-center gap-5 flex-wrap">
                <div className="w-full flex flex-row justify-left items-center gap-5">
                  <span className="!text-[16px] md:!text-[18px] text-white">
                    <i className="fa-brands fa-github"></i>
                  </span>
                  <span className="!text-[16px] md:!text-[18px] text-white">
                    {file.projects.gits}
                  </span>
                </div>
                {val.gits.length > 0 && val.gits.length > 0 ? (
                  <>
                    {val.gits.map((val, index) => {
                      return index < 1 && <ProjectGit val={val} key={index} />;
                    })}
                    <Link
                      to={`/projects/${val._id}`}
                      className="p-1 px-2 border-[3px] hover:bg-purple border-solid border-purple transition-all duration-300 w-fit  text-white !text-[12px] md:!text-[14px] rounded-md bg-transparent  cursor-pointer"
                    >
                      {file.blog.seeMore}..
                    </Link>
                  </>
                ) : (
                  <span className="!text-[14px] md:!text-[16px] text-purple">
                    {file.projects.privateGit}
                  </span>
                )}
              </div>
              <div className="stacks w-full flex flex-row justify-left items-center gap-3 md:gap-5 flex-wrap">
                <div className="hidden md:flex w-full  flex-row justify-left items-center gap-5">
                  <span className="!text-[16px] md:!text-[18px] text-white">
                    <i className="fa-solid fa-cubes"></i>
                  </span>
                  <span className="!text-[16px] md:!text-[18px] text-white">
                    {file.projects.stacks}
                  </span>
                </div>

                {val.stacks.length > 0 &&
                  val.stacks.map((one, index) => {
                    return (
                      index < 4 && (
                        <Stack
                          to={`/projects?stack=${val.stacks[0]?._id}`}
                          val={one}
                          key={index}
                        />
                      )
                    );
                  })}
                <Link
                  to={`/projects/${val._id}`}
                  className="p-1 px-2 border-[3px] hover:bg-purple border-solid border-purple transition-all duration-300 w-fit  text-white-500 text-caption1-light  md:text-text1-light rounded-md bg-transparent  cursor-pointer"
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
                    <span className="text-caption1-light  md:text-text1-light text-white-500">
                      {file.projects.preview}
                    </span>
                    <ReadMoreIcon className="text-white" fontSize="14px" />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      uiDispatch({ type: CONTEXT_TYPEs.PRIVATE });
                    }}
                    className="flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1"
                  >
                    <span className="text-caption1-light  md:text-text1-light text-red-500">
                      {file.projects.private}
                    </span>
                    <OpenInNewIcon className="text-white" fontSize="14px" />
                  </button>
                )}
                <Link
                  to={`/projects/${val._id}`}
                  className="more flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1"
                >
                  <span className="text-caption1-light  md:text-text1-light text-white">
                    {file.projects.more}
                  </span>
                  <ReadMoreIcon className="text-white" fontSize="14px" />
                </Link>
              </div>
            </div>
          );
        }}
      </RootPath>
    </>
  );
};

export default ProjectCard;
