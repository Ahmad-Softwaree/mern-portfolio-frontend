import React, { useContext, useState } from "react";
import { AlertContext } from "../../context/AlertContext";
import { StackContext } from "../../context/StackContext";
import TextInput from "../inputs/TextInput";
import { UiContext } from "../../context/UiContext";
import { ADD_STACK, UPDATE_STACK } from "../../context/types/ui_types";
import SpinnerLoading from "../global/SpinnerLoading";
import { addStack, updateStack } from "../../context/actions/stackAction";
export default function UpdateStack() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: stackDispatch,
    state: { updateStackLoading },
  } = useContext(StackContext);

  const {
    dispatch: uiDispatch,
    state: { val },
  } = useContext(UiContext);
  const [inputs, setInputs] = useState({
    name: val.name,
    color: val.color,
  });
  const { name, color } = inputs;
  const onChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form
      data-aos="fade-up"
      onSubmit={(e) => {
        e.preventDefault();
        updateStack(
          stackDispatch,
          alertDispatch,
          uiDispatch,
          inputs,
          val._id,
          setInputs
        );
      }}
      className="fixed inset-0 m-auto p-5 rounded-lg bg-black w-[95%] max-w-[500px] h-fit text-white flex flex-col justify-left items-center gap-[30px] z-[1100] shadow-xl overflow-y-auto max-h-[600px]"
    >
      <h1 className="font-bold w-full text-center">Add Stack</h1>

      <TextInput
        value={name}
        onChange={onChange}
        name={`name`}
        className={`w-full`}
        title={`Name`}
      />
      <TextInput
        value={color}
        onChange={onChange}
        name={`color`}
        className={`w-full`}
        title={`Color`}
      />

      <div className="w-full flex flex-row justify-center items-center gap-5">
        <button
          type="button"
          className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4 disabled:bg-gray-500"
          onClick={() =>
            uiDispatch({
              type: UPDATE_STACK,
            })
          }
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={updateStackLoading}
          className="my-5 !text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-white p-2 px-4 disabled:bg-gray-500"
        >
          {updateStackLoading ? <SpinnerLoading size={`30px`} /> : "Publish"}
        </button>
      </div>
    </form>
  );
}
