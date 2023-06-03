import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getStorageUsage, logout } from "../../actions/admin";
export const AdminLayout = ({ getStorageUsage, logout, user, admin: { storageSize, storageSizeLoading } }) => {
  const navigate = useNavigate();
  useEffect(() => {
    getStorageUsage();
  }, []);
  return (
    <header className="panel_header w-100 position-relative flex flex-row justify-center align-center">
      <h1>Admin Panel</h1>
      <div className="admin_left_panel flex position-fixed left-0 flex-column justify-left align-center w-100 ">
        <div className="admin_left_panel_three flex flex-row justify-center align-center gap-1 w-100 p-1">
          <button className="admin_logout" onClick={() => logout({ navigate })}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
          <NavLink to={`/`} className="admin_getOut">
            <i className="fa-solid fa-door-open"></i>
          </NavLink>
          <img alt="Admin Image" className="admin_profile" src={`${user.image}`} />
        </div>

        <NavLink to={`/panel`} className="admin_add">
          <i className="fa-solid fa-database"></i>
          <span>Database</span>
        </NavLink>
        <NavLink to={`/admins`} className="admins">
          <i className="fa-solid fa-users"></i>
          <span>Admins</span>
        </NavLink>
        <div className="storage flex flex-row justify-left align-center gap-1 flex-wrap">
          <i className="fa-solid fa-fire"></i>
          <div className="storageOuter">
            <div style={{ width: `${storageSize * 10}px` }} className="storageInner"></div>
          </div>
          <span>firebase storage {storageSize} MB / 5GB</span>
        </div>
      </div>
    </header>
  );
};

AdminLayout.propTypes = {};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

const mapDispatchToProps = {
  getStorageUsage,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
