import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYs } from "../types";
import {
  addSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "../action/skill.action";
import { generateAlert } from "@/lib/functions";
import { deleteImage, insertImage } from "@/lib/firebase/firebase.action";
import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
import { ENUMs } from "@/lib/enum";
import { UtilContext } from "@/context/UtilContext";

export function useGetSkills() {
  const { dispatch } = useContext(AlertContext);

  return useQuery({
    queryKey: [QUERY_KEYs.SKILLS],
    queryFn: () => getSkills(dispatch),
    retry: 0,
  });
}

export function useAddSkill() {
  const { dispatch: ui } = useContext(UiContext);
  const { dispatch } = useContext(AlertContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ state, image }) => {
      let form = state;
      if (image) {
        let { imageURL, imageName } = await insertImage(
          image,
          ENUMs.SKILL_BUCKET,
          dispatch
        );
        form.imageName = imageName;
        form.imageURL = imageURL;
      }
      return await addSkill(form);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.SKILLS]);
      generateAlert(data.message, "success", dispatch);
      ui({
        type: CONTEXT_TYPEs.SKILL_FORM,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}
export function useUpdateSkill(id) {
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
          ENUMs.SKILL_BUCKET,
          dispatch
        );
        form.imageName = imageName;
        form.imageURL = imageURL;
        //delete old image
        if (oldImg) await deleteImage(oldImg, ENUMs.SKILL_BUCKET, dispatch);
      } else {
        form.imageName = oldImg;
        form.imageURL = oldURL;
      }
      return await updateSkill(id, form);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.SKILLS]);
      generateAlert(data.message, "success", dispatch);
      ui({
        type: CONTEXT_TYPEs.SKILL_FORM,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}

export function useDeleteSkill() {
  const { dispatch } = useContext(AlertContext);
  const { dispatch: util } = useContext(UtilContext);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, image }) => {
      await deleteImage(image, ENUMs.SKILL_BUCKET, dispatch);
      return await deleteSkill(id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.SKILLS]);
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
