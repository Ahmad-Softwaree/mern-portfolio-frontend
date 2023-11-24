import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import OpenInNew from "@mui/icons-material/OpenInNew";

export default function WorkCard({ val, index }) {
  const {
    state: { file, language },
  } = useContext(LanguageContext);
  return (
    <div
      id={`workCardId-${index}`}
      className="flex flex-col justify-between gap-5 items-start  bg-niceBlack p-5 transition-all w-[300px] h-[280px] duration-300 cursor-pointer rounded-md text-white hover:scale-[1.1] hover:border-purple border-2 border-solid border-niceBlack"
    >
      <div className="w-full flex flex-col justify-left items-start gap-5">
        <img
          src={`${val.imageURL}`}
          alt="workCardImage"
          className="w-[60px] h-[60px] rounded-full border-2 border-solid border-purple object-contain"
        />
        <p className="!text-[16px]">
          {file.work.title}: &nbsp;
          {language === "en"
            ? val.enTitle
            : language === "ar"
            ? val.arTitle
            : val.krTitle}
        </p>
        <p className="!text-[16px]">
          {file.work.company}: &nbsp;{val.company}
        </p>
      </div>
      {val.link && (
        <a
          href={`${val.link}`}
          target="_blank"
          className="link flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1"
        >
          <span className="!text-[14px] text-white">visit</span>
          <OpenInNew className="text-white" fontSize="14px" />
        </a>
      )}
    </div>
  );
}
