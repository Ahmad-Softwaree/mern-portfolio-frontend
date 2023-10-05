import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

export default function ServiceCard({ icon, header, body }) {
  const {
    state: { language },
  } = useContext(LanguageContext);
  return (
    <div className="w-[300px] rounded-lg cursor-pointer shadow-xl bg-niceBlack transition-all h-[200px] duration-300 hover:scale-[1.1] p-5 hover:border-purple border-2 border-solid border-niceBlack">
      <div className="w-full flex flex-row justify-left items-center gap-2 ">
        <span className="font-bold !text-[16px] rounded-full p-2">
          <i className={`fa-solid fa-${icon}`}></i>
        </span>
        <span className="font-[500] !text-[16px] text-niceGray">{header}</span>
      </div>

      <h2
        className={`!text-[16px] font-[400] ${
          language === "en" ? "text-left" : "text-right"
        }`}
      >
        {body}
      </h2>
    </div>
  );
}
