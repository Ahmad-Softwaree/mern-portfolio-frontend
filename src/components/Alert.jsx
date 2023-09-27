import React, { useContext, useEffect } from "react";
import { REMOVE_ALL_ALERTS, REMOVE_ALERT } from "../context/types/alert_types";
import { useLocation } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";

export default function Alert() {
  const {
    dispatch: alertDispatch,
    state: { alerts },
  } = useContext(AlertContext);
  const location = useLocation();

  useEffect(() => {
    alertDispatch({
      type: REMOVE_ALL_ALERTS,
    });
  }, [location]);

  return (
    <div
      className={`fixed h-fit top-0 z-[1200] p-5 w-[300px] transition-all duration-300 gap-5 flex flex-col justify-left items-center ${
        alerts.filter((val) => val.show).length > 0
          ? "right-0"
          : "right-[-400px]"
      }`}
    >
      {alerts?.map((val, index) => {
        return (
          <div
            onClick={() =>
              alertDispatch({
                type: REMOVE_ALERT,
                payload: val.id,
              })
            }
            key={index}
            className="rounded-lg bg-black text-white shadow-xl cursor-pointer flex flex-row justify-between items-center w-full h-fit p-2 gap-3 border-2 border-solid border-lightBlack"
          >
            <span
              className={`text-${
                val.type === "error" ? "purple" : "blue"
              } font-bold !text-[14px]`}
            >
              <i className="fa-solid fa-bug"></i>
            </span>
            <span
              className={`text-${
                val.type === "error" ? "purple" : "blue"
              } font-bold !text-[14px]`}
            >
              {val.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
