import React from "react";

export default function ProjectGit({ val }) {
  return (
    <a
      href={val.git}
      target="_blank"
      className="p-1 px-2 border-[3px] hover:bg-black-600 border-solid border-black-600 transition-all duration-300 w-fit text-white-500 !text-[14px] rounded-md bg-transparent  cursor-pointer font-Poppins">
      {val.name}
    </a>
  );
}
