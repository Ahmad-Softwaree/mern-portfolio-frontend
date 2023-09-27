import { createContext, useReducer } from "react";
import { projectInitialState, projectReducer } from "./reducers/projectReducer";

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, projectInitialState);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
