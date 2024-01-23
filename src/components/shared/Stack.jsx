import React from "react";
import { Link } from "react-router-dom";

export default function Stack({ val }) {
  return (
    <Link
      to={`/projects/stack/${val._id}`}
      style={{ borderColor: val.color }}
      className={`p-1 px-2 border-[3px] hover:bg-black-600 border-solid  transition-all duration-300 w-fit text-white-500 text-text2-light  md:text-text1-light  rounded-md bg-transparent  cursor-pointer font-Poppins`}>
      {val.enName}
    </Link>
  );
}
