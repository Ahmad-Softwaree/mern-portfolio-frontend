import React from "react";
import { useNavigate } from "react-router-dom";

export default function ReturnLink() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className="bg-primary-500 p-2 px-4 flex flex-row justify-center items-center gap-4 rounded-lg cursor-pointer text-white-500 w-fit">
      <img src="/images/leftArrow.svg" alt="leftArrow" />
      <span>گەڕانەوە</span>
    </div>
  );
}
