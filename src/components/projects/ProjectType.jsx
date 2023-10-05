import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";

export default function ProjectType({ val }) {
  const {
    state: { language },
  } = useContext(LanguageContext);
  return (
    <Link
      to={`/projects/type/${val.type._id}`}
      className="p-1 px-2 border-[3px] hover:bg-lightBlack border-solid border-lightBlack transition-all duration-300 w-fit  text-white !text-[12px] md:!text-[14px] rounded-md bg-transparent  cursor-pointer "
    >
      {language === "en"
        ? val.type.enName
        : language === "ar"
        ? val.type.arName
        : val.type.krName}
    </Link>
  );
}
