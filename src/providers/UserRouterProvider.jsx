import { Fallback } from "@/pages";
import { Navigate } from "react-router-dom";
import { useGetCurrentUser } from "../lib/react-query/query/auth.query";

export default function UserRouterProvider({ component: Component }) {
  const { data, isLoading } = useGetCurrentUser();

  if (isLoading) return <Fallback />;
  else {
    if (!data) return <Navigate to={`/login`} replace />;
    if (data && data?.role !== "user") return <Navigate to={`/`} replace />;
    else return <Component />;
  }
}
