import { createContext, useReducer } from "react";
import { utilInitialState, utilReducer } from "./reducers/utilReducer";

export const UtilContext = createContext();

export const UtilContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(utilReducer, utilInitialState);

  return (
    <UtilContext.Provider value={{ state, dispatch }}>
      {children}
    </UtilContext.Provider>
  );
};
