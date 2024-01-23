import { AlertContext } from "@/context/AlertContext";
import React, { useContext } from "react";
import { CONTEXT_TYPEs } from "@/context";

export default function Alert() {
  const {
    dispatch,
    state: { alerts },
  } = useContext(AlertContext);

  return (
    <div
      className={`overflow-y-scroll alert  fixed  top-0 h-fit z-[2500]  flex flex-col justify-left items-start m-5 gap-3 rounded-lg  overflow-hidden w-[300px] bg-none  transition-all  duration-500  ${
        alerts.filter((val) => val.show).length > 0
          ? "right-0"
          : "right-[-400px]"
      }`}>
      {alerts.map((alert, index) => {
        return (
          <div
            key={index}
            onClick={() =>
              dispatch({ type: CONTEXT_TYPEs.DELETE_ALERT, payload: alert.id })
            }
            data-aos="fade-right"
            className={`flex flex-row justify-between p-2  items-center w-full   cursor-pointer my-2  transition-all duration-600 rounded-lg  relative bg-black-500`}>
            {alert.type === "success" ? (
              <span className="text-primary-500 p-2">
                <i className="fa-solid fa-circle-check"></i>
              </span>
            ) : (
              <span className="text-primary-500 p-2">
                <i className="fa-solid fa-circle-exclamation"></i>
              </span>
            )}

            <span
              className={`break-words whitespace-normal w-full text-right ${
                alert.type === "success" ? "text-green" : "text-primary-500"
              }`}>
              {alert.text}
            </span>
            <span className={`p-2 rounded-full px-4  cursor-pointer`}>
              <i className="fa-solid fa-x"></i>
            </span>
          </div>
        );
      })}
    </div>
  );
}
