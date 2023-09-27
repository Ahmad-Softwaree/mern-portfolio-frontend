import React, { useContext, useEffect } from "react";
import { AlertContext } from "../../context/AlertContext";
import { UtilContext } from "../../context/UtilContext";
import { TOGGLE_WANT_TO_DELETE } from "../../context/types/util_types";
import { CategoryContext } from "../../context/CategoryContext";
import {
  DELETE_ONE_CATEGORY_METHOD,
  DELETE_ONE_CERTIFICATE_METHOD,
  DELETE_ONE_PROJECT_METHOD,
  DELETE_ONE_SKILL_METHOD,
  DELETE_ONE_STACK_METHOD,
  DELETE_ONE_TYPE_METHOD,
  DELETE_ONE_WORK_METHOD,
} from "../../context/types/delete_types";
import { deleteCategory } from "../../context/actions/categoryAction";
import SpinnerLoading from "../global/SpinnerLoading";
import { ProjectContext } from "../../context/ProjectContext";
import { deleteProject } from "../../context/actions/projectAction";
import { WorkContext } from "../../context/WorkContext";
import { deleteWork } from "../../context/actions/workAction";
import { SkillContext } from "../../context/SkillContext";
import { deleteSkill } from "../../context/actions/skillAction";
import { StackContext } from "../../context/StackContext";
import { CertificateContext } from "../../context/CertificateContext";
import { deleteStack } from "../../context/actions/stackAction";
import { deleteCertificate } from "../../context/actions/certificateAction";
import { TypeContext } from "../../context/TypeContext";
import { deleteType } from "../../context/actions/typeAction";

export default function WantToDelete() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: utilDispatch,
    state: { method, id, image },
  } = useContext(UtilContext);
  const {
    dispatch: categoryDispatch,
    state: { deleteCategoryLoading },
  } = useContext(CategoryContext);
  const {
    dispatch: projectDispatch,
    state: { deleteProjectLoading },
  } = useContext(ProjectContext);
  const {
    dispatch: workDispatch,
    state: { deleteWorkLoading },
  } = useContext(WorkContext);
  const {
    dispatch: skillDispatch,
    state: { deleteSkillLoading },
  } = useContext(SkillContext);
  const {
    dispatch: stackDispatch,
    state: { deleteStackLoading },
  } = useContext(StackContext);
  const {
    dispatch: certificateDispatch,
    state: { deleteCertificateLoading },
  } = useContext(CertificateContext);

  const {
    dispatch: typeDispatch,
    state: { deleteTypeLoading },
  } = useContext(TypeContext);

  const flag = Boolean(
    deleteCategoryLoading ||
      deleteProjectLoading ||
      deleteWorkLoading ||
      deleteSkillLoading ||
      deleteStackLoading ||
      deleteCertificateLoading ||
      deleteTypeLoading
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        switch (method) {
          case DELETE_ONE_CATEGORY_METHOD:
            return deleteCategory(
              categoryDispatch,
              alertDispatch,
              utilDispatch,
              id
            );
          case DELETE_ONE_PROJECT_METHOD:
            return deleteProject(
              projectDispatch,
              alertDispatch,
              utilDispatch,
              id,
              image
            );
          case DELETE_ONE_WORK_METHOD:
            return deleteWork(
              workDispatch,
              alertDispatch,
              utilDispatch,
              id,
              image
            );
          case DELETE_ONE_SKILL_METHOD:
            return deleteSkill(
              skillDispatch,
              alertDispatch,
              utilDispatch,
              id,
              image
            );
          case DELETE_ONE_STACK_METHOD:
            return deleteStack(stackDispatch, alertDispatch, utilDispatch, id);
          case DELETE_ONE_CERTIFICATE_METHOD:
            return deleteCertificate(
              certificateDispatch,
              alertDispatch,
              utilDispatch,
              id,
              image
            );
          case DELETE_ONE_TYPE_METHOD:
            return deleteType(typeDispatch, alertDispatch, utilDispatch, id);
        }
      }}
      data-aos="fade-up"
      className="fixed z-[1000] shadow-xl border-2 border-solid border-purple rounded-lg inset-0 m-auto p-5 h-fit w-fit bg-black text-white"
    >
      <p>Are you sure you want to delete?</p>
      <div className="flex flex-row justify-center items-center gap-5">
        <button
          type="submit"
          disabled={flag}
          className="my-5 !text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-white p-2 px-4 disabled:bg-gray-500"
        >
          {flag ? <SpinnerLoading size={`30px`} /> : "Yes"}
        </button>
        <button
          type="button"
          onClick={() => utilDispatch({ type: TOGGLE_WANT_TO_DELETE })}
          className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4"
        >
          No
        </button>
      </div>
    </form>
  );
}
