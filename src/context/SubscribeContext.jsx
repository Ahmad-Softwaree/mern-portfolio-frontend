import { createContext, useReducer } from "react";
import {
  subscribeInitialState,
  subscribeReducer,
} from "./reducers/subscribeReducer";

export const SubscribeContext = createContext();

export const SubscribeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subscribeReducer, subscribeInitialState);

  return (
    <SubscribeContext.Provider value={{ state, dispatch }}>
      {children}
    </SubscribeContext.Provider>
  );
};
