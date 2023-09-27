import { createContext, useReducer } from "react";
import {
  certificateInitialState,
  certificateReducer,
} from "./reducers/certificateReducer";

export const CertificateContext = createContext();

export const CertificateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    certificateReducer,
    certificateInitialState
  );

  return (
    <CertificateContext.Provider value={{ state, dispatch }}>
      {children}
    </CertificateContext.Provider>
  );
};
