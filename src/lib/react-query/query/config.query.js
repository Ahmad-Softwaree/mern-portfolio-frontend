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
    mutationFn: (form) => addConfig(form),
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
    mutationFn: (form) => updateConfig(form, id),
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
