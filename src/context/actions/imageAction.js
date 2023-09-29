import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  BLOG_IMAGE,
  DELETE_INNER_BLOG_IMAGE_FAIL,
  DELETE_INNER_BLOG_IMAGE_START,
  DELETE_INNER_BLOG_IMAGE_SUCCESS,
  INSIDE_BLOG_IMAGE,
  PROJECT_IMAGE,
  UPLOAD_BLOG_IMAGE_FAIL,
  UPLOAD_BLOG_IMAGE_START,
  UPLOAD_BLOG_IMAGE_SUCCESS,
  UPLOAD_INNER_BLOG_IMAGE_FAIL,
  UPLOAD_INNER_BLOG_IMAGE_START,
  UPLOAD_INNER_BLOG_IMAGE_SUCCESS,
  UPLOAD_PROJECT_IMAGE_FAIL,
  UPLOAD_PROJECT_IMAGE_START,
  UPLOAD_PROJECT_IMAGE_SUCCESS,
  UPLOAD_WORK_IMAGE_FAIL,
  UPLOAD_WORK_IMAGE_START,
  UPLOAD_WORK_IMAGE_SUCCESS,
  WORK_IMAGE,
  UPLOAD_SKILL_IMAGE_FAIL,
  UPLOAD_SKILL_IMAGE_START,
  UPLOAD_SKILL_IMAGE_SUCCESS,
  SKILL_IMAGE,
  UPLOAD_CERTIFICATE_IMAGE_FAIL,
  UPLOAD_CERTIFICATE_IMAGE_SUCCESS,
  CERTIFICATE_IMAGE,
  UPLOAD_CERTIFICATE_IMAGE_START,
  UPLOAD_ADMIN_IMAGE_FAIL,
  UPLOAD_ADMIN_IMAGE_SUCCESS,
  ADMIN_IMAGE,
  UPLOAD_ADMIN_IMAGE_START,
} from "../types/image_types";
import { setAlert } from "./alertAction";
import { generateAlert } from "../../util/generateAlert";
import { ADD_BLOG_FAIL } from "../types/blog_types";
import { deleteImage } from "../../util/deleteFirebaseImage";
import firebaseStorage from "../../firebase_storage";
import { ADD_PROJECT_FAIL } from "../types/project_types";
import { ADD_WORK_FAIL } from "../types/work_types";
import { ADD_SKILL_FAIL } from "../types/skill_types";
import { ADD_CERTIFICATE_FAIL } from "../types/certificate_types";
import { ADD_ADMIN_FAIL } from "../types/admin_types";

export const addBlogImage = async (
  blogDispatch,
  alertDispatch,
  imageDispatch,
  image
) => {
  try {
    imageDispatch({
      type: UPLOAD_BLOG_IMAGE_START,
    });
    if (image && image !== "" && image !== null) {
      const imageRef = ref(
        firebaseStorage,
        `blog/${image.name + new Date().getTime()}`
      );
      const data = await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(data.ref);
      imageDispatch({
        type: BLOG_IMAGE,
        payload: "",
      });
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_BLOG_IMAGE_SUCCESS,
        imageURL,
        "Image Uploaded Successfully",
        "success"
      );
      return { imageURL, imageName: data.metadata.name };
    } else {
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_BLOG_IMAGE_FAIL,
        null,
        "Please Enter Image",
        "error"
      );
      return { imageURL: null, imageName: null };
    }
  } catch (error) {
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      ADD_BLOG_FAIL,
      null,
      "error"
    );
    imageDispatch({
      type: UPLOAD_BLOG_IMAGE_FAIL,
    });
  }
};

