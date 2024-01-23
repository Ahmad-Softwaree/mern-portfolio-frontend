import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";

export default function Type({ val }) {
  const {
    state: { lang },
  } = useContext(LanguageContext);
  return (
    <Link
      to={`/projects/type/${val._id}`}
      className="p-1 px-2 border-[3px] hover:bg-black-600 border-solid border-black-600 transition-all duration-300 w-fit  text-white-500 !text-[12px] md:!text-[14px] rounded-md bg-transparent  cursor-pointer ">
      {lang === "en" ? val.enName : lang === "ar" ? val.arName : val.krName}
    </Link>
  );
}
