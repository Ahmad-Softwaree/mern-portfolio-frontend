import { createContext, useReducer } from "react";
import {
  languageInitialState,
  languageReducer,
} from "./reducers/languageReducer";

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, languageInitialState);

  return (
    <LanguageContext.Provider value={{ state, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
};
