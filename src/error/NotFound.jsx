import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full min-h-screen py-[100px] flex flex-col justify-center items-center gap-10 bg-black">
      <h1 className="font-bold !text-[100px] text-white text-center">404</h1>
      <h3 className="font-[500] !text-[30px] text-white text-center">
        Page Not Found!
      </h3>
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

export default NotFound;
