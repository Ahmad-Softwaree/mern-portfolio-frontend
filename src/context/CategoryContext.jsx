import { createContext, useReducer } from "react";
import {
  categoryInitialState,
  categoryReducer,
} from "./reducers/categoryReducer";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, categoryInitialState);

  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};
