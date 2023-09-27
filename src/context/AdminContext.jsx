import { createContext, useReducer } from "react";
import { adminInitialState, adminReducer } from "./reducers/adminReducer";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, adminInitialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};
