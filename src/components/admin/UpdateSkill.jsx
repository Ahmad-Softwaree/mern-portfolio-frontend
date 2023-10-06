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
import SelectInput from "../inputs/SelectInput";
export default function UpdateSkill() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: skillDispatch,
    state: { updateSkillLoading, skills },
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
  const [selectedTypes, setSelectedTypes] = useState(
    val.types?.map((val) => ({
      type: val.type?._id,
    }))
  );
  const [inputs, setInputs] = useState({
    name: val.name,
    sequence: val.sequence,
  });

  const { name, sequence } = inputs;
  const onChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
          { name, sequence: parseInt(sequence), types: selectedTypes },
          val._id,
          setSelectedTypes,
          setInputs,
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
        onChange={onChange}
        name={`name`}
        className={`w-full`}
        title={`Name`}
      />
      <SelectInput
        value={sequence}
        onChange={onChange}
        name={`sequence`}
        className={`w-full`}
        title={`sequence`}
        options={Array.from(
          { length: skills.length },
          (_, index) => index + 1
        ).map((val, index) => {
          return {
            name: val,
            value: val,
          };
        })}
      />
      <h1 className="font-bold w-full text-left !text-[20px]">Select Type</h1>

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
