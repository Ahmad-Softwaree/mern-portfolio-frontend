import { AlertContextProvider } from "./AlertContext";
import { AuthContextProvider } from "./AuthContext";
import { ImageContextProvider } from "./ImageContext";
import { UiContextProvider } from "./UiContext";
import { UtilContextProvider } from "./UtilContext";
import { LanguageContextProvider } from "./LanguageContext";

export const MainContext = ({ children }) => {
  return (
    <AuthContextProvider>
      <ImageContextProvider>
        <UiContextProvider>
          <UtilContextProvider>
            <AlertContextProvider>
              <LanguageContextProvider>{children}</LanguageContextProvider>
            </AlertContextProvider>
          </UtilContextProvider>
        </UiContextProvider>
      </ImageContextProvider>
    </AuthContextProvider>
  );
};
