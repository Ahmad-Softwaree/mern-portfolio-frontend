import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const AdminPath = ({ children }) => {
  const { pathname } = useLocation();

  const {
    state: { user },
  } = useContext(AuthContext);
  if (user && pathname.split("/").includes("dashboard"))
    return children({
      user,
    });
  else return null;
};

export default AdminPath;
