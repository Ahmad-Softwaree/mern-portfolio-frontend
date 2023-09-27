import { createContext, useReducer } from "react";
import { skillInitialState, skillReducer } from "./reducers/skillReducer";

export const SkillContext = createContext();

export const SkillContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(skillReducer, skillInitialState);

  return (
    <SkillContext.Provider value={{ state, dispatch }}>
      {children}
    </SkillContext.Provider>
  );
};
