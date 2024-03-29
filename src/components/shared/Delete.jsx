import { UtilContext } from "@/context/UtilContext";
import { CONTEXT_TYPEs } from "@/context";
import { useContext } from "react";
import { Loader } from ".";
import { useDeleteUser } from "@/lib/react-query/query/user.query";
import { useDeleteConfig } from "@/lib/react-query/query/config.query";
import { useDeleteProject } from "@/lib/react-query/query/project.query";
import { useDeleteBlog } from "@/lib/react-query/query/blog.query";
import { useDeleteSkill } from "@/lib/react-query/query/skill.query";
import { useDeleteWork } from "@/lib/react-query/query/work.query";
import { useDeleteCertificate } from "@/lib/react-query/query/certificate.query";

export default function Delete() {
  const {
    dispatch,
    state: { id, method, image, type },
  } = useContext(UtilContext);

  const { mutateAsync: deleteUser, isPending: userLoading } = useDeleteUser();
  const { mutateAsync: deleteProject, isPending: projectLoading } =
    useDeleteProject();
  const { mutateAsync: deleteBlog, isPending: blogLoading } = useDeleteBlog();
  const { mutateAsync: deleteConfig, isPending: configLoading } =
    useDeleteConfig(type, id);
  const { mutateAsync: deleteSkill, isPending: skillLoading } = useDeleteSkill(
    type,
    id
  );
  const { mutateAsync: deleteWork, isPending: workLoading } = useDeleteWork(
    type,
    id
  );
  const { mutateAsync: deleteCertificate, isPending: certificateLoading } =
    useDeleteCertificate(type, id);
  const flag = Boolean(
    userLoading ||
      configLoading ||
      projectLoading ||
      blogLoading ||
      skillLoading ||
      workLoading ||
      certificateLoading
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        switch (method) {
          case CONTEXT_TYPEs.DELETE_CONFIG:
            return deleteConfig();
          case CONTEXT_TYPEs.DELETE_USER:
            return deleteUser({ id, image });
          case CONTEXT_TYPEs.DELETE_PROJECT:
            return deleteProject({ id, image });
          case CONTEXT_TYPEs.DELETE_BLOG:
            return deleteBlog({ id, image });
          case CONTEXT_TYPEs.DELETE_WORK:
            return deleteWork({ id, image });
          case CONTEXT_TYPEs.DELETE_SKILL:
            return deleteSkill({ id, image });
          case CONTEXT_TYPEs.DELETE_CERTIFICATE:
            return deleteCertificate({ id, image });
          default:
            return;
        }
      }}
      data-aos="fade-up"
      className={`bg-black-500 text-white-500 z-[1500] fixed inset-0 m-auto w-fit h-fit p-10 rounded-lg  flex flex-col justify-center items-center transition-all duration-200  gap-5 shadow-xl`}>
      <h2>You sure want to delete this data?</h2>
      <div className="flex flex-row w-full justify-center items-center gap-5">
        <button
          type="button"
          onClick={() => {
            dispatch({
              type: CONTEXT_TYPEs.DELETE,
              payload: null,
            });
          }}
          className="p-2 px-10 bg-red-500 cursor-pointer rounded-lg bg-green text-black-500">
          No
        </button>
        <button
          type="submit"
          disabled={flag}
          className="p-2 px-10 text-white-500 bg-primary-500 cursor-pointer rounded-lg disabled:bg-gray-500">
          {flag ? <Loader /> : "Yes"}
        </button>
      </div>
    </form>
  );
}
