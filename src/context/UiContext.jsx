import { createContext, useReducer } from "react";
import { uiInitialState, uiReducer } from "./reducers/uiReducer";

export const UiContext = createContext();

export const UiContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, uiInitialState);

  return (
    <UiContext.Provider value={{ state, dispatch }}>
      {children}
    </UiContext.Provider>
  );
};
