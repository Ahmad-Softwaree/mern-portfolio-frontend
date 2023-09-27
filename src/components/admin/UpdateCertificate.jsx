import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllStacks } from "../../context/actions/stackAction";
import {
  addCertificate,
  updateCertificate,
} from "../../context/actions/certificateAction";
import { AlertContext } from "../../context/AlertContext";
import { CertificateContext } from "../../context/CertificateContext";
import { ImageContext } from "../../context/ImageContext";
import TextInput from "../inputs/TextInput";
import { StackContext } from "../../context/StackContext";
import { UiContext } from "../../context/UiContext";
import { UPDATE_CERTIFICATE } from "../../context/types/ui_types";
import SpinnerLoading from "../global/SpinnerLoading";
import { CERTIFICATE_IMAGE } from "../../context/types/image_types";
import FileInput from "../inputs/FileInput";
import { setAlert } from "../../context/actions/alertAction";
import Git from "./Git";
import { TypeContext } from "../../context/TypeContext";
import { getAllTypes } from "../../context/actions/typeAction";
import CustomTextArea from "../inputs/CustomTextArea";
import FullDateInput from "../inputs/FullDateInput";
export default function UpdateCertificate() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: certificateDispatch,
    state: { updateCertificateLoading },
  } = useContext(CertificateContext);
  const {
    dispatch: stackDispatch,
    state: { stacks, getStacksLoading },
  } = useContext(StackContext);
  const {
    dispatch: typeDispatch,
    state: { types, getTypesLoading },
  } = useContext(TypeContext);
  const {
    dispatch: imageDispatch,
    state: { certificateImage, uploadCertificateImageLoading },
  } = useContext(ImageContext);
  const {
    dispatch: uiDispatch,
    state: { val },
  } = useContext(UiContext);
  const [selectedStacks, setSelectedStacks] = useState(
    val.stacks?.map((val) => ({
      stack: val.stack?._id,
    }))
  );
  const [selectedTypes, setSelectedTypes] = useState(
    val.types?.map((val) => ({
      type: val.type?._id,
    }))
  );

  const [imageChanged, setImageChanged] = useState(false);

  const [inputs, setInputs] = useState({
    enTitle: val.enTitle,
    arTitle: val.arTitle,
    krTitle: val.krTitle,
    enDesc: val.enDesc,
    arDesc: val.arDesc,
    krDesc: val.krDesc,
    url: val.url,
    date: val.date,
  });
  const { enTitle, arTitle, krTitle, enDesc, arDesc, krDesc, url, date } =
    inputs;
  const onChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  useEffect(() => {
    getAllStacks(stackDispatch, alertDispatch);
  }, [stackDispatch]);

  useEffect(() => {
    getAllTypes(typeDispatch, alertDispatch);
  }, [typeDispatch]);

  return (
    <form
      data-aos="fade-up"
      onSubmit={(e) => {
        e.preventDefault();
        updateCertificate(
          certificateDispatch,
          alertDispatch,
          imageDispatch,
          uiDispatch,
          { ...inputs, stacks: selectedStacks, types: selectedTypes },
          val._id,
          setInputs,
          certificateImage,
          val.imageURL,
          val.imageName,
          imageChanged,
          setSelectedStacks,
          setSelectedTypes
        );
      }}
      className="fixed inset-0 m-auto p-5 rounded-lg bg-black w-[95%] max-w-[500px] h-fit text-white flex flex-col justify-left items-center gap-[30px] z-[1100] shadow-xl overflow-y-auto max-h-[600px]"
    >
      <h1 className="font-bold w-full text-center">Update Certificate</h1>
      {val.imageURL && !imageChanged && (
        <div className="relative w-full h-full flex flex-col justify-left items-center gap-5">
          <img
            className="w-full h-[200px] object-contain rounded-md"
            src={val.imageURL}
            alt="imageUpload"
          />

          <button
            type="button"
            onClick={() => {
              setImageChanged(true);
            }}
            className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4"
          >
            Remove Old Certificate Image
          </button>
        </div>
      )}

      <div className="flex flex-col justify-left items-center gap-5 w-full">
        {!certificateImage && imageChanged ? (
          <FileInput
            title={`Certificate Image`}
            value={""}
            onChange={(e) => {
              imageDispatch({
                type: CERTIFICATE_IMAGE,
                payload: e.target.files[0],
              });
              setImageChanged(true);
            }}
            id={`certificateImage`}
            className={`w-full`}
          />
        ) : certificateImage ? (
          <div className="relative w-full h-full flex flex-col justify-left items-center gap-5">
            <img
              className="w-full h-[200px] object-contain rounded-md"
              src={URL.createObjectURL(certificateImage)}
              alt="imageUpload"
            />

            <button
              type="button"
              onClick={() => {
                imageDispatch({ type: CERTIFICATE_IMAGE, payload: "" });
                setImageChanged(false);
              }}
              className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4"
            >
              Remove Certificate Image
            </button>
          </div>
        ) : null}
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
      <CustomTextArea
        className={`w-full`}
        title={`English Description`}
        onChange={onChange}
        name="enDesc"
        value={enDesc}
      />

      <CustomTextArea
        className={`w-full`}
        title={`Arabic Description`}
        onChange={onChange}
        name="arDesc"
        value={arDesc}
      />

      <CustomTextArea
        className={`w-full`}
        title={`Kurdish Description`}
        onChange={onChange}
        name="krDesc"
        value={krDesc}
      />
      <TextInput
        value={url}
        onChange={onChange}
        name={`url`}
        className={`w-full`}
        title={`Certificate URL`}
      />

      <FullDateInput
        className={`w-full`}
        value={val.date}
        onChange={(date) => {
          setInputs((prev) => ({ ...prev, date: date }));
        }}
      />

      <h1 className="font-bold w-full text-left !text-[20px]">Select Stacks</h1>

      <div className="flex flex-row justify-left items-center gap-5 w-full flex-wrap">
        {stacks?.map((val, index) => {
          const isStackIncluded = selectedStacks.some(
            (item) => item.stack === val._id
          );
          return (
            <div
              key={index}
              onClick={() => {
                if (isStackIncluded) {
                  setSelectedStacks((prev) =>
                    prev.filter((one) => one.stack !== val._id)
                  );
                } else {
                  setSelectedStacks((prev) => [...prev, { stack: val._id }]);
                }
              }}
              className={`!text-[14px] p-2 rounded-md border-2 border-solid border-blue transition-all duration-300  hover:bg-blue hover:text-black cursor-pointer ${
                isStackIncluded ? "bg-blue text-black" : "text-blue"
              }`}
            >
              {val.name}
            </div>
          );
        })}
      </div>
      <h1 className="font-bold w-full text-left !text-[20px]">Select Types</h1>

      <div className="flex flex-row justify-left items-center gap-5 w-full flex-wrap">
        {types?.map((val, index) => {
          const isTypeInclude = selectedTypes.some(
            (item) => item.type === val._id
          );
          return (
            <div
              key={index}
              onClick={() => {
                if (isTypeInclude) {
                  setSelectedTypes((prev) =>
                    prev.filter((one) => one.type !== val._id)
                  );
                } else {
                  setSelectedTypes((prev) => [...prev, { type: val._id }]);
                }
              }}
              className={`!text-[14px] p-2 rounded-md border-2 border-solid border-blue transition-all duration-300  hover:bg-blue hover:text-black cursor-pointer ${
                isTypeInclude ? "bg-blue text-black" : "text-blue"
              }`}
            >
              {val.enName}
            </div>
          );
        })}
      </div>

      <div className="w-full flex flex-row justify-center items-center gap-5">
        <button
          type="button"
          className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4 disabled:bg-gray-500"
          onClick={() => {
            imageDispatch({
              type: CERTIFICATE_IMAGE,
              payload: "",
            });
            uiDispatch({
              type: UPDATE_CERTIFICATE,
            });
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={updateCertificateLoading || uploadCertificateImageLoading}
          className="my-5 !text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-white p-2 px-4 disabled:bg-gray-500"
        >
          {updateCertificateLoading || uploadCertificateImageLoading ? (
            <SpinnerLoading size={`30px`} />
          ) : (
            "Publish"
          )}
        </button>
      </div>
    </form>
  );
}