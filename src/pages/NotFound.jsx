import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="w-full min-h-screen text-white-500 bg-black-500 relative flex flex-col justify-center items-center">
      <div className="flex flex-col justify-left items-center gap-10 max-w-[600px] text-white-500-500 text-center w-[90%]">
        <h1 className="text-[150px] font-bold">404</h1>
        <p className="text-body2-bold">
          We are very sorry for inconvenience. It looks you’re trying to access
          a page that either has been deleted or never been existed
        </p>
        <Link
          to="/"
          className="bg-white-500 text-primary-500 p-2 px-4 rounded-md ">
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
