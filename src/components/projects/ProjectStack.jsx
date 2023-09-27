import React from "react";
import { Link } from "react-router-dom";

export default function ProjectStack({ val }) {
  return (
    <Link
      to={`/projects/stack/${val.stack._id}`}
      style={{ borderColor: val.stack.color }}
      className={`p-1 px-2 border-[3px] hover:bg-lightBlack border-solid  transition-all duration-300 w-fit text-white !text-[14px] rounded-md bg-transparent  cursor-pointer`}
    >
      {val.stack.name}
    </Link>
  );
}
