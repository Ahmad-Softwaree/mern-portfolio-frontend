import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYs } from "../types";
import { addSubscriber, getSubscribers } from "../action/subscribe";
import { generateAlert } from "@/lib/functions";

export function useGetSubscribers() {
  const { dispatch } = useContext(AlertContext);

  return useQuery({
    queryKey: [QUERY_KEYs.SUBSCRIBERS],
    queryFn: () => getSubscribers(dispatch),
    retry: 0,
  });
}

export function useAddSubscriber(replaceState) {
  const { dispatch } = useContext(AlertContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form) => addSubscriber(form),
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYs.SUBSCRIBERS]);
      generateAlert(data.message, "success", dispatch);
      replaceState({
        email: "",
      });
    },
    onError: (error) => {
      generateAlert(error, "error", dispatch);
    },
  });
}
