import React from "react";

export default function ProjectGit({ val }) {
  return (
    <a
      href={val.git}
      target="_blank"
      className="p-1 px-2 border-[3px] hover:bg-black-600 border-solid border-gray-600 transition-all duration-300 w-fit text-white-500  text-caption1-light  md:text-text1-light rounded-md bg-transparent  cursor-pointer font-Poppins"
    >
      {val.name}
    </a>
  );
}
