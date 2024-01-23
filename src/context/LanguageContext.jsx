import { createContext, useReducer } from "react";
import { languageState, languageReducer } from "./reducers/language.reducer";

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, languageState);
  return (
    <LanguageContext.Provider value={{ state, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
};
