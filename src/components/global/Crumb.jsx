import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Crumb() {
  const location = useLocation();
  const [path, setPath] = useState([]);
  //this useEffect for making the path
  useEffect(() => {
    let currentLink = "";
    let crumbs = location.pathname
      .split("/")
      .filter((crumb) => crumb !== "")
      .map((crumb, index) => {
        currentLink += `/${crumb}`;
        return (
          <NavLink
            className={`text-[16px] font-[500] text-white  bg-black px-2 p-1`}
            to={currentLink}
            key={index}
          >
            {crumb} {`>`}
          </NavLink>
        );
      });
    setPath(crumbs);
  }, [location]);
  return (
    <div className="flex flex-row gap-3 justify-start items-center w-full">
      {path}
    </div>
  );
}
