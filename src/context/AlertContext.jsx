import { createContext, useReducer } from "react";
import { alertState, alertReducer } from "./reducers/alert.reducer";

export const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, alertState);

  return (
    <AlertContext.Provider value={{ state, dispatch }}>
      {children}
    </AlertContext.Provider>
  );
};
