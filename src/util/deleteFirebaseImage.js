import { deleteObject, ref } from "firebase/storage";
import { setAlert } from "../context/actions/alertAction";
import firebaseStorage from "../firebase_storage";
export const deleteImage = async (file, image, dispatch1, dispatch2) => {
  const imageRef = ref(firebaseStorage, `${file}/${image}`);
  try {
    await deleteObject(imageRef);
    setAlert(
      dispatch1,
      dispatch2,
      null,
      null,
      "Image Deleted Successfully",
      "success"
    );
  } catch (error) {
    throw new Error(error.message);
  }
};
