import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";
import { AdminContext } from "../context/AdminContext";
import { getAuthAdmin } from "../context/actions/adminAction";
import Fallback from "../pages/Fallback";

export default function AdminPublicRoute({ Component }) {
  const {
    dispatch: adminDispatch,
    state: { admin, loading, token },
  } = useContext(AdminContext);

  const { dispatch: alertDispatch } = useContext(AlertContext);

  useEffect(() => {
    getAuthAdmin(adminDispatch, alertDispatch);
  }, [adminDispatch]);

  if (loading) return <Fallback />;
  if (token || admin) return <Navigate replace to={`/panel`} />;
  if (admin === null && token === null) return <Component />;
}
