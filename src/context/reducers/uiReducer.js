import {
  ADD_ADMIN,
  ADD_CATEGORY,
  ADD_CERTIFICATE,
  ADD_PROJECT,
  ADD_SKILL,
  ADD_STACK,
  ADD_TYPE,
  ADD_WORK,
  PRIVATE,
  UPDATE_ADMIN,
  UPDATE_CATEGORY,
  UPDATE_CERTIFICATE,
  UPDATE_PROJECT,
  UPDATE_SKILL,
  UPDATE_STACK,
  UPDATE_TYPE,
  UPDATE_WORK,
} from "../types/ui_types";

export const uiInitialState = {
  addCategory: false,
  updateCategory: false,
  addProject: false,
  updateProject: false,
  addWork: false,
  updateWork: false,
  addStack: false,
  updateStack: false,
  addType: false,
  updateType: false,
  addSkill: false,
  updateSkill: false,
  addCertificate: false,
  updateCertificate: false,
  addAdmin: false,
  updateAdmin: false,
  private: false,
  val: null,
};

export const uiReducer = (state = uiInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRIVATE:
      return {
        ...state,
        private: !state.private,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        addCategory: !state.addCategory,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        updateCategory: !state.updateCategory,
        val: payload ? payload : null,
      };

    case ADD_PROJECT:
      return {
        ...state,
        addProject: !state.addProject,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        updateProject: !state.updateProject,
        val: payload ? payload : null,
      };

    case ADD_WORK:
      return {
        ...state,
        addWork: !state.addWork,
      };
    case UPDATE_WORK:
      return {
        ...state,
        updateWork: !state.updateWork,
        val: payload ? payload : null,
      };

    case ADD_STACK:
      return {
        ...state,
        addStack: !state.addStack,
      };
    case UPDATE_STACK:
      return {
        ...state,
        updateStack: !state.updateStack,
        val: payload ? payload : null,
      };

    case ADD_TYPE:
      return {
        ...state,
        addType: !state.addType,
      };
    case UPDATE_TYPE:
      return {
        ...state,
        updateType: !state.updateType,
        val: payload ? payload : null,
      };

    case ADD_SKILL:
      return {
        ...state,
        addSkill: !state.addSkill,
      };
    case UPDATE_SKILL:
      return {
        ...state,
        updateSkill: !state.updateSkill,
        val: payload ? payload : null,
      };

    case ADD_CERTIFICATE:
      return {
        ...state,
        addCertificate: !state.addCertificate,
      };
    case UPDATE_CERTIFICATE:
      return {
        ...state,
        updateCertificate: !state.updateCertificate,
        val: payload ? payload : null,
      };

    case ADD_ADMIN:
      return {
        ...state,
        addAdmin: !state.addAdmin,
      };
    case UPDATE_ADMIN:
      return {
        ...state,
        updateAdmin: !state.updateAdmin,
        val: payload ? payload : null,
      };
    default:
      return state;
  }
};
