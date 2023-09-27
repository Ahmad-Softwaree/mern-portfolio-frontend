import { createContext, useReducer } from "react";
import { imageInitialState, imageReducer } from "./reducers/imageReducer";

export const ImageContext = createContext();

export const ImageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(imageReducer, imageInitialState);

  return (
    <ImageContext.Provider value={{ state, dispatch }}>
      {children}
    </ImageContext.Provider>
  );
};
