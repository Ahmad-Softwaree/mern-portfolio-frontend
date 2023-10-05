import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";

export default function ReturnHome() {
  const {
    state: { file },
  } = useContext(LanguageContext);
  return (
    <Link
      to={`/`}
      className="w-fit p-2 px-5 flex flex-row justify-left items-center gap-2 rounded-md border-2 border-solid border-purple bg-black transition-all duration-300 text-purple hover:text-white hover:bg-purple"
    >
      <span className="!text-[16px] font-bold">
        <i className="fa-solid fa-house"></i>{" "}
      </span>
      <span className="!text-[16px] font-bold">{file.nav.home}</span>
    </Link>
  );
}
