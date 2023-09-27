import React, { Fragment, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminLogout } from "../../context/actions/adminAction";
import { AlertContext } from "../../context/AlertContext";
import { AdminContext } from "../../context/AdminContext";
import SpinnerLoading from "../global/SpinnerLoading";
export default function AdminLayout() {
  const navigate = useNavigate();
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: adminDispatch,
    state: { logoutLoading, admin },
  } = useContext(AdminContext);

  return (
    <Fragment>
      <aside className="fixed w-fit bg-black z-[900] left-0 top-0 bottom-0 h-full p-5 text-white flex flex-col justify-between items-center gap-[30px] shadow-xl">
        <img
          alt="Admin Image"
          className="w-[40px] h-[40px] rounded-full object-cover border-2 border-solid border-purple"
          src={`${admin?.imageURL}`}
        />
        <div className="flex flex-col justify-center items-center gap-5">
          <NavLink
            to={`/`}
            className="admin_link p-2 transition-all duration-300 border-2 border-solid border-green hover:bg-green rounded-full text-white !text-[16px] px-3"
          >
            <i className="fa-solid fa-door-open"></i>
          </NavLink>

          <NavLink
            to={`/panel`}
            className="admin_link p-2 transition-all duration-300 border-2 border-solid border-green hover:bg-green rounded-full text-white !text-[16px] px-3"
          >
            <i className="fa-solid fa-database"></i>
          </NavLink>
          <NavLink
            to={`/admins`}
            className="admin_link p-2 transition-all duration-300 border-2 border-solid border-green hover:bg-green rounded-full text-white !text-[16px] px-3"
          >
            <i className="fa-solid fa-user-secret"></i>
          </NavLink>
        </div>
        <button
          disabled={logoutLoading}
          className="p-2 transition-all duration-300 border-2 border-solid border-purple hover:bg-purple cursor-pointer rounded-full text-white !text-[16px] px-3"
          onClick={() => adminLogout(adminDispatch, alertDispatch, navigate)}
        >
          {logoutLoading ? (
            <SpinnerLoading size={`30px`} />
          ) : (
            <i className="fa-solid fa-right-from-bracket"></i>
          )}
        </button>
      </aside>
      <Outlet />
    </Fragment>
  );
}
