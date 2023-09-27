import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";
import { getAuthAdmin } from "../context/actions/adminAction";
import { AdminContext } from "../context/AdminContext";
import Fallback from "../pages/Fallback";

export default function AdminRoutes({ Component }) {
  const {
    dispatch: adminDispatch,
    state: { admin, loading, token },
  } = useContext(AdminContext);

  const { dispatch: alertDispatch } = useContext(AlertContext);

  useEffect(() => {
    getAuthAdmin(adminDispatch, alertDispatch);
  }, [adminDispatch]);

  if (loading) return <Fallback />;
  if (token === null || admin === null)
    return <Navigate replace to={`/login`} />;
  if (admin && token) return <Component />;
}
