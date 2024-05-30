import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYs } from "../types";
import {
  addProject,
  deleteProject,
  getInfiniteProjects,
  getProject,
  getProjects,
  searchProject,
  updateProject,
} from "../action/project.action";
import { generateAlert } from "@/lib/functions";
import { deleteImage, insertImage } from "@/lib/firebase/firebase.action";
import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
import { ENUMs } from "@/lib/enum";
import { UtilContext } from "@/context/UtilContext";

export function useGetInfiniteProjects(type, stack) {
  const { dispatch } = useContext(AlertContext);

  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.INFINITE_PROJECTS],
    queryFn: ({ pageParam = 1 }) =>
      getInfiniteProjects(dispatch, pageParam, type, stack),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    retry: 0,
  });
}
export function useGetProjects() {
  const { dispatch } = useContext(AlertContext);

  return useQuery({
    queryKey: [QUERY_KEYs.PROJECTS],
    queryFn: () => getProjects(dispatch),
    retry: 0,
  });
}
export function useGetProject(id) {
  const { dispatch } = useContext(AlertContext);

  return useQuery({
    queryKey: [QUERY_KEYs.PROJECT],
    queryFn: () => getProject(dispatch, id),
    retry: 0,
  });
}
export function useSearchProject(search) {
  const { dispatch } = useContext(AlertContext);
  console.log("object");
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_PROJECTS],
    queryFn: () => searchProject(dispatch, search),
    retry: 0,
    enabled: !!search,
  });
}

export function useAddProject() {
  const { dispatch: ui } = useContext(UiContext);
  const { dispatch } = useContext(AlertContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ state, image }) => {
      let form = state;
      if (image) {
        let { imageURL, imageName } = await insertImage(
          image,
          ENUMs.PROJECT_BUCKET,
          dispatch
        );
        form.imageName = imageName;
        form.imageURL = imageURL;
      }
      return await addProject(form);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.PROJECTS]);
      generateAlert(data.message, "success", dispatch);
      ui({
        type: CONTEXT_TYPEs.PROJECT_FORM,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}
export function useUpdateProject(id) {
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
          ENUMs.PROJECT_BUCKET,
          dispatch
        );
        form.imageName = imageName;
        form.imageURL = imageURL;
        //delete old image
        if (oldImg) await deleteImage(oldImg, ENUMs.PROJECT_BUCKET, dispatch);
      } else {
        form.imageName = oldImg;
        form.imageURL = oldURL;
      }
      return await updateProject(id, form);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.PROJECTS]);
      generateAlert(data.message, "success", dispatch);
      ui({
        type: CONTEXT_TYPEs.PROJECT_FORM,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}

export function useDeleteProject() {
  const { dispatch } = useContext(AlertContext);
  const { dispatch: util } = useContext(UtilContext);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, image }) => {
      await deleteImage(image, ENUMs.PROJECT_BUCKET, dispatch);
      return await deleteProject(id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.PROJECTS]);
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
