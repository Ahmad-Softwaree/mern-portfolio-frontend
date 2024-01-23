import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, login, logout } from "../action/auth.action";
import { generateAlert } from "@/lib/functions";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYs } from "../types";
import { setAxiosConfig } from "@/lib/config/axios.config";
import { useContext } from "react";
import { CONTEXT_TYPEs } from "@/context";
import { setCookie } from "@/lib/config/cookie.config";
import { ENUMs } from "@/lib/enum";
import { AlertContext } from "@/context/AlertContext";
import { AuthContext } from "@/context/AuthContext";

export function useGetCurrentUser() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  return useQuery({
    queryKey: [QUERY_KEYs.USER],
    queryFn: () => getCurrentUser(dispatch, navigate),
    retry: 0,
  });
}

export function useLogin() {
  const { dispatch: alert } = useContext(AlertContext);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  return useMutation({
    mutationFn: (form) => login(form),
    onSuccess: (data) => {
      setCookie(ENUMs.COOKIE_NAME, data.token);
      setAxiosConfig(data.token);
      dispatch({
        type: CONTEXT_TYPEs.SET_USER,
        payload: data,
      });
      navigate("/dashboard/home");
    },
    onError: (error) => {
      generateAlert(error, "error", alert);
    },
  });
}
export function useLogout() {
  const { dispatch: alert } = useContext(AlertContext);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries([QUERY_KEYs.USER]);
      dispatch({
        type: CONTEXT_TYPEs.REMOVE_USER,
      });
      navigate("/");
    },
    onError: (error) => {
      generateAlert(error, "error", alert);
    },
  });
}
