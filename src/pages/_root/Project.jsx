import { Loader, Stack, Type } from "@/components/shared";
import { LanguageContext } from "@/context/LanguageContext";
import { convertTimeStampToMomentMonth } from "@/lib/functions";
import { useGetProject } from "@/lib/react-query/query/project.query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ProjectGit from "@/components/shared/ProjectGit";
export default function Project() {
  const {
    state: { file, lang },
  } = useContext(LanguageContext);
  const { id } = useParams();
  const { data, isLoading } = useGetProject(id);

  return (
    <section className="element min-h-screen">
      {isLoading ? (
        <Loader size="xl" screen={true} />
      ) : (
        <>
          <div className="flex flex-col justify-left items-start gap-[30px] w-full">
            <img
              className="w-full h-[340px] md:h-[450px] rounded-md object-contain border-2 border-solid border-niceBlack"
              src={`${data.imageURL}`}
              alt="Project Image"
            />
            <div className="w-full flex flex-row justify-between items-center gap-5">
              <span className="text-white-500 font-bold !text-[14px] md:!text-[16px]">
                {file.date}: {convertTimeStampToMomentMonth(data.date)}
              </span>
              {data.url && (
                <a
                  target="_blank"
                  href={`${data.url}`}
                  className="flex flex-row gap-1 justify-center items-center text-white-500  px-2 border-2 border-solid border-primary-500 transition-all duration-300 hover:bg-primary-500 hover:text-white-500 rounded-md cursor-pointer p-1">
                  <span className="!text-[14px] text-white-500">
                    {file.projects.preview}
                  </span>
                  <OpenInNewIcon className="text-white-500" fontSize="14px" />
                </a>
              )}
            </div>

            <div className="flex flex-col justify-left items-center gap-1 w-full">
              <h2 className="text-white-500 !text-[16px] md:!text-[18px] font-[500] w-full">
                {lang === "en"
                  ? data.enTitle
                  : lang === "ar"
                  ? data.arTitle
                  : data.krTitle}
              </h2>
              <h2 className="text-niceGray !text-[16px] md:!text-[18px] font-[500] w-full ">
                {lang === "en"
                  ? data.enDesc
                  : lang === "ar"
                  ? data.arDesc
                  : data.krDesc}
              </h2>
            </div>
          </div>
          <div className="w-full flex flex-row justify-left items-center gap-5 flex-wrap">
            <div className="w-full flex flex-row justify-left items-center gap-5">
              <span className="!text-[16px] md:!text-[18px] text-white-500">
                <i className="fa-solid fa-diagram-project"></i>
              </span>
              <span className="!text-[16px] md:!text-[18px] text-white-500">
                {file.projects.types}
              </span>
            </div>
            {data.types.map((val, index) => {
              return <Type val={val} key={index} />;
            })}
          </div>

          <div className="w-full flex flex-row justify-left items-center gap-5 flex-wrap">
            <div className="w-full flex flex-row justify-left items-center gap-5">
              <span className="!text-[16px] md:!text-[18px] text-white-500">
                <i className="fa-brands fa-github"></i>
              </span>
              <span className="!text-[16px] md:!text-[18px] text-white-500">
                {file.projects.gits}
              </span>
            </div>
            {data.gits.length > 0 ? (
              <>
                {data.gits.map((val, index) => {
                  return <ProjectGit val={val} key={index} />;
                })}
              </>
            ) : (
              <span className="!text-[14px] md:!text-[16px] text-primary-500">
                {file.projects.privateGit}
              </span>
            )}
          </div>
          <div className="w-full flex flex-row justify-left items-center gap-5 flex-wrap">
            <div className="w-full flex flex-row justify-left items-center gap-5">
              <span className="!text-[16px] md:!text-[18px] text-white-500">
                <i className="fa-solid fa-cubes"></i>
              </span>
              <span className="!text-[16px] md:!text-[18px] text-white-500">
                {file.projects.stacks}
              </span>
            </div>

            {data.stacks.map((val, index) => {
              return <Stack val={val} key={index} />;
            })}
          </div>
        </>
      )}
    </section>
  );
}