export const addInnerBlogImage = async (
  blogDispatch,
  alertDispatch,
  imageDispatch,
  image
) => {
  try {
    imageDispatch({
      type: UPLOAD_INNER_BLOG_IMAGE_START,
    });
    if (image && image !== "" && image !== null) {
      const imageRef = ref(
        firebaseStorage,
        `blog/${image.name + new Date().getTime()}`
      );
      const data = await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(data.ref);
      imageDispatch({
        type: INSIDE_BLOG_IMAGE,
        payload: "",
      });
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_INNER_BLOG_IMAGE_SUCCESS,
        imageURL,
        "Image Uploaded Successfully",
        "success"
      );
      return { imageURL, imageName: data.metadata.name };
    } else {
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_INNER_BLOG_IMAGE_FAIL,
        null,
        "Please Enter Image",
        "error"
      );
      return { imageURL: null, imageName: null };
    }
  } catch (error) {
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      ADD_BLOG_FAIL,
      null,
      "error"
    );
    imageDispatch({
      type: UPLOAD_INNER_BLOG_IMAGE_FAIL,
    });
  }
};

export const deleteInnerBlogImage = async (
  blogDispatch,
  alertDispatch,
  imageDispatch,
  image,
  setDeleteImageUrl
) => {
  try {
    imageDispatch({
      type: DELETE_INNER_BLOG_IMAGE_START,
    });
    if (image && image !== "" && image !== null) {
      await deleteImage("blog", image, blogDispatch, alertDispatch);
      setDeleteImageUrl("");
      return setAlert(
        imageDispatch,
        alertDispatch,
        DELETE_INNER_BLOG_IMAGE_SUCCESS,
        imageURL,
        "Image Deleted Successfully",
        "success"
      );
    } else {
      return setAlert(
        imageDispatch,
        alertDispatch,
        DELETE_INNER_BLOG_IMAGE_FAIL,
        null,
        "Please Enter Image",
        "error"
      );
    }
  } catch (error) {
    generateAlert(
      error,
      blogDispatch,
      alertDispatch,
      ADD_BLOG_FAIL,
      null,
      "error"
    );
    imageDispatch({
      type: DELETE_INNER_BLOG_IMAGE_FAIL,
    });
  }
};

export const addProjectImage = async (
  projectDispatch,
  alertDispatch,
  imageDispatch,
  image
) => {
  try {
    imageDispatch({
      type: UPLOAD_PROJECT_IMAGE_START,
    });
    if (image && image !== "" && image !== null) {
      const imageRef = ref(
        firebaseStorage,
        `project/${image.name + new Date().getTime()}`
      );
      const data = await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(data.ref);
      imageDispatch({
        type: PROJECT_IMAGE,
        payload: "",
      });
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_PROJECT_IMAGE_SUCCESS,
        imageURL,
        "Image Uploaded Successfully",
        "success"
      );
      return { imageURL, imageName: data.metadata.name };
    } else {
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_PROJECT_IMAGE_FAIL,
        null,
        "Please Enter Image",
        "error"
      );
      return { imageURL: null, imageName: null };
    }
  } catch (error) {
    generateAlert(
      error,
      projectDispatch,
      alertDispatch,
      ADD_PROJECT_FAIL,
      null,
      "error"
    );
    imageDispatch({
      type: UPLOAD_PROJECT_IMAGE_FAIL,
    });
  }
};

export const addAdminImage = async (
  adminDispatch,
  alertDispatch,
  imageDispatch,
  image
) => {
  try {
    imageDispatch({
      type: UPLOAD_ADMIN_IMAGE_START,
    });
    if (image && image !== "" && image !== null) {
      const imageRef = ref(
        firebaseStorage,
        `admin/${image.name + new Date().getTime()}`
      );
      const data = await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(data.ref);
      imageDispatch({
        type: ADMIN_IMAGE,
        payload: "",
      });
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_ADMIN_IMAGE_SUCCESS,
        imageURL,
        "Image Uploaded Successfully",
        "success"
      );
      return { imageURL, imageName: data.metadata.name };
    } else {
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_ADMIN_IMAGE_FAIL,
        null,
        "Please Enter Image",
        "error"
      );
      return { imageURL: null, imageName: null };
    }
  } catch (error) {
    generateAlert(
      error,
      adminDispatch,
      alertDispatch,
      ADD_ADMIN_FAIL,
      null,
      "error"
    );
    imageDispatch({
      type: UPLOAD_ADMIN_IMAGE_FAIL,
    });
  }
};

