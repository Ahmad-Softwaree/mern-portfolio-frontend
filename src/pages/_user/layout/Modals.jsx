import {
  BlogForm,
  CertificateForm,
  ProjectForm,
  SkillForm,
  UserForm,
  WorkForm,
} from "@/components/form";
import ConfigForm from "@/components/form/ConfigForm";
import { Delete, Opacity } from "@/components/shared";
import { UiContext } from "@/context/UiContext";
import { UtilContext } from "@/context/UtilContext";
import { useContext } from "react";

const Modals = () => {
  const {
    state: {
      user_form,
      config_form,
      project_form,
      blog_form,
      skill_form,
      work_form,
      certificate_form,
    },
  } = useContext(UiContext);
  const {
    state: { wantToDelete },
  } = useContext(UtilContext);
  const flag = Boolean(
    user_form ||
      wantToDelete ||
      config_form ||
      project_form ||
      blog_form ||
      skill_form ||
      work_form ||
      certificate_form
  );
  return (
    <>
      {flag && <Opacity />}
      {wantToDelete && <Delete />}
      {user_form && <UserForm />}
      {config_form && <ConfigForm />}
      {project_form && <ProjectForm />}
      {blog_form && <BlogForm />}
      {skill_form && <SkillForm />}
      {certificate_form && <CertificateForm />}
      {work_form && <WorkForm />}
    </>
  );
};

export default Modals;
