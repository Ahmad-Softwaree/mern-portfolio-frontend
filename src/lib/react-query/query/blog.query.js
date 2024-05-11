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
  addBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  getInfiniteBlogs,
  getRelatedBlogs,
  searchBlog,
  updateBlog,
} from "../action/blog.action";
import { generateAlert } from "@/lib/functions";
import { deleteImage, insertImage } from "@/lib/firebase/firebase.action";
import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
import { ENUMs } from "@/lib/enum";
import { UtilContext } from "@/context/UtilContext";

export function useGetBlog(id) {
  const { dispatch } = useContext(AlertContext);

  return useQuery({
    queryKey: [QUERY_KEYs.BLOG],
    queryFn: () => getBlog(dispatch, id),
    retry: 0,
  });
}
export function useGetRelatedBlogs(category, id) {
  const { dispatch } = useContext(AlertContext);
  return useQuery({
    queryKey: [QUERY_KEYs.RELATED_BLOGS],
    queryFn: () => getRelatedBlogs(dispatch, category, id),
    retry: 0,
    enabled: !!category,
  });
}

export function useGetInfiniteBlogs(filter) {
  const { dispatch } = useContext(AlertContext);
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.BLOGS],
    queryFn: ({ pageParam = 1 }) =>
      getInfiniteBlogs(dispatch, pageParam, filter),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    retry: 0,
  });
}
export function useGetBlogs() {
  const { dispatch } = useContext(AlertContext);
  return useQuery({
    queryKey: [QUERY_KEYs.BLOGS],
    queryFn: ({ pageParam = 1 }) => getBlogs(dispatch),
    retry: 0,
  });
}

export function useSearchBlog(search) {
  const { dispatch } = useContext(AlertContext);

  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_BLOGS],
    queryFn: () => searchBlog(dispatch, search),
    retry: 0,
    enabled: !!search,
  });
}

export function useAddBlog() {
  const { dispatch: ui } = useContext(UiContext);
  const { dispatch } = useContext(AlertContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ state, image }) => {
      let form = state;
      if (image) {
        let { imageURL, imageName } = await insertImage(
          image,
          ENUMs.BLOG_BUCKET,
          dispatch
        );
        form.imageName = imageName;
        form.imageURL = imageURL;
      }
      return await addBlog(form);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.BLOGS]);
      generateAlert(data.message, "success", dispatch);
      ui({
        type: CONTEXT_TYPEs.BLOG_FORM,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}
export function useUpdateBlog(id) {
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
          ENUMs.BLOG_BUCKET,
          dispatch
        );
        form.imageName = imageName;
        form.imageURL = imageURL;
        //delete old image
        if (oldImg) await deleteImage(oldImg, ENUMs.BLOG_BUCKET, dispatch);
      } else {
        form.imageName = oldImg;
        form.imageURL = oldURL;
      }
      return await updateBlog(id, form);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.BLOGS]);
      generateAlert(data.message, "success", dispatch);
      ui({
        type: CONTEXT_TYPEs.BLOG_FORM,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}

export function useDeleteBlog() {
  const { dispatch } = useContext(AlertContext);
  const { dispatch: util } = useContext(UtilContext);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, image }) => {
      await deleteImage(image, ENUMs.BLOG_BUCKET, dispatch);
      return await deleteBlog(id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.BLOGS]);
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
