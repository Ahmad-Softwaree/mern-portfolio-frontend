import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYs } from "../types";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../action/user.action";
import { generateAlert } from "@/lib/functions";
import { deleteImage, insertImage } from "@/lib/firebase/firebase.action";
import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
import { ENUMs } from "@/lib/enum";
import { UtilContext } from "@/context/UtilContext";

export function useGetUsers() {
  const { dispatch } = useContext(AlertContext);

  return useQuery({
    queryKey: [QUERY_KEYs.USERS],
    queryFn: () => getUsers(dispatch),
    retry: 0,
  });
}

export function useAddUser() {
  const { dispatch: ui } = useContext(UiContext);
  const { dispatch } = useContext(AlertContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ state, image }) => {
      let form = state;
      if (image) {
        let { imageURL, imageName } = await insertImage(
          image,
          ENUMs.USER_BUCKET,
          dispatch
        );
        form.imageName = imageName;
        form.imageURL = imageURL;
      }
      return await addUser(form);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.USERS]);
      generateAlert(data.message, "success", dispatch);
      ui({
        type: CONTEXT_TYPEs.USER_FORM,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}
export function useUpdateUser(id) {
  const { dispatch: ui } = useContext(UiContext);

  const { dispatch } = useContext(AlertContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ state, oldImg, oldURL, image }) => {
      let form = state;
      if (image) {
        //new image uploaded
        //insert image
        let { imageURL, imageName } = await insertImage(
          image,
          ENUMs.USER_BUCKET,
          dispatch
        );
        form.imageName = imageName;
        form.imageURL = imageURL;
        //delete old image
        //if (oldImg) await deleteImage(oldImg, ENUMs.USER_BUCKET, dispatch);
      } else {
        form.imageName = oldImg;
        form.imageURL = oldURL;
      }
      return await updateUser(id, form);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.USERS]);
      generateAlert(data.message, "success", dispatch);
      ui({
        type: CONTEXT_TYPEs.USER_FORM,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}

export function useDeleteUser() {
  const { dispatch } = useContext(AlertContext);
  const { dispatch: util } = useContext(UtilContext);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, image }) => {
      await deleteUser(id);
      return await deleteImage(image, ENUMs.USER_BUCKET, dispatch);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.USERS]);
      generateAlert(data.message, "success", dispatch);
      util({
        type: CONTEXT_TYPEs.DELETE,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}
