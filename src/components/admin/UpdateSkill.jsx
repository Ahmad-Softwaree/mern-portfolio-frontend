import React, { useContext, useEffect, useState } from "react";
import { updateSkill } from "../../context/actions/skillAction";
import { AlertContext } from "../../context/AlertContext";
import { SkillContext } from "../../context/SkillContext";
import { ImageContext } from "../../context/ImageContext";
import TextInput from "../inputs/TextInput";
import { UiContext } from "../../context/UiContext";
import { UPDATE_SKILL } from "../../context/types/ui_types";
import SpinnerLoading from "../global/SpinnerLoading";
import { SKILL_IMAGE } from "../../context/types/image_types";
import FileInput from "../inputs/FileInput";
import { TypeContext } from "../../context/TypeContext";
import { getAllTypes } from "../../context/actions/typeAction";
export default function UpdateSkill() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: skillDispatch,
    state: { updateSkillLoading },
  } = useContext(SkillContext);
  const {
    dispatch: typeDispatch,
    state: { types, getTypesLoading },
  } = useContext(TypeContext);
  const {
    dispatch: imageDispatch,
    state: { skillImage, uploadSkillImageLoading },
  } = useContext(ImageContext);
  const {
    dispatch: uiDispatch,
    state: { val },
  } = useContext(UiContext);
  const [imageChanged, setImageChanged] = useState(false);
  const [type, setType] = useState(val.type._id);
  const [name, setName] = useState(val.name);

  useEffect(() => {
    getAllTypes(typeDispatch, alertDispatch);
  }, [typeDispatch]);

  return (
    <form
      data-aos="fade-up"
      onSubmit={(e) => {
        e.preventDefault();
        updateSkill(
          skillDispatch,
          alertDispatch,
          uiDispatch,
          imageDispatch,
          { type, name },
          val._id,
          setType,
          setName,
          skillImage,
          val.imageURL,
          val.imageName,
          imageChanged
        );
      }}
      className="fixed inset-0 m-auto p-5 rounded-lg bg-black w-[95%] max-w-[500px] h-fit text-white flex flex-col justify-left items-center gap-[30px] z-[1100] shadow-xl overflow-y-auto max-h-[600px]"
    >
      <h1 className="font-bold w-full text-center">Update Skill</h1>
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
            Remove Old Skill Image
          </button>
        </div>
      )}
      <div className="flex flex-col justify-left items-center gap-5 w-full">
        {!skillImage && imageChanged ? (
          <FileInput
            title={`Skill Image`}
            value={""}
            onChange={(e) => {
              imageDispatch({
                type: SKILL_IMAGE,
                payload: e.target.files[0],
              });
              setImageChanged(true);
            }}
            id={`skillImage`}
            className={`w-full`}
          />
        ) : skillImage ? (
          <div className="relative w-full h-full flex flex-col justify-left items-center gap-5">
            <img
              className="w-full h-[200px] object-contain rounded-md"
              src={URL.createObjectURL(skillImage)}
              alt="imageUpload"
            />

            <button
              onClick={() => {
                imageDispatch({ type: SKILL_IMAGE, payload: "" });
                setImageChanged(false);
              }}
              className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4"
            >
              Remove Skill Image
            </button>
          </div>
        ) : null}
      </div>
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        name={`name`}
        className={`w-full`}
        title={`Name`}
      />

      <h1 className="font-bold w-full text-left !text-[20px]">Select Type</h1>

      <div className="flex flex-row justify-left items-center gap-5 w-full flex-wrap">
        {types?.map((val, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setType(val._id);
              }}
              className={`!text-[14px] p-2 rounded-md border-2 border-solid border-blue transition-all duration-300  hover:bg-blue hover:text-black cursor-pointer ${
                type === val._id ? "bg-blue text-black" : "text-blue"
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
            uiDispatch({
              type: UPDATE_SKILL,
            });
            imageDispatch({
              type: SKILL_IMAGE,
              payload: "",
            });
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={updateSkillLoading || uploadSkillImageLoading}
          className="my-5 !text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-white p-2 px-4 disabled:bg-gray-500"
        >
          {updateSkillLoading || uploadSkillImageLoading ? (
            <SpinnerLoading size={`30px`} />
          ) : (
            "Publish"
          )}
        </button>
      </div>
    </form>
  );
}