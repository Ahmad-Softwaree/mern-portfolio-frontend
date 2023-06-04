import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { loadUser, logout } from "../actions/admin";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import { ENGLISH } from "../actions/types";
import Fallback from "../components/Fallback";
import AdminBlogLayout from "../components/layout/AdminBlogLayout";
export const AdminRoutes = ({ layout, loadUser, admin: { user, loading } }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser();
    dispatch({
      type: ENGLISH,
    });
  }, [location]);

  //there must be user and not verified yet
  return loading ? (
    <div className="panelLoading flex flex-row justify-center items-center">
      <Fallback />
    </div>
  ) : user && Object.keys(user)?.length !== 0 && !loading ? (
    <>
      {layout && <AdminLayout user={user} />}
      {!layout && <AdminBlogLayout user={user} />}
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
