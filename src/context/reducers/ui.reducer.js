import { CONTEXT_TYPEs } from "..";

export const uiState = {
  type: "",
  id: "",
  data: null,
  user_form: false,
  project_form: false,
  blog_form: false,

  config_form: false,
  skill_form: false,
  certificate_form: false,
  work_form: false,
  config: "",
  qKey: "",
  about: false,
};

export const uiReducer = (state = uiState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONTEXT_TYPEs.REFRESH_UI:
      return {
        ...state,
        type: "",
        id: "",
        data: null,
        user_form: false,
        project_form: false,
        blog_form: false,
        skill_form: false,
        certificate_form: false,
        work_form: false,
        config_form: false,
        config: "",
        qKey: "",
        about: false,
      };
    case CONTEXT_TYPEs.USER_FORM:
      return {
        ...state,
        type: payload?.type,
        id: payload?.id,
        data: payload?.data,
        user_form: !state.user_form,
      };
    case CONTEXT_TYPEs.SKILL_FORM:
      return {
        ...state,
        type: payload?.type,
        id: payload?.id,
        data: payload?.data,
        skill_form: !state.skill_form,
      };
    case CONTEXT_TYPEs.WORK_FORM:
      return {
        ...state,
        type: payload?.type,
        id: payload?.id,
        data: payload?.data,
        work_form: !state.work_form,
      };
    case CONTEXT_TYPEs.CERTIFICATE_FORM:
      return {
        ...state,
        type: payload?.type,
        id: payload?.id,
        data: payload?.data,
        certificate_form: !state.certificate_form,
      };
    case CONTEXT_TYPEs.ABOUT:
      return {
        ...state,
        about: !state.about,
      };
    case CONTEXT_TYPEs.PROJECT_FORM:
      return {
        ...state,
        type: payload?.type,
        id: payload?.id,
        data: payload?.data,
        project_form: !state.project_form,
      };
    case CONTEXT_TYPEs.BLOG_FORM:
      return {
        ...state,
        type: payload?.type,
        id: payload?.id,
        data: payload?.data,
        blog_form: !state.blog_form,
      };
    case CONTEXT_TYPEs.CONFIG_FORM:
      return {
        ...state,
        config_form: !state.config_form,
        type: payload?.type,
        id: payload?.id,
        data: payload?.data,
        qKey: payload?.qKey,
        config: payload?.config,
      };
    default:
      return state;
  }
};
