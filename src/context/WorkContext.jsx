import { createContext, useReducer } from "react";
import { workInitialState, workReducer } from "./reducers/workReducer";

export const WorkContext = createContext();

export const WorkContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workReducer, workInitialState);

  return (
    <WorkContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkContext.Provider>
  );
};
