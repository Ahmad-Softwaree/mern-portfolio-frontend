import React from "react";
import { Link } from "react-router-dom";

export default function ProjectType({ val }) {
  return (
    <Link
      to={`/projects/type/${val.type._id}`}
      className="p-1 px-2 border-[3px] hover:bg-lightBlack border-solid border-lightBlack transition-all duration-300 w-fit  text-white !text-[12px] md:!text-[14px] rounded-md bg-transparent  cursor-pointer"
    >
      {val.type.enName}
    </Link>
  );
}
