import { useGetCurrentUser } from "@/lib/react-query/query/auth.query";
import { Fallback } from "@/pages";
import { Navigate } from "react-router-dom";

export default function UserRouterProvider({ component: Component }) {
  const { data, isLoading } = useGetCurrentUser();

  if (isLoading) return <Fallback />;
  else {
    if (data) return <Navigate to={`/`} replace />;
    else return <Component />;
  }
}
