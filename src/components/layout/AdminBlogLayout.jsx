import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getStorageUsage, logout } from "../../context/actions/blogAction";
export const AdminBlogLayout = ({ getStorageUsage, logout, user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    getStorageUsage();
  }, []);
  return (
    <header className="panel_header w-full position-relative flex flex-row justify-center align-center">
      <h1>Admin Panel</h1>
      <div className="admin_left_panel_blog flex position-fixed left-0 flex-col justify-left align-center w-full ">
        <div className="admin_left_panel_three flex flex-col justify-left align-start gap-1 w-full p-1">
          <img
            alt="Admin Image"
            className="admin_profile"
            src={`${user.image}`}
          />
          <button className="admin_logout" onClick={() => logout({ navigate })}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
          <Link to={`/`} className="admin_getOut">
            <i className="fa-solid fa-door-open"></i>
          </Link>
          <Link to={`/panel`} className={`admin_goBack`}>
            <i className="fa-solid fa-square-caret-left"></i>
          </Link>
        </div>
      </div>
    </header>
  );
};
