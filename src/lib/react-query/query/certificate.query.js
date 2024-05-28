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
  addCertificate,
  deleteCertificate,
  getCertificate,
  getCertificates,
  getInfiniteCertificates,
  searchCertificate,
  updateCertificate,
} from "../action/certificate.action";
import { generateAlert } from "@/lib/functions";
import { deleteImage, insertImage } from "@/lib/firebase/firebase.action";
import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
import { ENUMs } from "@/lib/enum";
import { UtilContext } from "@/context/UtilContext";

export function useGetInfiniteCertificates(filter) {
  const { dispatch } = useContext(AlertContext);

  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.INFINITE_CERTIFICATES],
    queryFn: ({ pageParam = 1 }) =>
      getInfiniteCertificates(dispatch, pageParam, filter),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    retry: 0,
  });
}

export function useGetCertificates() {
  const { dispatch } = useContext(AlertContext);

  return useQuery({
    queryKey: [QUERY_KEYs.CERTIFICATES],
    queryFn: () => getCertificates(dispatch),

    retry: 0,
  });
}
export function useGetCertificate(id) {
  const { dispatch } = useContext(AlertContext);

  return useQuery({
    queryKey: [QUERY_KEYs.CERTIFICATE],
    queryFn: () => getCertificate(dispatch, id),
    retry: 0,
  });
}

export function useSearchCertificate(search) {
  const { dispatch } = useContext(AlertContext);

  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_CERTIFICATES],
    queryFn: () => searchCertificate(dispatch, search),
    retry: 0,
    enabled: !!search,
  });
}

export function useAddCertificate() {
  const { dispatch: ui } = useContext(UiContext);
  const { dispatch } = useContext(AlertContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ state, image }) => {
      let form = state;
      if (image) {
        let { imageURL, imageName } = await insertImage(
          image,
          ENUMs.CERTIFICATE_BUCKET,
          dispatch
        );
        form.imageName = imageName;
        form.imageURL = imageURL;
      }
      return await addCertificate(form);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.CERTIFICATES]);
      generateAlert(data.message, "success", dispatch);
      ui({
        type: CONTEXT_TYPEs.CERTIFICATE_FORM,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}
export function useUpdateCertificate(id) {
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
          ENUMs.CERTIFICATE_BUCKET,
          dispatch
        );
        form.imageName = imageName;
        form.imageURL = imageURL;
        //delete old image
        if (oldImg)
          await deleteImage(oldImg, ENUMs.CERTIFICATE_BUCKET, dispatch);
      } else {
        form.imageName = oldImg;
        form.imageURL = oldURL;
      }
      return await updateCertificate(id, form);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.CERTIFICATES]);
      generateAlert(data.message, "success", dispatch);
      ui({
        type: CONTEXT_TYPEs.CERTIFICATE_FORM,
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}

export function useDeleteCertificate() {
  const { dispatch } = useContext(AlertContext);
  const { dispatch: util } = useContext(UtilContext);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, image }) => {
      await deleteImage(image, ENUMs.CERTIFICATE_BUCKET, dispatch);
      return await deleteCertificate(id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.CERTIFICATES]);
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
