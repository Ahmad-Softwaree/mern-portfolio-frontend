import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addConfig,
  deleteConfig,
  getConfig,
  updateConfig,
} from "../action/config.action";
import { useContext } from "react";
import { AlertContext } from "@/context/AlertContext";
import { generateAlert } from "@/lib/functions";
import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
import { UtilContext } from "@/context/UtilContext";
import { deleteImage, insertImage } from "@/lib/firebase/firebase.action";
import { ENUMs } from "@/lib/enum";

export function useGetConfig(key, type) {
  const { dispatch } = useContext(AlertContext);
  return useQuery({
    queryKey: [key],
    queryFn: () => getConfig(dispatch, type),
    retry: 0,
  });
}

export function useAddConfig(key) {
  const queryClient = useQueryClient();
  const { dispatch } = useContext(AlertContext);
  const { dispatch: ui } = useContext(UiContext);
  return useMutation({
    mutationFn: async ({ state, image }) => {
      let form = state;
      if (image) {
        let { imageURL, imageName } = await insertImage(
          image,
          ENUMs.STACK_BUCKET,
          dispatch
        );
        form.imageName = imageName;
        form.imageURL = imageURL;
      }
      return await addConfig(form);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([key]);
      generateAlert(data.message, "success", dispatch);
      ui({
        type: CONTEXT_TYPEs.CONFIG_FORM,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}

export function useUpdateConfig(key, id) {
  const queryClient = useQueryClient();
  const { dispatch } = useContext(AlertContext);
  const { dispatch: ui } = useContext(UiContext);
  return useMutation({
    mutationFn: async ({ state, oldImg, oldURL, image }) => {
      let form = state;
      if (image) {
        //new image uploaded
        //insert image
        let { imageURL, imageName } = await insertImage(
          image,
          ENUMs.STACK_BUCKET,
          dispatch
        );
        form.imageName = imageName;
        form.imageURL = imageURL;
        //delete old image
        if (oldImg) await deleteImage(oldImg, ENUMs.STACK_BUCKET, dispatch);
      } else {
        form.imageName = oldImg;
        form.imageURL = oldURL;
      }
      return await updateConfig(form, id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([key]);
      generateAlert(data.message, "success", dispatch);
      ui({
        type: CONTEXT_TYPEs.CONFIG_FORM,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}

export function useDeleteConfig(key, id) {
  const queryClient = useQueryClient();
  const { dispatch } = useContext(AlertContext);
  const { dispatch: util } = useContext(UtilContext);
  return useMutation({
    mutationFn: () => deleteConfig(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries([key]);
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
