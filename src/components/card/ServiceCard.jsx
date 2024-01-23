import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

export default function ServiceCard({ icon, header, body }) {
  const {
    state: { lang },
  } = useContext(LanguageContext);
  return (
    <div className="col-span-full md:col-span-3 lg:col-span-4 rounded-lg cursor-pointer shadow-xl bg-black-500 transition-all duration-300 md:hover:scale-[1.1] p-5  md:hover:border-primary-500 border-2 border-solid border-black-600">
      <div className="w-full flex flex-row justify-left items-center gap-2 ">
        <span className="font-bold !text-[16px] rounded-full p-2">
          <i className={`fa-solid fa-${icon}`}></i>
        </span>
        <span className="font-[500] !text-[16px] text-niceGray">{header}</span>
      </div>

      <h2
        className={`!text-[16px] font-[400] ${
          lang === "en" ? "text-left" : "text-right"
        }`}>
        {body}
      </h2>
    </div>
  );
}
