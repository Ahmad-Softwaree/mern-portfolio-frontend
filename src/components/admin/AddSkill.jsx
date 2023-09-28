import React, { useContext, useEffect, useState } from "react";
import { addSkill } from "../../context/actions/skillAction";
import { AlertContext } from "../../context/AlertContext";
import { SkillContext } from "../../context/SkillContext";
import { ImageContext } from "../../context/ImageContext";
import TextInput from "../inputs/TextInput";
import { UiContext } from "../../context/UiContext";
import { ADD_SKILL } from "../../context/types/ui_types";
import SpinnerLoading from "../global/SpinnerLoading";
import { SKILL_IMAGE } from "../../context/types/image_types";
import FileInput from "../inputs/FileInput";
import { getAllTypes } from "../../context/actions/typeAction";
import { TypeContext } from "../../context/TypeContext";

export default function AddSkill() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: skillDispatch,
    state: { addSkillLoading },
  } = useContext(SkillContext);
  const {
    dispatch: typeDispatch,
    state: { types, getTypesLoading },
  } = useContext(TypeContext);
  const {
    dispatch: imageDispatch,
    state: { skillImage, uploadSkillImageLoading },
  } = useContext(ImageContext);
  const { dispatch: uiDispatch } = useContext(UiContext);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [name, setName] = useState("");

  useEffect(() => {
    getAllTypes(typeDispatch, alertDispatch);
  }, [typeDispatch]);

  return (
    <form
      data-aos="fade-up"
      onSubmit={(e) => {
        e.preventDefault();
        addSkill(
          skillDispatch,
          alertDispatch,
          imageDispatch,
          uiDispatch,
          { types: selectedTypes, name },
          skillImage,
          setSelectedTypes,
          setName
        );
      }}
      className="fixed inset-0 m-auto p-5 rounded-lg bg-black w-[95%] max-w-[500px] h-fit text-white flex flex-col justify-left items-center gap-[30px] z-[1100] shadow-xl overflow-y-auto max-h-[600px]"
    >
      <h1 className="font-bold w-full text-center">Add Skill</h1>

      <div className="flex flex-col justify-left items-center gap-5 w-full">
        {!skillImage ? (
          <FileInput
            title={`Skill Image`}
            value={""}
            onChange={(e) => {
              imageDispatch({
                type: SKILL_IMAGE,
                payload: e.target.files[0],
              });
            }}
            id={`skillImage`}
            className={`w-full`}
          />
        ) : (
          <div className="relative w-full h-full flex flex-col justify-left items-center gap-5">
            <img
              className="w-full h-[200px] object-contain rounded-md"
              src={URL.createObjectURL(skillImage)}
              alt="imageUpload"
            />

            <button
              onClick={() => {
                imageDispatch({ type: SKILL_IMAGE, payload: "" });
              }}
              className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4"
            >
              Remove Skill Image
            </button>
          </div>
        )}
      </div>
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        name={`name`}
        className={`w-full`}
        title={`Name`}
      />

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
            uiDispatch({
              type: ADD_SKILL,
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
          disabled={addSkillLoading || uploadSkillImageLoading}
          className="my-5 !text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-white p-2 px-4 disabled:bg-gray-500"
        >
          {addSkillLoading || uploadSkillImageLoading ? (
            <SpinnerLoading size={`30px`} />
          ) : (
            "Publish"
          )}
        </button>
      </div>
    </form>
  );
}
