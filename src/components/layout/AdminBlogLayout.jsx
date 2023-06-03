import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getStorageUsage, logout } from "../../actions/admin";
export const AdminBlogLayout = ({ getStorageUsage, logout, user, admin: { storageSize, storageSizeLoading } }) => {
  const navigate = useNavigate();
  useEffect(() => {
    getStorageUsage();
  }, []);
  return (
    <header className="panel_header w-100 position-relative flex flex-row justify-center align-center">
      <h1>Admin Panel</h1>
      <div className="admin_left_panel_blog flex position-fixed left-0 flex-column justify-left align-center w-100 ">
        <div className="admin_left_panel_three flex flex-column justify-left align-start gap-1 w-100 p-1">
          <img alt="Admin Image" className="admin_profile" src={`${user.image}`} />
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

AdminBlogLayout.propTypes = {};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

const mapDispatchToProps = {
  getStorageUsage,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBlogLayout);
