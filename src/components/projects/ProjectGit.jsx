import React from "react";

export default function ProjectGit({ val }) {
  return (
    <a
      href={val.git}
      target="_blank"
      className="p-1 px-2 border-[3px] hover:bg-lightBlack border-solid border-lightBlack transition-all duration-300 w-fit text-white !text-[14px] rounded-md bg-transparent  cursor-pointer font-Poppins"
    >
      {val.name}
    </a>
  );
}
