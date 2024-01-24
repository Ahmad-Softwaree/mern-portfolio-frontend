import React from "react";

export default function Stack({ val, to }) {
  return (
    <span
      style={{ borderColor: val.color }}
      className={`p-1 px-2 border-[3px] hover:bg-black-600 border-solid  transition-all duration-300 w-fit text-white-500 text-text2-light  md:text-text1-light  rounded-md bg-transparent  cursor-pointer font-Poppins`}>
      {val.enName}
    </span>
  );
}
