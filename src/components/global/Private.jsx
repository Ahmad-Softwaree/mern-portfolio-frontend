import React, { useContext } from "react";
import { UiContext } from "../../context/UiContext";
import { PRIVATE } from "../../context/types/ui_types";

export default function Private() {
  const { dispatch: uiDispatch } = useContext(UiContext);
  return (
    <div
      data-aos="fade-up"
      className="fixed z-[1000] shadow-xl border-2 border-solid border-purple rounded-lg inset-0 m-auto p-5 h-fit w-fit bg-black text-white"
    >
      <p>Sorry, this project is private</p>
      <div className="flex flex-row justify-center items-center gap-5">
        <button
          onClick={() => uiDispatch({ type: PRIVATE })}
          className="my-5 !text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-white p-2 px-4 disabled:bg-gray-500"
        >
          Understand
        </button>
      </div>
    </div>
  );
}
