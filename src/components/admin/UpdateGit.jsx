import React, { Fragment, useContext, useState } from "react";
import TextInput from "../inputs/TextInput";
import { setAlert } from "../../context/actions/alertAction";
import { AlertContext } from "../../context/AlertContext";
import { ProjectContext } from "../../context/ProjectContext";
export default function UpdateGit({ val, setGits, gits, setUpdate }) {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const { dispatch: projectDispatch } = useContext(ProjectContext);
  const [oldName, setOldName] = useState(val.name);
  const [git, setGit] = useState(val.git);
  const [gitName, setGitName] = useState(val.name);
  return (
    <Fragment>
      <TextInput
        value={git}
        onChange={(e) => setGit(e.target.value)}
        name={`git`}
        className={`w-full`}
        title={`Git URL`}
      />
      <TextInput
        value={gitName}
        onChange={(e) => setGitName(e.target.value)}
        name={`gitName`}
        className={`w-full`}
        title={`Git Name`}
      />
      <div className="w-full flex flex-row justify-start items-center gap-5">
        <button
          type="button"
          onClick={() => {
            if (git === "" || gitName === "")
              return setAlert(
                projectDispatch,
                alertDispatch,
                null,
                null,
                "Select Git and Git name to add",
                "error"
              );
            setGits((prev) => [...prev.filter((val) => val.name !== oldName)]);
            setGits((prev) => [...prev, { git: git, name: gitName }]);
            setGit("");
            setGitName("");
            setUpdate(false);
          }}
          className="my-5 !text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-white p-2 px-4"
        >
          Update Git Link
        </button>
        <button
          type="button"
          onClick={() => setUpdate(false)}
          className="my-5 !text-[14px] text-green border-2 border-solid border-green rounded-md transition-all duration-300 hover:bg-green hover:text-black p-2 px-4"
        >
          Go Back
        </button>
      </div>
    </Fragment>
  );
}
