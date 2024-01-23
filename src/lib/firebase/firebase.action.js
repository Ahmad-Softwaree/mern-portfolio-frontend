import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { firebaseStorage } from "../config/firebase.config";
import { generateAlert } from "../functions";

export const deleteImage = async (image, bucket, dispatch) => {
  const imageRef = ref(firebaseStorage, `${bucket}/${image}`);
  try {
    await deleteObject(imageRef);
    return generateAlert("وێنە سڕایەوە", "success", dispatch);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const insertImage = async (image, bucket, dispatch) => {
  try {
    if (image && image !== "" && image !== null) {
      const imageRef = ref(
        firebaseStorage,
        `${import.meta.env.VITE_FIREBASE_BUCKET}/${bucket}/${
          image.name + Date.now()
        }`
      );
      const data = await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(data.ref);
      generateAlert("وێنە داغڵکرا", "success", dispatch);

      return { imageURL, imageName: data.metadata.name };
    } else {
      throw new Error("کێشەیەکی ڕوویدا");
    }
  } catch (error) {
    return generateAlert(error, "error", dispatch);
  }
};
