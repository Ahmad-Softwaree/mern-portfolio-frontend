import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const RootPath = ({ children }) => {
  const { pathname } = useLocation();
  const {
    state: { user, profile },
  } = useContext(AuthContext);
  if (!pathname.split("/").includes("dashboard"))
    return children({
      user,
      profile,
    });
  else return null;
};

export default RootPath;
