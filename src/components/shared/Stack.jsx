import React from "react";
import { Link } from "react-router-dom";

export default function Stack({ val, to, index }) {
  return (
    <Link
      to={to}
      style={{
        transform: `translateX(-${5 * index * 2}px)`,
        zIndex: `${5 * index + 1}`,
      }}
      className={`p-1 lg:w-10 lg:h-10 w-8 h-8  flex justify-center items-center border-[3px] border-black-400 rounded-full  border-solid  transition-all duration-300 text-center bg-black-500  cursor-pointer`}
    >
      <img
        src={val.imageURL}
        alt={val.imageName}
        className="w-full h-full rounded-full object-contain"
      />
    </Link>
  );
}
