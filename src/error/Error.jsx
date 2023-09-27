import React, { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-screen py-[100px] flex flex-col justify-center items-center gap-10 bg-black">
      <h1 className="font-bold !text-[50px] text-white text-center">
        {error.message}
      </h1>
      <div className="flex flex-row justify-center items-center gap-5">
        <button
          className="p-2 px-6 rounded-lg cursor-pointer text-white bg-transparent border-2 border-purple border-solid transition-all duration-300 hover:bg-purple hover:text-white"
          onClick={() => navigate(-1)}
        >
          GO BACK
        </button>
        <Link
          className="p-2 px-6 rounded-lg cursor-pointer text-white bg-transparent border-2 border-purple border-solid transition-all duration-300 hover:bg-purple hover:text-white"
          to="/"
        >
          HOME PAGE
        </Link>
      </div>
    </section>
  );
};

export default Error;
