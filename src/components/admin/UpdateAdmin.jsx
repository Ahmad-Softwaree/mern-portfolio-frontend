import React, { useContext, useState } from "react";
import { updateAdmin } from "../../context/actions/adminAction";
import { AlertContext } from "../../context/AlertContext";
import { AdminContext } from "../../context/AdminContext";
import { ImageContext } from "../../context/ImageContext";
import TextInput from "../inputs/TextInput";
import { UiContext } from "../../context/UiContext";
import { UPDATE_ADMIN } from "../../context/types/ui_types";
import SpinnerLoading from "../global/SpinnerLoading";
import { ADMIN_IMAGE } from "../../context/types/image_types";
import FileInput from "../inputs/FileInput";

export default function UpdateAdmin() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: adminDispatch,
    state: { updateAdminLoading },
  } = useContext(AdminContext);

  const {
    dispatch: imageDispatch,
    state: { adminImage, uploadAdminImageLoading },
  } = useContext(ImageContext);
  const {
    dispatch: uiDispatch,
    state: { val },
  } = useContext(UiContext);

  const [imageChanged, setImageChanged] = useState(false);
  const [name, setName] = useState(val.name);

  return (
    <form
      data-aos="fade-up"
      onSubmit={(e) => {
        e.preventDefault();
        updateAdmin(
          adminDispatch,
          alertDispatch,
          imageDispatch,
          uiDispatch,
          { name: name },
          val._id,
          setName,
          adminImage,
          val.imageURL,
          val.imageName,
          imageChanged
        );
      }}
      className="fixed inset-0 m-auto p-5 rounded-lg bg-black w-[95%] max-w-[500px] h-fit text-white flex flex-col justify-left items-center gap-[30px] z-[1100] shadow-xl overflow-y-auto max-h-[600px]"
    >
      <h1 className="font-bold w-full text-center">Update Admin</h1>
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
            Remove Old Admin Image
          </button>
        </div>
      )}

      <div className="flex flex-col justify-left items-center gap-5 w-full">
        {!adminImage && imageChanged ? (
          <FileInput
            title={`Admin Image`}
            value={""}
            onChange={(e) => {
              imageDispatch({
                type: ADMIN_IMAGE,
                payload: e.target.files[0],
              });
              setImageChanged(true);
            }}
            id={`adminImage`}
            className={`w-full`}
          />
        ) : adminImage ? (
          <div className="relative w-full h-full flex flex-col justify-left items-center gap-5">
            <img
              className="w-full h-[200px] object-contain rounded-md"
              src={URL.createObjectURL(adminImage)}
              alt="imageUpload"
            />

            <button
              type="button"
              onClick={() => {
                imageDispatch({ type: ADMIN_IMAGE, payload: "" });
                setImageChanged(false);
              }}
              className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4"
            >
              Remove Admin Image
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

      <div className="w-full flex flex-row justify-center items-center gap-5">
        <button
          type="button"
          className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4 disabled:bg-gray-500"
          onClick={() => {
            imageDispatch({
              type: ADMIN_IMAGE,
              payload: "",
            });
            uiDispatch({
              type: UPDATE_ADMIN,
            });
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={updateAdminLoading || uploadAdminImageLoading}
          className="my-5 !text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-white p-2 px-4 disabled:bg-gray-500"
        >
          {updateAdminLoading || uploadAdminImageLoading ? (
            <SpinnerLoading size={`30px`} />
          ) : (
            "Publish"
          )}
        </button>
      </div>
    </form>
  );
}
