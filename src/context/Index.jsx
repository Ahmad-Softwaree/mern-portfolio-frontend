import { UiContextProvider } from "./UiContext";
import { UtilContextProvider } from "./UtilContext";

export const MainContext = ({ children }) => {
  return (
    <UiContextProvider>
      <UtilContextProvider>{children}</UtilContextProvider>
    </UiContextProvider>
  );
};