export const addWorkImage = async (
  workDispatch,
  alertDispatch,
  imageDispatch,
  image
) => {
  try {
    imageDispatch({
      type: UPLOAD_WORK_IMAGE_START,
    });
    if (image && image !== "" && image !== null) {
      const imageRef = ref(
        firebaseStorage,
        `work/${image.name + new Date().getTime()}`
      );
      const data = await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(data.ref);
      imageDispatch({
        type: WORK_IMAGE,
        payload: "",
      });
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_WORK_IMAGE_SUCCESS,
        imageURL,
        "Image Uploaded Successfully",
        "success"
      );
      return { imageURL, imageName: data.metadata.name };
    } else {
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_WORK_IMAGE_FAIL,
        null,
        "Please Enter Image",
        "error"
      );
      return { imageURL: null, imageName: null };
    }
  } catch (error) {
    generateAlert(
      error,
      workDispatch,
      alertDispatch,
      ADD_WORK_FAIL,
      null,
      "error"
    );
    imageDispatch({
      type: UPLOAD_WORK_IMAGE_FAIL,
    });
  }
};

export const addSkillImage = async (
  skillDispatch,
  alertDispatch,
  imageDispatch,
  image
) => {
  try {
    imageDispatch({
      type: UPLOAD_SKILL_IMAGE_START,
    });
    if (image && image !== "" && image !== null) {
      const imageRef = ref(
        firebaseStorage,
        `skill/${image.name + new Date().getTime()}`
      );
      const data = await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(data.ref);
      imageDispatch({
        type: SKILL_IMAGE,
        payload: "",
      });
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_SKILL_IMAGE_SUCCESS,
        imageURL,
        "Image Uploaded Successfully",
        "success"
      );
      return { imageURL, imageName: data.metadata.name };
    } else {
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_SKILL_IMAGE_FAIL,
        null,
        "Please Enter Image",
        "error"
      );
      return { imageURL: null, imageName: null };
    }
  } catch (error) {
    generateAlert(
      error,
      skillDispatch,
      alertDispatch,
      ADD_SKILL_FAIL,
      null,
      "error"
    );
    imageDispatch({
      type: UPLOAD_SKILL_IMAGE_FAIL,
    });
  }
};

export const addCertificateImage = async (
  CertificateDispatch,
  alertDispatch,
  imageDispatch,
  image
) => {
  try {
    imageDispatch({
      type: UPLOAD_CERTIFICATE_IMAGE_START,
    });
    if (image && image !== "" && image !== null) {
      const imageRef = ref(
        firebaseStorage,
        `certificate/${image.name + new Date().getTime()}`
      );
      const data = await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(data.ref);
      imageDispatch({
        type: CERTIFICATE_IMAGE,
        payload: "",
      });
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_CERTIFICATE_IMAGE_SUCCESS,
        imageURL,
        "Image Uploaded Successfully",
        "success"
      );
      return { imageURL, imageName: data.metadata.name };
    } else {
      setAlert(
        imageDispatch,
        alertDispatch,
        UPLOAD_CERTIFICATE_IMAGE_FAIL,
        null,
        "Please Enter Image",
        "error"
      );
      return { imageURL: null, imageName: null };
    }
  } catch (error) {
    generateAlert(
      error,
      CertificateDispatch,
      alertDispatch,
      ADD_CERTIFICATE_FAIL,
      null,
      "error"
    );
    imageDispatch({
      type: UPLOAD_CERTIFICATE_IMAGE_FAIL,
    });
  }
};
