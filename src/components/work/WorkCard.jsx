import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import OpenInNew from "@mui/icons-material/OpenInNew";

export default function WorkCard({ val }) {
  const {
    state: { file, language },
  } = useContext(LanguageContext);
  return (
    <div className="flex flex-col justify-left items-start gap-5 bg-niceBlack p-5 transition-all w-[300px] h-[250px] duration-300 cursor-pointer rounded-md text-white hover:scale-[1.1] hover:border-purple border-2 border-solid border-niceBlack">
      <img
        src={`${val.imageURL}`}
        alt="workCardImage"
        className="w-[60px] h-[60px] rounded-full border-2 border-solid border-purple"
      />
      <p className="!text-[16px]">
        Title: &nbsp;
        {language === "en"
          ? val.enTitle
          : language === "ar"
          ? val.arTitle
          : val.krTitle}
      </p>
      <p className="!text-[16px]">Company: &nbsp;{val.company}</p>
      {val.link && (
        <a
          href={`${val.link}`}
          target="_blank"
          className="flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1"
        >
          <span className="!text-[14px] text-white">visit</span>
          <OpenInNew className="text-white" fontSize="14px" />
        </a>
      )}
    </div>
  );
}
