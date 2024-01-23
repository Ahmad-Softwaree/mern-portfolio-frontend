import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const Root = ({ children }) => {
  const {
    state: { user },
  } = useContext(AuthContext);
  if (!user) return children;
  else return null;
};

export default Root;
