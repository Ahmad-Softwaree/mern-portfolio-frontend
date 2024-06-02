import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Error, NotFound } from "../pages";
import { RootRouterProvider } from "../providers";
import { Layout } from "../pages/_root/layout";

import { Home, PrivacyPolicy } from "@/pages/_root";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Normal Routes */}

      <>
        <Route
          path="/"
          errorElement={<Error />}
          element={<RootRouterProvider component={Layout} />}
        >
          <Route index errorElement={<Error />} element={<Home />} />
          {/* <Route
            path="blogs"
            errorElement={<Error />}
            element={<RootBlogs />}
          />
          <Route path="blogs/:id" errorElement={<Error />} element={<Blog />} />
          <Route
            path="projects"
            errorElement={<Error />}
            element={<RootProjects />}
          />
          <Route
            path="certificates"
            errorElement={<Error />}
            element={<RootCertificates />}
          />
          <Route
            path="projects/:id"
            errorElement={<Error />}
            element={<Project />}
          />
          <Route
            path="certificates/:id"
            errorElement={<Error />}
            element={<Certificate />}
          />
         */}{" "}
          <Route
            path="privacy_policy"
            errorElement={<Error />}
            element={<PrivacyPolicy />}
          />
        </Route>
      </>

      <Route path="*" errorElement={<Error />} element={<NotFound />} />
    </>
  )
);
export default routes;
