import {
  BLOG_IMAGE,
  INSIDE_BLOG_IMAGE,
  UPLOAD_INNER_BLOG_IMAGE_FAIL,
  UPLOAD_INNER_BLOG_IMAGE_START,
  UPLOAD_INNER_BLOG_IMAGE_SUCCESS,
  DELETE_INNER_BLOG_IMAGE_FAIL,
  DELETE_INNER_BLOG_IMAGE_START,
  DELETE_INNER_BLOG_IMAGE_SUCCESS,
  UPLOAD_BLOG_IMAGE_START,
  UPLOAD_BLOG_IMAGE_FAIL,
  UPLOAD_BLOG_IMAGE_SUCCESS,
  PROJECT_IMAGE,
  UPLOAD_PROJECT_IMAGE_START,
  UPLOAD_PROJECT_IMAGE_FAIL,
  UPLOAD_PROJECT_IMAGE_SUCCESS,
  WORK_IMAGE,
  UPLOAD_WORK_IMAGE_START,
  UPLOAD_WORK_IMAGE_FAIL,
  UPLOAD_WORK_IMAGE_SUCCESS,
  SKILL_IMAGE,
  UPLOAD_SKILL_IMAGE_START,
  UPLOAD_SKILL_IMAGE_FAIL,
  UPLOAD_SKILL_IMAGE_SUCCESS,
  CERTIFICATE_IMAGE,
  UPLOAD_CERTIFICATE_IMAGE_START,
  UPLOAD_CERTIFICATE_IMAGE_SUCCESS,
  UPLOAD_CERTIFICATE_IMAGE_FAIL,
  ADMIN_IMAGE,
  UPLOAD_ADMIN_IMAGE_START,
  UPLOAD_ADMIN_IMAGE_SUCCESS,
  UPLOAD_ADMIN_IMAGE_FAIL,
} from "../../context/types/image_types";

export const imageInitialState = {
  blogImage: "",
  insideBlogImage: "",
  uploadInnerBlogImageLoading: false,
  uploadBlogImageLoading: false,
  deleteInnerBlogImageLoading: false,
  projectImage: "",
  uploadProjectImageLoading: false,
  workImage: "",
  uploadWorkImageLoading: false,
  skillImage: "",
  uploadSkillImageLoading: false,
  certificateImage: "",
  uploadCertificateImageLoading: false,
  adminImage: "",
  uploadAdminImageLoading: false,
};

export const imageReducer = (state = imageInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case BLOG_IMAGE:
      return {
        ...state,
        blogImage: payload,
      };
    case INSIDE_BLOG_IMAGE:
      return {
        ...state,
        insideBlogImage: payload,
      };
    case UPLOAD_BLOG_IMAGE_START:
      return {
        ...state,
        uploadBlogImageLoading: true,
      };
    case UPLOAD_BLOG_IMAGE_FAIL:
      return {
        ...state,
        uploadBlogImageLoading: false,
      };
    case UPLOAD_BLOG_IMAGE_SUCCESS:
      return {
        ...state,
        uploadBlogImageLoading: false,
      };

    case UPLOAD_INNER_BLOG_IMAGE_START:
      return {
        ...state,
        uploadInnerBlogImageLoading: true,
      };
    case UPLOAD_INNER_BLOG_IMAGE_FAIL:
      return {
        ...state,
        uploadInnerBlogImageLoading: false,
      };
    case UPLOAD_INNER_BLOG_IMAGE_SUCCESS:
      return {
        ...state,
        uploadInnerBlogImageLoading: false,
      };

    case DELETE_INNER_BLOG_IMAGE_START:
      return {
        ...state,
        deleteInnerBlogImageLoading: true,
      };
    case DELETE_INNER_BLOG_IMAGE_FAIL:
      return {
        ...state,
        deleteInnerBlogImageLoading: false,
      };
    case DELETE_INNER_BLOG_IMAGE_SUCCESS:
      return {
        ...state,
        deleteInnerBlogImageLoading: false,
      };
    case PROJECT_IMAGE:
      return {
        ...state,
        projectImage: payload,
      };
    case UPLOAD_PROJECT_IMAGE_START:
      return {
        ...state,
        uploadProjectImageLoading: true,
      };
    case UPLOAD_PROJECT_IMAGE_FAIL:
      return {
        ...state,
        uploadProjectImageLoading: false,
      };
    case UPLOAD_PROJECT_IMAGE_SUCCESS:
      return {
        ...state,
        uploadProjectImageLoading: false,
      };

    case WORK_IMAGE:
      return {
        ...state,
        workImage: payload,
      };
    case UPLOAD_WORK_IMAGE_START:
      return {
        ...state,
        uploadWorkImageLoading: true,
      };
    case UPLOAD_WORK_IMAGE_FAIL:
      return {
        ...state,
        uploadWorkImageLoading: false,
      };
    case UPLOAD_WORK_IMAGE_SUCCESS:
      return {
        ...state,
        uploadWorkImageLoading: false,
      };

    case SKILL_IMAGE:
      return {
        ...state,
        skillImage: payload,
      };
    case UPLOAD_SKILL_IMAGE_START:
      return {
        ...state,
        uploadSkillImageLoading: true,
      };
    case UPLOAD_SKILL_IMAGE_FAIL:
      return {
        ...state,
        uploadSkillImageLoading: false,
      };
    case UPLOAD_SKILL_IMAGE_SUCCESS:
      return {
        ...state,
        uploadSkillImageLoading: false,
      };

    case CERTIFICATE_IMAGE:
      return {
        ...state,
        certificateImage: payload,
      };
    case UPLOAD_CERTIFICATE_IMAGE_START:
      return {
        ...state,
        uploadCertificateImageLoading: true,
      };
    case UPLOAD_CERTIFICATE_IMAGE_FAIL:
      return {
        ...state,
        uploadCertificateImageLoading: false,
      };
    case UPLOAD_CERTIFICATE_IMAGE_SUCCESS:
      return {
        ...state,
        uploadCertificateImageLoading: false,
      };

    case ADMIN_IMAGE:
      return {
        ...state,
        adminImage: payload,
      };
    case UPLOAD_ADMIN_IMAGE_START:
      return {
        ...state,
        uploadAdminImageLoading: true,
      };
    case UPLOAD_ADMIN_IMAGE_FAIL:
      return {
        ...state,
        uploadAdminImageLoading: false,
      };
    case UPLOAD_ADMIN_IMAGE_SUCCESS:
      return {
        ...state,
        uploadAdminImageLoading: false,
      };
    default:
      return state;
  }
};
