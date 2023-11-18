import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DateMoment from "../global/DateMoment";
import { LanguageContext } from "../../context/LanguageContext";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

export default function CertificateCard({ val, index }) {
  const {
    state: { file, language },
  } = useContext(LanguageContext);

  return (
    <div
      id={`certificateCardId-${index}`}
      data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
      className={`relative w-full flex justify-between items-center gap-5 ${
        index % 2 === 0 ? "flex-row self-end" : "flex-row-reverse self-start"
      }`}
    >
      <div
        className={`relative bg-black flex flex-col justify-center items-end gap-5 md:gap-10 flex-wrap w-[350px] md:w-[550px] h-[380px] md:h-[400px] shadow-xl p-5 rounded-lg  ${
          language !== "en" && "items-start"
        }`}
      >
        <div className="flex flex-col justify-left items-start gap-5 w-full">
          <span className="text-white !text-[14px] md:!text-[16px]">
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
                ? val.enDesc
                : language === "ar"
                ? val.arDesc
                : val.krDesc}
            </h2>
          </div>
        </div>

        <div className="w-full flex flex-row justify-between items-center gap-5">
          {val.url && (
            <a
              href={`${val.url}`}
              target="_blank"
              className="link flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1"
            >
              <span className="!text-[14px] text-white">
                {file.certificates.link}
              </span>
              <OpenInNewIcon className="text-white" fontSize="14px" />
            </a>
          )}
          <Link
            to={`/certificates/${val._id}`}
            className="more flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1"
          >
            <span className="!text-[14px] text-white">
              {file.projects.more}
            </span>
            <ReadMoreIcon className="text-white" fontSize="14px" />
          </Link>
        </div>
      </div>

      <img
        src={val.imageURL}
        alt="certificateImage"
        className="image hidden lg:flex w-[800px] h-[400px] object-contain origin-center"
      />
    </div>
  );
}
