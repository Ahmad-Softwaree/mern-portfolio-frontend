import React, { Fragment, useState } from "react";
import FakeInput from "../inputs/FakeInput";
import UpdateGit from "./UpdateGit";
export default function Git({ val, setGits, gits }) {
  const [update, setUpdate] = useState(false);

  return (
    <Fragment>
      {update ? (
        <UpdateGit
          setUpdate={setUpdate}
          val={val}
          setGits={setGits}
          gits={gits}
        />
      ) : (
        <Fragment>
          <Fragment>
            <FakeInput className={`w-full`} title={`Git Link`} text={val.git} />
            <FakeInput
              className={`w-full`}
              title={`Git Name`}
              text={val.name}
            />
          </Fragment>

          <div className="w-full flex flex-row justify-start items-center gap-5">
            <button
              type="button"
              onClick={() => {
                setGits((prev) => prev.filter((one) => one.git !== val.git));
              }}
              className="my-5 !text-[14px] text-primary-500 border-2 border-solid border-primary-500 rounded-md transition-all duration-300 hover:bg-primary-500 hover:text-white-500 p-2 px-4">
              Remove Git Link
            </button>
            <button
              type="button"
              onClick={() => setUpdate(true)}
              className="my-5 !text-[14px] text-green border-2 border-solid border-green rounded-md transition-all duration-300 hover:bg-green hover:text-black-500 p-2 px-4">
              Update Git Link
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
