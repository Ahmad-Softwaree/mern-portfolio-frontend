import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const Admin = ({ children }) => {
  const {
    state: { user },
  } = useContext(AuthContext);
  if (user)
    return children({
      user,
    });
  else return null;
};

export default Admin;
