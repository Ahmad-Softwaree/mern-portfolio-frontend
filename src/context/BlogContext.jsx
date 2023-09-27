import { createContext, useReducer } from "react";
import { blogReducer, blogInitialState } from "./reducers/blogReducer";

export const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, blogInitialState);

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};
