import { AlertContextProvider } from "./AlertContext";
import { AdminContextProvider } from "./AdminContext";
import { BlogContextProvider } from "./BlogContext";
import { ImageContextProvider } from "./ImageContext";
import { LanguageContextProvider } from "./LanguageContext";
import { ProjectContextProvider } from "./ProjectContext";
import { WorkContextProvider } from "./WorkContext";
import { CategoryContextProvider } from "./CategoryContext";
import { UtilContextProvider } from "./UtilContext";
import { UiContextProvider } from "./UiContext";
import { StackContextProvider } from "./StackContext";
import { TypeContextProvider } from "./TypeContext";
import { SkillContextProvider } from "./SkillContext";
import { CertificateContextProvider } from "./CertificateContext";
import { SubscribeContextProvider } from "./SubscribeContext";

export const MainContext = ({ children }) => {
  return (
    <AlertContextProvider>
      <BlogContextProvider>
        <LanguageContextProvider>
          <AdminContextProvider>
            <ProjectContextProvider>
              <WorkContextProvider>
                <ImageContextProvider>
                  <CategoryContextProvider>
                    <UtilContextProvider>
                      <UiContextProvider>
                        <StackContextProvider>
                          <TypeContextProvider>
                            <SkillContextProvider>
                              <CertificateContextProvider>
                                <SubscribeContextProvider>
                                  {children}
                                </SubscribeContextProvider>
                              </CertificateContextProvider>
                            </SkillContextProvider>
                          </TypeContextProvider>
                        </StackContextProvider>
                      </UiContextProvider>
                    </UtilContextProvider>
                  </CategoryContextProvider>
                </ImageContextProvider>
              </WorkContextProvider>
            </ProjectContextProvider>
          </AdminContextProvider>
        </LanguageContextProvider>
      </BlogContextProvider>
    </AlertContextProvider>
  );
};
