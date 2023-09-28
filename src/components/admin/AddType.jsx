import React, { useContext, useState } from "react";
import { AlertContext } from "../../context/AlertContext";
import { TypeContext } from "../../context/TypeContext";
import { addType } from "../../context/actions/typeAction";
import TextInput from "../inputs/TextInput";
import SpinnerLoading from "../global/SpinnerLoading";
import { UiContext } from "../../context/UiContext";
import { ADD_TYPE } from "../../context/types/ui_types";
export default function AddType() {
  const { dispatch: uiDispatch } = useContext(UiContext);
  const [inputs, setInputs] = useState({
    enName: "",
    arName: "",
    krName: "",
  });
  const { enName, arName, krName } = inputs;
  const onChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: TypeDispatch,
    state: { addTypeLoading },
  } = useContext(TypeContext);
  return (
    <form
      data-aos="fade-up"
      onSubmit={(e) => {
        e.preventDefault();
        addType(TypeDispatch, alertDispatch, uiDispatch, inputs);
      }}
      className="fixed inset-0 m-auto p-5 rounded-lg bg-black w-[95%] max-w-[500px] h-fit text-white flex flex-col justify-center items-center gap-[30px] z-[1100] shadow-xl"
    >
      <h1 className="font-bold w-full text-center">Add Type</h1>
      <TextInput
        value={enName}
        onChange={onChange}
        name={`enName`}
        className={`w-full`}
        title={`English Name`}
      />
      <TextInput
        value={arName}
        onChange={onChange}
        name={`arName`}
        className={`w-full`}
        title={`Arabic Name`}
      />
      <TextInput
        value={krName}
        onChange={onChange}
        name={`krName`}
        className={`w-full`}
        title={`Kurdish Name`}
      />
      <div className="w-full flex flex-row justify-center items-center gap-5">
        <button
          type="button"
          className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4 disabled:bg-gray-500"
          onClick={() =>
            uiDispatch({
              type: ADD_TYPE,
            })
          }
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={addTypeLoading}
          className="my-5 !text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-white p-2 px-4 disabled:bg-gray-500"
        >
          {addTypeLoading ? <SpinnerLoading size={`30px`} /> : "Publish"}
        </button>
      </div>
    </form>
  );
}
