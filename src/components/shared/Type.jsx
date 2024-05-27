import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";

export default function Type({ val, to }) {
  const {
    state: { lang },
  } = useContext(LanguageContext);
  return (
    <span className="p-1 px-2 border-[3px] hover:bg-black-600 border-solid border-gray-600 transition-all duration-300 w-fit  text-white-500  text-caption1-light  md:text-text1-light  rounded-md bg-transparent  cursor-pointer ">
      {lang === "en" ? val.enName : lang === "ar" ? val.arName : val.krName}
    </span>
  );
}
