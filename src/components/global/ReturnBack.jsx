import React from "react";
import { useNavigate } from "react-router-dom";

export default function ReturnBack() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="w-fit p-2 px-5 flex flex-row justify-left items-center gap-2 rounded-md border-2 border-solid border-purple bg-black transition-all duration-300 text-purple hover:text-white hover:bg-purple"
    >
      <span className="!text-[16px] font-bold">
        <i className="fa-solid fa-circle-arrow-left"></i>
      </span>
      <span className="!text-[16px] font-bold">back</span>
    </button>
  );
}
