import {
  GET_ALL_SKILL_FAIL,
  GET_ALL_SKILL_START,
  GET_ALL_SKILL_SUCCESS,
  UPDATE_SKILL_FAIL,
  UPDATE_SKILL_START,
  UPDATE_SKILL_SUCCESS,
  ADD_SKILL_FAIL,
  ADD_SKILL_START,
  ADD_SKILL_SUCCESS,
  DELETE_SKILL_FAIL,
  DELETE_SKILL_START,
  DELETE_SKILL_SUCCESS,
} from "../../context/types/skill_types";

export const skillInitialState = {
  skills: [],
  getSkillsLoading: false,
  addSkillLoading: false,
  deleteSkillLoading: false,
  updateSkillLoading: false,
};

export const skillReducer = (state = skillInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_SKILL_START:
      return {
        ...state,
        getSkillsLoading: true,
      };
    case GET_ALL_SKILL_FAIL:
      return {
        ...state,
        getSkillsLoading: false,
      };
    case GET_ALL_SKILL_SUCCESS:
      return {
        ...state,
        skills: payload,

        getSkillsLoading: false,
      };
    case ADD_SKILL_START:
      return {
        ...state,
        addSkillLoading: true,
      };
    case ADD_SKILL_FAIL:
      return {
        ...state,
        addSkillLoading: false,
      };
    case ADD_SKILL_SUCCESS:
      return {
        ...state,
        skills: [...state.skills, payload],

        addSkillLoading: false,
      };
    case DELETE_SKILL_START:
      return {
        ...state,
        deleteSkillLoading: true,
      };
    case DELETE_SKILL_FAIL:
      return {
        ...state,
        deleteSkillLoading: false,
      };
    case DELETE_SKILL_SUCCESS:
      return {
        ...state,
        skills: state.skills.filter((val) => val._id !== payload),

        deleteSkillLoading: false,
      };
    case UPDATE_SKILL_START:
      return {
        ...state,
        updateSkillLoading: true,
      };
    case UPDATE_SKILL_FAIL:
      return {
        ...state,
        updateSkillLoading: false,
      };
    case UPDATE_SKILL_SUCCESS:
      var data = state.skills;
      var index = data.findIndex((val) => val._id === payload._id);
      data[index] = payload;
      return {
        ...state,
        skills: data,

        updateSkillLoading: false,
      };
    default:
      return state;
  }
};
