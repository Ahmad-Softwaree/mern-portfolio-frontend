import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { loadUser, logout } from "../actions/admin";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ENGLISH } from "../actions/types";
export const AdminRoutes = ({ logout, loadUser, admin: { user } }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
    }, [3000]);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    loadUser();
    dispatch({
      type: ENGLISH,
    });
  }, [location]);

  //there must be user and not verified yet
  return loading ? (
    <div className="panelLoading flex flex-row justify-center items-center">
      <Spinner minWidth={`100px`} minHeight={`100px`} size={`xl`} />
    </div>
  ) : Object.keys(user)?.length !== 0 && !loading ? (
    <>
      <header className="panel_header w-100 position-relative flex flex-column justify-left align-center p-2">
        <div className="flex flex-row justify-center align-center w-100 gap-2">
          <button className="admin_logout" onClick={() => logout({ navigate })}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
          <Link to={`/`} className="admin_getOut">
            <i className="fa-solid fa-door-open"></i>
          </Link>
          <Link to={`/panel`} className="admin_add">
            <i className="fa-solid fa-database"></i>
          </Link>
          <Link to={`admins`} className="admins">
            <i className="fa-solid fa-users"></i>
          </Link>
        </div>
        <div className="flex flex-row justify-center align-center gap-1 position-absolute admin_profile">
          <img src={`${user.image}`} />
          <span>{user.name}</span>
        </div>
        <h1>Admin Panel</h1>
      </header>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

AdminRoutes.propTypes = {
  admin: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

const mapDispatchToProps = {
  loadUser,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoutes);
