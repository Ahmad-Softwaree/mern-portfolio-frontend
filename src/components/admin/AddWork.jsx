import React, { useContext, useEffect, useState } from "react";
import { addWork } from "../../context/actions/workAction";
import { AlertContext } from "../../context/AlertContext";
import { WorkContext } from "../../context/WorkContext";
import { ImageContext } from "../../context/ImageContext";
import TextInput from "../inputs/TextInput";
import { UiContext } from "../../context/UiContext";
import { ADD_WORK } from "../../context/types/ui_types";
import SpinnerLoading from "../global/SpinnerLoading";
import { WORK_IMAGE } from "../../context/types/image_types";
import FileInput from "../inputs/FileInput";
import FullDateInput from "../inputs/FullDateInput";
import { Checkbox } from "@chakra-ui/react";
export default function AddWork() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: workDispatch,
    state: { addWorkLoading },
  } = useContext(WorkContext);

  const {
    dispatch: imageDispatch,
    state: { workImage, uploadWorkImageLoading },
  } = useContext(ImageContext);
  const { dispatch: uiDispatch } = useContext(UiContext);
  const [inputs, setInputs] = useState({
    enTitle: "",
    arTitle: "",
    krTitle: "",
    company: "",
    link: "",
    from: "",
    to: "",
  });
  const [cont, setCont] = useState(false);
  const { enTitle, arTitle, krTitle, link, company, from, to } = inputs;
  const onChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form
      data-aos="fade-up"
      onSubmit={(e) => {
        e.preventDefault();
        addWork(
          workDispatch,
          alertDispatch,
          imageDispatch,
          uiDispatch,
          { ...inputs, continue: cont },
          workImage,
          setInputs,
          setCont
        );
      }}
      className="fixed inset-0 m-auto p-5 rounded-lg bg-black w-[95%] max-w-[500px] h-fit text-white flex flex-col justify-left items-center gap-[30px] z-[1100] shadow-xl overflow-y-auto max-h-[600px]"
    >
      <h1 className="font-bold w-full text-center">Add Work</h1>

      <div className="flex flex-col justify-left items-center gap-5 w-full">
        {!workImage ? (
          <FileInput
            title={`Work Image`}
            value={""}
            onChange={(e) => {
              imageDispatch({
                type: WORK_IMAGE,
                payload: e.target.files[0],
              });
            }}
            id={`workImage`}
            className={`w-full`}
          />
        ) : (
          <div className="relative w-full h-full flex flex-col justify-left items-center gap-5">
            <img
              className="w-full h-[200px] object-contain rounded-md"
              src={URL.createObjectURL(workImage)}
              alt="imageUpload"
            />

            <button
              onClick={() => {
                imageDispatch({ type: WORK_IMAGE, payload: "" });
              }}
              className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4"
            >
              Remove Work Image
            </button>
          </div>
        )}
      </div>
      <TextInput
        value={enTitle}
        onChange={onChange}
        name={`enTitle`}
        className={`w-full`}
        title={`English Title`}
      />
      <TextInput
        value={arTitle}
        onChange={onChange}
        name={`arTitle`}
        className={`w-full`}
        title={`Arabic Title`}
      />
      <TextInput
        value={krTitle}
        onChange={onChange}
        name={`krTitle`}
        className={`w-full`}
        title={`Kurdish Title`}
      />
      <TextInput
        value={company}
        onChange={onChange}
        name={`company`}
        className={`w-full`}
        title={`Company`}
      />
      <TextInput
        value={link}
        onChange={onChange}
        name={`link`}
        className={`w-full`}
        title={`Link`}
      />
      <FullDateInput
        className={`w-full`}
        onChange={(date) => {
          setInputs((prev) => ({ ...prev, from: date }));
        }}
      />

      <FullDateInput
        className={`w-full`}
        onChange={(date) => {
          setInputs((prev) => ({ ...prev, to: date }));
        }}
      />
      <Checkbox
        onChange={(e) => {
          setCont(e.target.checked);
        }}
        isChecked={cont}
        className="!text-[12px] md:!text-[12px] w-full"
      >
        Continue
      </Checkbox>
      <div className="w-full flex flex-row justify-center items-center gap-5">
        <button
          type="button"
          className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4 disabled:bg-gray-500"
          onClick={() => {
            uiDispatch({
              type: ADD_WORK,
            });
            imageDispatch({
              type: WORK_IMAGE,
              payload: "",
            });
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={addWorkLoading || uploadWorkImageLoading}
          className="my-5 !text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-white p-2 px-4 disabled:bg-gray-500"
        >
          {addWorkLoading || uploadWorkImageLoading ? (
            <SpinnerLoading size={`30px`} />
          ) : (
            "Publish"
          )}
        </button>
      </div>
    </form>
  );
}
