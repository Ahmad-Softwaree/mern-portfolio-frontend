import { useGetCurrentUser } from "@/lib/react-query/query/auth.query";
import { Fallback } from "@/pages";

export default function RootRouterProvider({ component: Component }) {
  const { isLoading } = useGetCurrentUser();

  if (isLoading) return <Fallback />;
  return <Component />;
}
