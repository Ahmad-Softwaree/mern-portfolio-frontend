import { createContext, useReducer } from "react";
import { stackInitialState, stackReducer } from "./reducers/stackReducer";

export const StackContext = createContext();

export const StackContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stackReducer, stackInitialState);

  return (
    <StackContext.Provider value={{ state, dispatch }}>
      {children}
    </StackContext.Provider>
  );
};
