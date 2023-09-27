import { createContext, useReducer } from "react";
import { typeInitialState, typeReducer } from "./reducers/typeReducer";

export const TypeContext = createContext();

export const TypeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(typeReducer, typeInitialState);

  return (
    <TypeContext.Provider value={{ state, dispatch }}>
      {children}
    </TypeContext.Provider>
  );
};
