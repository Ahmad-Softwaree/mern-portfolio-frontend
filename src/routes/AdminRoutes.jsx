import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { loadUser, logout } from "../actions/admin";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import { ENGLISH } from "../actions/types";
export const AdminRoutes = ({ loadUser, admin: { user } }) => {
  const location = useLocation();
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
      <AdminLayout user={user} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

AdminRoutes.propTypes = {
  admin: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

const mapDispatchToProps = {
  loadUser,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoutes);
